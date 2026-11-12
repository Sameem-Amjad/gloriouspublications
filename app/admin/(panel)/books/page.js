"use client";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

export default function BooksAdmin() {
  const [books, setBooks] = useState(null);
  const [message, setMessage] = useState(null);
  const [busy, setBusy] = useState(null);

  const load = useCallback(async () => {
    const res = await fetch("/api/books", { cache: "no-store" });
    setBooks(res.ok ? await res.json() : []);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function remove(book) {
    if (!window.confirm("Delete “" + book.title + "”? This can't be undone.")) return;
    setBusy(book._id);
    const res = await fetch("/api/books/" + book._id, { method: "DELETE" });
    const data = await res.json().catch(() => ({}));
    setBusy(null);
    setMessage({ ok: res.ok, text: res.ok ? book.title + " was deleted." : data.error || "Delete failed" });
    if (res.ok) load();
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Books</h1>
        <Link href="/admin/books/insert" className="rounded-md bg-gray-800 px-4 py-2 text-white hover:bg-blue-600">
          Add book
        </Link>
      </div>
      {message ? (
        <p role="status" className={"rounded-md p-3 text-sm " + (message.ok ? "bg-green-50 text-green-800" : "bg-red-50 text-red-700")}>
          {message.text}
        </p>
      ) : null}
      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full min-w-[760px] text-sm">
          <thead className="bg-gray-50 text-left text-gray-600">
            <tr>
              <th className="p-3">Cover</th>
              <th className="p-3">Title</th>
              <th className="p-3">Category</th>
              <th className="p-3 text-right">E-book</th>
              <th className="p-3 text-right">In stock</th>
              <th className="p-3">ISBN</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books === null ? (
              <tr><td colSpan={7} className="p-6 text-center text-gray-500">Loading…</td></tr>
            ) : books.length === 0 ? (
              <tr><td colSpan={7} className="p-6 text-center text-gray-500">No books yet.</td></tr>
            ) : (
              books.map((b) => (
                <tr key={b._id} className="border-t">
                  <td className="p-2">
                    {b.frontCoverImage ? <Image src={b.frontCoverImage} alt="" width={40} height={60} className="rounded shadow" /> : null}
                  </td>
                  <td className="p-3">
                    <Link href={"/books/" + b.slug} className="font-medium hover:underline">{b.title}</Link>
                    <span className="block text-xs text-gray-500">{b.author}</span>
                  </td>
                  <td className="p-3">{b.category}</td>
                  <td className="p-3 text-right">${b.price}</td>
                  <td className={"p-3 text-right " + (b.quantity === 0 ? "text-red-600" : b.quantity <= 3 ? "text-amber-700" : "")}>{b.quantity}</td>
                  <td className="p-3 font-mono text-xs">{b.isbn || "—"}</td>
                  <td className="p-3">
                    <div className="flex gap-3">
                      <Link href={"/admin/books/" + b._id + "/edit"} className="text-blue-600 hover:underline">Edit</Link>
                      <button type="button" onClick={() => remove(b)} disabled={busy === b._id} className="text-red-600 hover:underline disabled:opacity-50">
                        {busy === b._id ? "Deleting…" : "Delete"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
