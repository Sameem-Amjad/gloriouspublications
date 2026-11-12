import mongoose from "mongoose";

const BookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    author: { type: String, trim: true },
    description: { type: String },
    category: { type: String },
    frontCoverImage: { type: String },
    backCoverImage: { type: String },
    // Sample pages shown in the page-flip preview, in order.
    bookImages: [{ type: String }],
    // E-book price; the hard copy costs HARD_COPY_EXTRA more.
    price: { type: Number, required: true, min: 0 },
    language: { type: String, default: "English" },
    bookFormat: { type: String, default: "Paperback" },
    pages: { type: Number },
    dimensions: { type: String },
    isbn: { type: String },
    ebookPdf: { type: String },
    uploadedAt: { type: Date, default: Date.now },
    bookRating: {
      average: { type: Number, min: 0, max: 5, default: 0 },
      count: { type: Number, default: 0 }
    },
    publicationDate: { type: Date },
    // Hard copies in stock; 0 means "Coming soon" / out of stock.
    quantity: { type: Number, default: 0, min: 0 },
    // Seeded demo titles can be edited but not deleted in demo mode.
    seeded: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export const HARD_COPY_EXTRA = 3;

export default mongoose.models.Book || mongoose.model("Book", BookSchema);
