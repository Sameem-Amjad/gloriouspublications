"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import BuyForm from "@/app/components/BuyForm";
import { readCart, removeLine, setQuantity } from "@/lib/cart";

const HARD_COPY_EXTRA = 3;
const unit = (i) => i.price + (i.format === "Hard copy" ? HARD_COPY_EXTRA : 0);

export default function CartPage() {
  const [items, setItems] = useState([]);
  const [checkout, setCheckout] = useState(false);

  useEffect(() => {
    const sync = () => setItems(readCart());
    sync();
    window.addEventListener("cart-updated", sync);
    return () => window.removeEventListener("cart-updated", sync);
  }, []);

  const total = items.reduce((s, i) => s + unit(i) * i.quantity, 0);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-semibold">Your cart</h1>
      {items.length === 0 ? (
        <div className="rounded-lg border border-dashed p-10 text-center">
          <p className="text-gray-600">Your cart is empty.</p>
          <Link href="/" className="mt-4 inline-block rounded-md bg-gray-800 px-5 py-2 text-white hover:bg-blue-600">Browse books</Link>
        </div>
      ) : (
        <>
          <ul className="divide-y rounded-lg border">
            {items.map((i) => (
              <li key={`${i.bookId}-${i.format}`} className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
                <Link href={`/books/${i.slug}`} className="w-16 shrink-0">
                  {i.cover ? <Image src={i.cover} alt="" width={120} height={180} className="h-auto w-full rounded shadow" /> : null}
                </Link>
                <div className="flex-1">
                  <Link href={`/books/${i.slug}`} className="font-medium hover:underline">{i.title}</Link>
                  <p className="text-sm text-gray-500">{i.author} · {i.format} · ${unit(i)} each</p>
                </div>
                <div className="flex items-center gap-3">
                  <label className="text-sm text-gray-600">
                    <span className="sr-only">Quantity for {i.title}</span>
                    <input
                      type="number"
                      min={1}
                      max={20}
                      value={i.quantity}
                      onChange={(e) => setQuantity(i.bookId, i.format, Number(e.target.value) || 1)}
                      className="w-16 rounded border p-1 text-center"
                    />
                  </label>
                  <span className="w-16 text-right font-medium">${unit(i) * i.quantity}</span>
                  <button type="button" onClick={() => removeLine(i.bookId, i.format)} className="text-sm text-red-600 hover:underline">
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-col items-end gap-3">
            <p className="text-lg">Total: <span className="font-semibold">${total}</span></p>
            <button type="button" onClick={() => setCheckout(true)} className="rounded-md bg-gray-800 px-6 py-3 text-white hover:bg-blue-600">
              Check out
            </button>
          </div>
        </>
      )}
      {checkout ? <BuyForm items={items} fromCart onClose={() => { setCheckout(false); setItems(readCart()); }} /> : null}
    </div>
  );
}
