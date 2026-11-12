import Link from "next/link";
import { FiAlertTriangle, FiDollarSign, FiPackage, FiShoppingBag } from "react-icons/fi";
import { GrBook } from "react-icons/gr";

import connect from "@/lib/connectDB";
import Book from "@/lib/models/bookSchema";
import Order from "@/lib/models/orderSchema";

export const dynamic = "force-dynamic";

const STATUS_STYLE = {
  pending: "bg-amber-100 text-amber-800",
  processing: "bg-sky-100 text-sky-800",
  shipped: "bg-indigo-100 text-indigo-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-gray-200 text-gray-600"
};

const money = (n) => "$" + Number(n || 0).toLocaleString("en-US");
const ref = (id) => "#" + String(id).slice(-6).toUpperCase();

export default async function Dashboard() {
  await connect();
  const [books, orders] = await Promise.all([Book.find().lean(), Order.find().sort({ createdAt: -1 }).lean()]);
  const live = orders.filter((o) => o.status !== "cancelled");
  const revenue = live.reduce((s, o) => s + (o.total || 0), 0);
  const open = orders.filter((o) => o.status === "pending" || o.status === "processing").length;
  const lowStock = books.filter((b) => b.category !== "Coming Soon" && b.quantity <= 3).sort((a, b) => a.quantity - b.quantity);
  const copies = books.reduce((s, b) => s + (b.quantity || 0), 0);
  const sold = new Map();
  for (const o of live) sold.set(o.book, (sold.get(o.book) || 0) + o.quantity);
  const best = [...sold.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5);

  const cards = [
    { title: "Books in the catalogue", value: books.length, icon: GrBook, href: "/admin/books" },
    { title: "Copies in stock", value: copies, icon: FiPackage, href: "/admin/books" },
    { title: "Orders to handle", value: open, icon: FiShoppingBag, href: "/admin/orders" },
    { title: "Revenue (excl. cancelled)", value: money(revenue), icon: FiDollarSign, href: "/admin/orders" }
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(({ title, value, icon: Icon, href }) => (
          <Link key={title} href={href} className="rounded-xl bg-gray-50 p-2 shadow-sm hover:bg-sky-50">
            <div className="flex items-center gap-2 p-4">
              <Icon className="h-5 w-5 text-gray-700" />
              <h2 className="text-sm font-medium">{title}</h2>
            </div>
            <p className="truncate rounded-xl bg-white px-4 py-6 text-center text-2xl font-semibold">{value}</p>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="rounded-xl border p-4 lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-semibold">Recent orders</h2>
            <Link href="/admin/orders" className="text-sm text-blue-600 hover:underline">All orders</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-gray-500">
                <tr>
                  <th className="py-2">Order</th>
                  <th>Customer</th>
                  <th>Book</th>
                  <th className="text-right">Total</th>
                  <th className="pl-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 6).map((o) => (
                  <tr key={String(o._id)} className="border-t">
                    <td className="py-2 font-mono text-xs">{ref(o._id)}</td>
                    <td>
                      {o.name}
                      <span className="block text-xs text-gray-500">{o.city}</span>
                    </td>
                    <td>
                      {o.book}
                      <span className="block text-xs text-gray-500">
                        {o.format || "Hard copy"} × {o.quantity}
                      </span>
                    </td>
                    <td className="text-right">{money(o.total ?? o.price * o.quantity)}</td>
                    <td className="pl-3">
                      <span className={"rounded px-2 py-0.5 text-xs capitalize " + STATUS_STYLE[o.status || "pending"]}>{o.status || "pending"}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="space-y-6">
          <section className="rounded-xl border p-4">
            <h2 className="mb-3 flex items-center gap-2 font-semibold">
              <FiAlertTriangle className="text-amber-500" /> Low stock
            </h2>
            {lowStock.length ? (
              <ul className="space-y-2 text-sm">
                {lowStock.map((b) => (
                  <li key={String(b._id)} className="flex justify-between">
                    <Link href={"/admin/books/" + b._id + "/edit"} className="hover:underline">{b.title}</Link>
                    <span className={b.quantity === 0 ? "text-red-600" : "text-amber-700"}>{b.quantity === 0 ? "Out" : b.quantity + " left"}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">Everything is well stocked.</p>
            )}
          </section>
          <section className="rounded-xl border p-4">
            <h2 className="mb-3 font-semibold">Best sellers</h2>
            <ol className="list-decimal space-y-1 pl-5 text-sm">
              {best.map(([title, n]) => (
                <li key={title}>
                  {title} <span className="text-gray-500">· {n} sold</span>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </div>
    </div>
  );
}
