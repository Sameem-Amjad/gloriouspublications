import { NextResponse } from "next/server";

import { isAdmin } from "@/lib/admin";
import connect from "@/lib/connectDB";
import Book from "@/lib/models/bookSchema";
import { slugify } from "@/lib/serialize";

import { bookFields } from "./fields";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connect();
    const books = await Book.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json(books);
  } catch (err) {
    console.error("GET /api/books", err);
    return NextResponse.json({ error: "Couldn't load the books" }, { status: 500 });
  }
}

export async function POST(req) {
  if (!isAdmin()) return NextResponse.json({ error: "Sign in as admin first" }, { status: 401 });
  const body = await req.json().catch(() => null);
  const { data, error } = bookFields(body, { requireTitle: true });
  if (error) return NextResponse.json({ error }, { status: 400 });
  try {
    await connect();
    const book = await Book.create({ ...data, slug: slugify(data.title), seeded: false });
    return NextResponse.json({ message: "Book created", book }, { status: 201 });
  } catch (err) {
    const dup = err?.code === 11000;
    return NextResponse.json({ error: dup ? "A book with this title already exists" : "Couldn't create the book" }, { status: dup ? 409 : 500 });
  }
}
