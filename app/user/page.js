import { redirect } from "next/navigation";

/** Old product links carried the whole book as JSON; send them to its page. */
export default function LegacyBookLink({ searchParams }) {
  try {
    const book = JSON.parse(searchParams?.book || "null");
    if (book?.slug) redirect(`/books/${book.slug}`);
  } catch (err) {
    if (err?.digest?.startsWith?.("NEXT_REDIRECT")) throw err;
  }
  redirect("/");
}
