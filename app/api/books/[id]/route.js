import mongoose from "mongoose";
import { NextResponse } from "next/server";

import { DEMO_MODE, isAdmin } from "@/lib/admin";
import connect from "@/lib/connectDB";
import Book from "@/lib/models/bookSchema";

import { bookFields } from "../fields";

export const dynamic = "force-dynamic";

/** Look a book up by its id or its slug. */
async function find(id) {
  await connect();
  return mongoose.isValidObjectId(id) ? Book.findById(id) : Book.findOne({ slug: id });
}

export async function GET(_req, { params }) {
  const book = await find(params.id);
  return book ? NextResponse.json(book) : NextResponse.json({ error: "Book not found" }, { status: 404 });
}

export async function PATCH(req, { params }) {
  if (!isAdmin()) return NextResponse.json({ error: "Sign in as admin first" }, { status: 401 });
  const { data, error } = bookFields(await req.json().catch(() => null));
  if (error) return NextResponse.json({ error }, { status: 400 });
  delete data.title; // the title is the book's identity; keep it stable
  const book = await find(params.id);
  if (!book) return NextResponse.json({ error: "Book not found" }, { status: 404 });
  Object.assign(book, data);
  await book.save();
  return NextResponse.json({ message: "Book updated", book });
}

export async function DELETE(_req, { params }) {
  if (!isAdmin()) return NextResponse.json({ error: "Sign in as admin first" }, { status: 401 });
  const book = await find(params.id);
  if (!book) return NextResponse.json({ error: "Book not found" }, { status: 404 });
  if (DEMO_MODE && book.seeded) {
    return NextResponse.json({ error: "Demo titles can't be deleted. Add a book of your own and delete that." }, { status: 403 });
  }
  await book.deleteOne();
  return NextResponse.json({ message: "Book deleted" });
}
