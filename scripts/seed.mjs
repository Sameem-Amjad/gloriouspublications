/**
 * Seeds (and resets) the demo store: the 13 public-domain classics from
 * scripts/catalogue.mjs with their generated covers, and 10 sample orders.
 * Books added in the admin and every order are removed first, so it doubles
 * as a reset.
 *
 *   MONGODB_URI=… MONGODB_DB=glorious node scripts/seed.mjs
 */
import mongoose from "mongoose";

import { BOOKS, ORDERS } from "./catalogue.mjs";

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("✗ set MONGODB_URI");
  process.exit(1);
}
const HARD_COPY_EXTRA = 3;
const day = 24 * 3600 * 1000;

await mongoose.connect(uri, { dbName: process.env.MONGODB_DB || "restAPI", serverSelectionTimeoutMS: 15000 });
const db = mongoose.connection.db;
const books = db.collection("books");
const orders = db.collection("orders");

await books.createIndex({ slug: 1 }, { unique: true });
await books.createIndex({ title: 1 }, { unique: true });
await books.deleteMany({ $or: [{ seeded: { $ne: true } }, { slug: { $nin: BOOKS.map((b) => b.slug) } }] });

const now = new Date();
for (const b of BOOKS) {
  const img = (n) => `/books/${b.slug}/${n}.jpg`;
  await books.updateOne(
    { slug: b.slug },
    {
      $set: {
        title: b.title,
        slug: b.slug,
        author: b.author,
        description: b.description,
        category: b.category,
        frontCoverImage: img("front"),
        backCoverImage: img("back"),
        bookImages: [img("title"), img("opening")],
        price: b.price,
        quantity: b.quantity,
        language: "English",
        bookFormat: "Paperback",
        pages: b.pages,
        dimensions: "5.5 × 8.5 in",
        publicationDate: new Date(Date.UTC(b.year, 0, 1)),
        bookRating: { average: 0, count: 0 },
        seeded: true,
        updatedAt: now
      },
      $setOnInsert: { createdAt: now, uploadedAt: now }
    },
    { upsert: true }
  );
}

const bySlug = Object.fromEntries((await books.find({}, { projection: { slug: 1, title: 1, price: 1 } }).toArray()).map((b) => [b.slug, b]));
await orders.deleteMany({});
await orders.insertMany(
  ORDERS.map(([name, city, country, slug, quantity, format, paymentMethod, status, daysAgo], i) => {
    const book = bySlug[slug];
    const unit = book.price + (format === "Hard copy" ? HARD_COPY_EXTRA : 0);
    const at = new Date(now.getTime() - daysAgo * day - i * 3600 * 1000);
    return {
      name,
      email: name.toLowerCase().replace(/[^a-z]+/g, ".") + "@example.com",
      address: `House ${12 + i * 7}, Street ${3 + (i % 5)}`,
      city,
      country,
      zipCode: String(44000 + i * 113),
      book: book.title,
      bookId: book._id,
      format,
      quantity,
      price: unit,
      total: unit * quantity,
      paymentMethod,
      status,
      createdAt: at,
      updatedAt: at
    };
  })
);

console.log(`✓ ${await books.countDocuments()} books, ${await orders.countDocuments()} orders in ${db.databaseName}`);
await mongoose.disconnect();
