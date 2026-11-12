import { notFound } from "next/navigation";

import Bookflip from "@/app/components/Bookflip";
import { getBook } from "@/lib/catalog";

export const dynamic = "force-dynamic";

export default async function PreviewPage({ params }) {
  const book = await getBook(params.slug);
  if (!book) notFound();
  return <Bookflip book={book} />;
}
