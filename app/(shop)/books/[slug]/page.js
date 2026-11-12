import { notFound } from "next/navigation";

import BookDetail from "@/app/components/BookDetail";
import { getBook, moreFromCategory } from "@/lib/catalog";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const book = await getBook(params.slug).catch(() => null);
  return { title: book ? `${book.title} · Glorious Publications` : "Book not found · Glorious Publications" };
}

export default async function BookPage({ params }) {
  const book = await getBook(params.slug);
  if (!book) notFound();
  const related = await moreFromCategory(book);
  return <BookDetail book={book} related={related} />;
}
