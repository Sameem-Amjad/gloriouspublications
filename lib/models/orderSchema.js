import mongoose from "mongoose";

export const ORDER_STATUSES = ["pending", "processing", "shipped", "delivered", "cancelled"];
export const PAYMENT_METHODS = { cash_on_delivery: "Cash on delivery", bank_transfer: "Bank transfer", card: "Card" };
export const FORMATS = ["E-book", "Hard copy"];

const OrderSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    zipCode: { type: String, required: true },
    // Title kept as written at order time, plus a link to the book.
    book: { type: String, required: true },
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
    format: { type: String, enum: FORMATS, default: "Hard copy" },
    quantity: { type: Number, required: true, min: 1, max: 20 },
    // Unit price at order time, worked out on the server.
    price: { type: Number, required: true },
    total: { type: Number, required: true },
    paymentMethod: { type: String, required: true, enum: Object.keys(PAYMENT_METHODS) },
    status: { type: String, enum: ORDER_STATUSES, default: "pending" }
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
