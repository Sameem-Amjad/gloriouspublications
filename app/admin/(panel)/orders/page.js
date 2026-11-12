"use client";
import { useCallback, useEffect, useState } from "react";

const STATUSES = ["pending", "processing", "shipped", "delivered", "cancelled"];
const PAYMENT = { cash_on_delivery: "Cash on delivery", bank_transfer: "Bank transfer", card: "Card", credit_card: "Card", paypal: "PayPal" };
const STATUS_STYLE = {
  pending: "bg-amber-100 text-amber-800",
  processing: "bg-sky-100 text-sky-800",
  shipped: "bg-indigo-100 text-indigo-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-gray-200 text-gray-600"
};

export default function OrdersAdmin() {
  const [orders, setOrders] = useState(null);
  const [filter, setFilter] = useState("all");
  const [open, setOpen] = useState(null);
  const [message, setMessage] = useState(null);

  const load = useCallback(async () => {
    const res = await fetch("/api/orders", { cache: "no-store" });
    setOrders(res.ok ? await res.json() : []);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function setStatus(order, status) {
    const res = await fetch("/api/orders/" + order._id, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    });
    const data = await res.json().catch(() => ({}));
    setMessage({ ok: res.ok, text: res.ok ? "Order #" + String(order._id).slice(-6).toUpperCase() + " is now " + status + "." : data.error || "Update failed" });
    if (res.ok) load();
  }

  const shown = (orders || []).filter((o) => filter === "all" || (o.status || "pending") === filter);
  const counts = Object.fromEntries(STATUSES.map((s) => [s, (orders || []).filter((o) => (o.status || "pending") === s).length]));

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">Orders</h1>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by status">
        {["all", ...STATUSES].map((s) => (
          <button
            key={s}
            type="button"
            aria-pressed={filter === s}
            onClick={() => setFilter(s)}
            className={"rounded-full border px-3 py-1 text-sm capitalize " + (filter === s ? "border-gray-800 bg-gray-800 text-white" : "hover:bg-gray-50")}
          >
            {s}
            {s !== "all" ? " (" + counts[s] + ")" : ""}
          </button>
        ))}
      </div>
      {message ? (
        <p role="status" className={"rounded-md p-3 text-sm " + (message.ok ? "bg-green-50 text-green-800" : "bg-red-50 text-red-700")}>{message.text}</p>
      ) : null}
      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full min-w-[820px] text-sm">
          <thead className="bg-gray-50 text-left text-gray-600">
            <tr>
              <th className="p-3">Order</th>
              <th className="p-3">Placed</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Book</th>
              <th className="p-3 text-right">Total</th>
              <th className="p-3">Payment</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders === null ? (
              <tr><td colSpan={7} className="p-6 text-center text-gray-500">Loading…</td></tr>
            ) : shown.length === 0 ? (
              <tr><td colSpan={7} className="p-6 text-center text-gray-500">No orders here.</td></tr>
            ) : (
              shown.map((o) => {
                const status = o.status || "pending";
                return [
                  <tr key={o._id} className="border-t">
                    <td className="p-3">
                      <button type="button" onClick={() => setOpen(open === o._id ? null : o._id)} aria-expanded={open === o._id} className="font-mono text-xs text-blue-600 hover:underline">
                        #{String(o._id).slice(-6).toUpperCase()}
                      </button>
                    </td>
                    <td className="p-3 text-gray-600">{new Date(o.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}</td>
                    <td className="p-3">{o.name}<span className="block text-xs text-gray-500">{o.city}, {o.country}</span></td>
                    <td className="p-3">{o.book}<span className="block text-xs text-gray-500">{o.format || "Hard copy"} × {o.quantity}</span></td>
                    <td className="p-3 text-right">${o.total ?? o.price * o.quantity}</td>
                    <td className="p-3">{PAYMENT[o.paymentMethod] || o.paymentMethod}</td>
                    <td className="p-3">
                      <label className="sr-only" htmlFor={"status-" + o._id}>Status</label>
                      <select
                        id={"status-" + o._id}
                        value={status}
                        disabled={status === "cancelled"}
                        onChange={(e) => setStatus(o, e.target.value)}
                        className={"rounded px-2 py-1 text-xs capitalize " + STATUS_STYLE[status]}
                      >
                        {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                  </tr>,
                  open === o._id ? (
                    <tr key={o._id + "-detail"} className="bg-gray-50">
                      <td colSpan={7} className="p-4 text-sm">
                        <div className="grid gap-2 sm:grid-cols-3">
                          <p><span className="text-gray-500">Email:</span> {o.email}</p>
                          <p className="sm:col-span-2"><span className="text-gray-500">Ship to:</span> {o.address}, {o.city} {o.zipCode}, {o.country}</p>
                          <p><span className="text-gray-500">Unit price:</span> ${o.price}</p>
                          <p><span className="text-gray-500">Last update:</span> {new Date(o.updatedAt).toLocaleString("en-GB")}</p>
                        </div>
                      </td>
                    </tr>
                  ) : null
                ];
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
