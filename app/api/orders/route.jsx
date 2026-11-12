import mongoose from "mongoose";
import { NextResponse } from "next/server";

import { isAdmin } from "@/lib/admin";
import connect from "@/lib/connectDB";
import Book, { HARD_COPY_EXTRA } from "@/lib/models/bookSchema";
import Order, { FORMATS, PAYMENT_METHODS } from "@/lib/models/orderSchema";

export const dynamic = "force-dynamic";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function GET() {
  if (!isAdmin()) return NextResponse.json({ error: "Sign in as admin first" }, { status: 401 });
  await connect();
  const orders = await Order.find().sort({ createdAt: -1 }).limit(500).lean();
  return NextResponse.json(orders);
}

export async function POST(req) {
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Send the order as JSON" }, { status: 400 });

  const text = (k, max = 200) => (typeof body[k] === "string" ? body[k].trim().slice(0, max) : "");
  const order = {
    name: text("name", 100),
    email: text("email", 160),
    address: text("address", 300),
    city: text("city", 100),
    country: text("country", 100),
    zipCode: text("zipCode", 20),
    paymentMethod: text("paymentMethod", 40),
    format: FORMATS.includes(body.format) ? body.format : "Hard copy",
    quantity: Math.floor(Number(body.quantity))
  };
  const missing = ["name", "email", "address", "city", "country", "zipCode"].filter((k) => !order[k]);
  if (missing.length) return NextResponse.json({ error: `Please fill in: ${missing.join(", ")}` }, { status: 400 });
  if (!EMAIL.test(order.email)) return NextResponse.json({ error: "Enter a valid email address" }, { status: 400 });
  if (!PAYMENT_METHODS[order.paymentMethod]) return NextResponse.json({ error: "Choose a payment method" }, { status: 400 });
  if (!Number.isInteger(order.quantity) || order.quantity < 1 || order.quantity > 20) {
    return NextResponse.json({ error: "Quantity must be between 1 and 20" }, { status: 400 });
  }

  await connect();
  const id = body.bookId;
  const book = id && mongoose.isValidObjectId(id) ? await Book.findById(id) : await Book.findOne({ title: text("book", 300) });
  if (!book) return NextResponse.json({ error: "That book isn't in the catalogue" }, { status: 404 });
  if (book.category === "Coming Soon") return NextResponse.json({ error: "This title isn't on sale yet" }, { status: 409 });

  // Prices come from the catalogue, never from the browser.
  const unit = book.price + (order.format === "Hard copy" ? HARD_COPY_EXTRA : 0);
  if (order.format === "Hard copy") {
    // Take the stock atomically so two buyers can't get the last copy.
    const taken = await Book.findOneAndUpdate({ _id: book._id, quantity: { $gte: order.quantity } }, { $inc: { quantity: -order.quantity } });
    if (!taken) {
      return NextResponse.json({ error: book.quantity > 0 ? `Only ${book.quantity} in stock` : "Out of stock: the e-book is still available" }, { status: 409 });
    }
  }

  const saved = await Order.create({ ...order, book: book.title, bookId: book._id, price: unit, total: Math.round(unit * order.quantity * 100) / 100 });
  return NextResponse.json({ id: saved._id, total: saved.total, status: saved.status }, { status: 201 });
}
