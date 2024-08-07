import mongoose from 'mongoose';
const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
      },
      author: {
        type: String,
      },
      description: {
        type: String,
      },
      category: {
        type: String,
      },
      frontCoverImage: {
        type: String,
      },
      backCoverImage: {
        type: String,
      },
      bookImages: [{
        type: String,
      }],
      price: {
        type: Number,
      },
      language: {
        type: String,
      },
      bookFormat: {
        type: String,
      },
      pages: {
        type: Number,
      },
      dimensions: {
        type: String,
      },
      isbn: {
        type: String,
      },
      ebookPdf: {
        type: String,
      },
      uploadedAt: {
        type: Date,
        default: Date.now,
      },
      bookRating: {
        average: {
          type: Number,
          min: 0,
          max: 5,
        },
        count: {
          type: Number,
          default: 0,
        }
      },
      publicationDate: {
        type: Date,
      },
      quantity: {
        type: Number,
      }
});
export default mongoose.models.Book || mongoose.model('Book', BookSchema);
