import mongoose from "mongoose";
import { NextResponse } from "next/server";

import { isAdmin } from "@/lib/admin";
import connect from "@/lib/connectDB";
import Book from "@/lib/models/bookSchema";
import Order, { ORDER_STATUSES } from "@/lib/models/orderSchema";

export async function PATCH(req, { params }) {
  if (!isAdmin()) return NextResponse.json({ error: "Sign in as admin first" }, { status: 401 });
  if (!mongoose.isValidObjectId(params.id)) return NextResponse.json({ error: "Order not found" }, { status: 404 });
  const { status } = (await req.json().catch(() => ({}))) || {};
  if (!ORDER_STATUSES.includes(status)) return NextResponse.json({ error: "Unknown status" }, { status: 400 });
  await connect();
  const order = await Order.findById(params.id);
  if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });
  if (order.status === "cancelled" && status !== "cancelled") {
    return NextResponse.json({ error: "A cancelled order can't be reopened" }, { status: 409 });
  }
  // Cancelling a hard-copy order puts its copies back on the shelf (once).
  if (status === "cancelled" && order.status !== "cancelled" && order.format === "Hard copy" && order.bookId) {
    await Book.updateOne({ _id: order.bookId }, { $inc: { quantity: order.quantity } });
  }
  order.status = status;
  await order.save();
  return NextResponse.json({ message: "Status updated", order });
}
