import { NextRequest, NextResponse } from "next/server";
import connect from "@/lib/connectDB";
import Book from "@/lib/models/bookSchema";

// const ObjectID = require("mongoose").Types.ObjectID;

export const GET = async () => {
  try {
    await connect();
    const books = await Book.find();
    return NextResponse.json(books, { status: 200 });
  } catch (err) {
    return new NextResponse("Error in fetching Books: " + err, { status: 500 });
  }
};

export const POST = async (req)=>{
    try{
        const body = await req.json();
        await connect();
        const newBook = new Book(body);
        await newBook.save();
        return new NextResponse(JSON.stringify({message: "Book is created", book: newBook}), {status: 201});
    }catch(err){
        return new NextResponse("Error in creating Book" + err, {Status: 500});
        
    }
}

export const PATCH = async (req) => {
    try {
        const body = await req.json();
        const { bookID, bookPrice, bookQuantity, bookFormat } = body;

        await connect();
        const updatedBook = await Book.findByIdAndUpdate(
            bookID,
            { bookPrice, bookQuantity, bookFormat },
            { new: true }
        );
        if (!updatedBook) {
            return new NextResponse("Book not found", { status: 404 });
        }
        return new NextResponse(JSON.stringify({ message: "Book updated", book: updatedBook }), { status: 200 });
    } catch (err) {
        return new NextResponse("Error in updating book: " + err, { status: 500 });
    }
};

// DELETE delete a book by ID
export const DELETE = async (req) => {
    try {
        const body = await req.json();
        const { bookID } = body;

        await connect();
        const deletedBook = await Book.findByIdAndDelete(bookID);

        if (!deletedBook) {
            return new NextResponse("Book not found", { status: 404 });
        }

        return new NextResponse(JSON.stringify({ message: "Book deleted", book: deletedBook }), { status: 200 });
    } catch (err) {
        return new NextResponse("Error in deleting book: " + err, { status: 500 });
    }
};

// GET get a book by ID
export const GET_BY_ID = async (req) => {
    try {
        const { id } = req.query;

        await connect();
        const book = await Book.findById(id);

        if (!book) {
            return new NextResponse("Book not found", { status: 404 });
        }

        return NextResponse.json(book, { status: 200 });
    } catch (err) {
        return new NextResponse("Error in fetching book: " + err, { status: 500 });
    }
};