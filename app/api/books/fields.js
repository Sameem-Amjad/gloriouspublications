/** Validates and picks the editable book fields from a request body. */
const TEXT = ["title", "author", "description", "category", "frontCoverImage", "backCoverImage", "language", "bookFormat", "dimensions", "isbn", "ebookPdf"];

export function bookFields(body, { requireTitle = false } = {}) {
  if (!body || typeof body !== "object") return { error: "Send the book as JSON" };
  const data = {};
  for (const k of TEXT) if (typeof body[k] === "string") data[k] = body[k].trim().slice(0, k === "description" ? 4000 : 500);
  for (const k of ["price", "pages", "quantity"]) {
    if (body[k] === undefined || body[k] === "") continue;
    const n = Number(body[k]);
    if (!Number.isFinite(n) || n < 0) return { error: `${k} must be a number of 0 or more` };
    data[k] = k === "price" ? Math.round(n * 100) / 100 : Math.floor(n);
  }
  if (Array.isArray(body.bookImages)) data.bookImages = body.bookImages.filter((s) => typeof s === "string" && s.trim()).slice(0, 20);
  else if (typeof body.bookImages === "string") data.bookImages = body.bookImages.split(",").map((s) => s.trim()).filter(Boolean).slice(0, 20);
  if (body.publicationDate) {
    const d = new Date(body.publicationDate);
    if (!Number.isNaN(d.getTime())) data.publicationDate = d;
  }
  if (requireTitle && !data.title) return { error: "Title is required" };
  if (requireTitle && data.price === undefined) return { error: "Price is required" };
  return { data };
}
