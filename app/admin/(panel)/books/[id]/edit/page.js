import { notFound } from "next/navigation";

import BookForm from "@/app/components/BookForm";
import { getBook } from "@/lib/catalog";

export const dynamic = "force-dynamic";

export default async function EditBook({ params }) {
  const book = await getBook(params.id);
  if (!book) notFound();
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Edit {book.title}</h1>
      <BookForm book={book} />
    </div>
  );
}
