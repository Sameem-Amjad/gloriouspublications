import mongoose from "mongoose";

import connect from "./connectDB";
import Book from "./models/bookSchema";
import { plain } from "./serialize";

export async function getBook(slugOrId) {
  await connect();
  const doc = mongoose.isValidObjectId(slugOrId) ? await Book.findById(slugOrId).lean() : await Book.findOne({ slug: slugOrId }).lean();
  return doc ? plain(doc) : null;
}

export async function moreFromCategory(book, limit = 5) {
  await connect();
  const docs = await Book.find({ category: book.category, _id: { $ne: book._id } }).limit(limit).lean();
  return plain(docs);
}
