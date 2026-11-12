"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CATEGORIES = ["Coming Soon", "New Arrival", "Children and Youth", "Sacred Writings", "Devotions", "History", "Introductory Books"];

const EMPTY = {
  title: "",
  author: "",
  description: "",
  category: "New Arrival",
  frontCoverImage: "",
  backCoverImage: "",
  bookImages: "",
  price: "",
  quantity: "",
  language: "English",
  bookFormat: "Paperback",
  pages: "",
  dimensions: "",
  isbn: "",
  publicationDate: ""
};

/** Add or edit a book. On edit the title is fixed (it is the book's identity). */
export default function BookForm({ book }) {
  const router = useRouter();
  const editing = Boolean(book);
  const [form, setForm] = useState(() =>
    book
      ? {
          ...EMPTY,
          ...book,
          bookImages: (book.bookImages || []).join(", "),
          publicationDate: book.publicationDate ? String(book.publicationDate).slice(0, 10) : ""
        }
      : EMPTY
  );
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const set = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const res = await fetch(editing ? "/api/books/" + book._id : "/api/books", {
      method: editing ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    const data = await res.json().catch(() => ({}));
    setBusy(false);
    if (!res.ok) {
      setError(data.error || "Saving failed");
      return;
    }
    router.push("/admin/books");
    router.refresh();
  }

  const input = (name, label, props = {}) => (
    <label className="block text-sm">
      <span className="mb-1 block font-medium text-gray-700">{label}</span>
      <input name={name} value={form[name] ?? ""} onChange={set} className="w-full rounded-md border border-gray-300 p-2 disabled:bg-gray-100" {...props} />
    </label>
  );

  return (
    <form onSubmit={submit} className="max-w-3xl space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        {input("title", "Title", { required: true, disabled: editing })}
        {input("author", "Author", { required: true })}
        <label className="block text-sm sm:col-span-2">
          <span className="mb-1 block font-medium text-gray-700">Description</span>
          <textarea name="description" value={form.description} onChange={set} rows={3} className="w-full rounded-md border border-gray-300 p-2" />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-gray-700">Category</span>
          <select name="category" value={form.category} onChange={set} className="w-full rounded-md border border-gray-300 p-2">
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </label>
        {input("language", "Language")}
        {input("price", "E-book price ($)", { type: "number", min: 0, step: "0.01", required: true })}
        {input("quantity", "Hard copies in stock", { type: "number", min: 0, step: 1 })}
        {input("pages", "Pages", { type: "number", min: 0 })}
        {input("isbn", "ISBN")}
        {input("bookFormat", "Binding (e.g. Paperback)")}
        {input("dimensions", "Dimensions")}
        {input("publicationDate", "First published", { type: "date" })}
        <div />
        {input("frontCoverImage", "Front cover image URL", { placeholder: "https://… or /books/…/front.jpg" })}
        {input("backCoverImage", "Back cover image URL")}
        <div className="sm:col-span-2">{input("bookImages", "Sample page image URLs (comma-separated, in order)")}</div>
      </div>
      {error ? <p role="alert" className="text-sm text-red-600">{error}</p> : null}
      <div className="flex gap-3">
        <button type="submit" disabled={busy} className="rounded-md bg-gray-800 px-5 py-2 text-white hover:bg-blue-600 disabled:opacity-60">
          {busy ? "Saving…" : editing ? "Save changes" : "Add book"}
        </button>
        <Link href="/admin/books" className="rounded-md border px-5 py-2 hover:bg-gray-50">Cancel</Link>
      </div>
    </form>
  );
}
