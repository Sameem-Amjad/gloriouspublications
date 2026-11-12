"use client";
import { useEffect, useRef, useState } from "react";

import { removeLine } from "@/lib/cart";

const HARD_COPY_EXTRA = 3;
const PAYMENTS = [
  ["cash_on_delivery", "Cash on delivery"],
  ["bank_transfer", "Bank transfer"],
  ["card", "Card"]
];
const unitPrice = (i) => i.price + (i.format === "Hard copy" ? HARD_COPY_EXTRA : 0);

/**
 * Checkout for one book (Buy now) or the whole cart. One shipping form;
 * each line becomes its own order, priced on the server.
 */
export default function BuyForm({ items, onClose, fromCart = false }) {
  const [form, setForm] = useState({ name: "", email: "", address: "", city: "", country: "Pakistan", zipCode: "", paymentMethod: "cash_on_delivery" });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [placed, setPlaced] = useState(null);
  const first = useRef(null);
  const demo = process.env.NEXT_PUBLIC_DEMO_MODE === "true";
  const total = items.reduce((s, i) => s + unitPrice(i) * i.quantity, 0);

  useEffect(() => {
    first.current?.focus();
    const onKey = (e) => e.key === "Escape" && !busy && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [busy, onClose]);

  const set = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    setError("");
    setBusy(true);
    const done = [];
    try {
      for (const item of items) {
        const res = await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, bookId: item.bookId, quantity: item.quantity, format: item.format })
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(`${item.title}: ${data.error || "the order failed"}`);
        done.push({ ...data, title: item.title });
        if (fromCart) removeLine(item.bookId, item.format);
      }
      setPlaced(done);
    } catch (err) {
      setError(err.message);
      if (done.length) setPlaced(done);
    } finally {
      setBusy(false);
    }
  }

  const field = (name, label, type = "text", extra = {}) => (
    <label className="block text-sm">
      <span className="mb-1 block font-medium text-gray-700">{label}</span>
      <input name={name} type={type} value={form[name]} onChange={set} required className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-600 focus:outline-none" {...extra} />
    </label>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" role="dialog" aria-modal="true" aria-labelledby="checkout-title">
      <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-start justify-between">
          <h2 id="checkout-title" className="text-2xl font-semibold">{placed ? "Order placed" : "Checkout"}</h2>
          <button type="button" onClick={onClose} disabled={busy} aria-label="Close" className="rounded-full px-3 py-1 text-xl text-gray-500 hover:bg-gray-100">×</button>
        </div>

        {placed ? (
          <div className="space-y-3">
            {placed.map((o) => (
              <p key={o.id} className="rounded-md bg-green-50 p-3 text-sm text-green-900">
                <strong>{o.title}</strong>: order <span className="font-mono">#{String(o.id).slice(-6).toUpperCase()}</span>, total ${o.total}, status {o.status}.
              </p>
            ))}
            {error ? <p className="text-sm text-red-600">{error}</p> : null}
            <p className="text-sm text-gray-600">
              {demo ? "Demo store: no payment was taken. The order now appears in the admin's order list." : "We'll email you when it ships."}
            </p>
            <button type="button" onClick={onClose} className="rounded-md bg-gray-800 px-5 py-2 text-white hover:bg-blue-600">Continue shopping</button>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-5">
            <ul className="divide-y rounded-md border">
              {items.map((i) => (
                <li key={`${i.bookId}-${i.format}`} className="flex justify-between gap-3 p-3 text-sm">
                  <span>{i.title} <span className="text-gray-500">· {i.format} × {i.quantity}</span></span>
                  <span className="font-medium">${unitPrice(i) * i.quantity}</span>
                </li>
              ))}
              <li className="flex justify-between p-3 text-sm font-semibold"><span>Total</span><span>${total}</span></li>
            </ul>
            <div className="grid gap-4 sm:grid-cols-2">
              {field("name", "Full name", "text", { ref: first, autoComplete: "name" })}
              {field("email", "Email", "email", { autoComplete: "email" })}
              <div className="sm:col-span-2">{field("address", "Street address", "text", { autoComplete: "street-address" })}</div>
              {field("city", "City", "text", { autoComplete: "address-level2" })}
              {field("zipCode", "Postal code", "text", { autoComplete: "postal-code", inputMode: "numeric" })}
              {field("country", "Country", "text", { autoComplete: "country-name" })}
              <label className="block text-sm">
                <span className="mb-1 block font-medium text-gray-700">Payment</span>
                <select name="paymentMethod" value={form.paymentMethod} onChange={set} className="w-full rounded-md border border-gray-300 p-2">
                  {PAYMENTS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                </select>
              </label>
            </div>
            {demo ? <p className="text-xs text-gray-500">Demo store: no payment is taken, whichever method you choose.</p> : null}
            {error ? <p role="alert" className="text-sm text-red-600">{error}</p> : null}
            <button type="submit" disabled={busy} className="w-full rounded-md bg-gray-800 py-3 text-white hover:bg-blue-600 disabled:opacity-60">
              {busy ? "Placing your order…" : `Place order · $${total}`}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
