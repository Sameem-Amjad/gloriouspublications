"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
const Page = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("/api/books");
        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }
        const data = await response.json();
        console.log("Fetched books:", JSON.parse(data));
        setBooks(JSON.parse(data));
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="flex gap-3 flex-col">
      <div className="flex-1 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Manage Books</h2>
        <Link
          href="/admin/books/insert"
          className="bg-gray-800 hover:bg-blue-500 text-white py-3 px-2 rounded-md"
        >
          Add Book
        </Link>
      </div>
      <div className="flex gap-3">
        <div className="w-full">
          <table className="border w-full">
            <thead>
              <tr>
                <th className="border p-2">Title</th>
                <th className="border p-2">Author</th>
                <th className="border p-2">Category</th>
                <th className="border p-2">Language</th>
                <th className="border p-2">Price</th>
                <th className="border p-2">Book Format</th>
                <th className="border p-2">Pages</th>
                <th className="border p-2">Dimensions</th>
                <th className="border p-2">ISBN</th>
                <th className="border p-2">Listing Date</th>
                <th className="border p-2">Publication Date</th>
                <th className="border p-2">Front Cover</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {books.length>0 && books?.map((book) => {
                console.log(book)
                let bookUrl = book?.frontCoverImage;
                let imgid = bookUrl?.split("/")[5];
                console.log(imgid);

                let finalImgUrl = `${book?.frontCoverImage?.split("file")[0]}uc?export=${bookUrl?.split("/")[6]}&id=${imgid}`
                console.log("final ur is : ", finalImgUrl);
                return (
                  <tr key={book._id}>
                    <td className="border p-2">{book.title}</td>
                    <td className="border p-2">{book.author}</td>
                    <td className="border p-2">{book.category}</td>
                    <td className="border p-2">{book.language}</td>
                    <td className="border p-2">${book.price}</td>
                    <td className="border p-2">{book.bookFormat}</td>
                    <td className="border p-2">{book.pages}</td>
                    <td className="border p-2">{book.dimensions}</td>
                    <td className="border p-2">{book.isbn}</td>
                    <td className="border p-2">
                      {new Date(book.createdAt).toLocaleDateString()}
                    </td>
                    <td className="border p-2">
                      {new Date(book.publicationDate).toLocaleDateString()}
                    </td>
                    <td className="border p-2">
                      <Image
                        src={finalImgUrl}
                        width={50}
                        height={50}
                        alt={`${book.title} front cover`}
                        className="h-full w-fit object-cover"
                      />
                    </td>
                    <td className="border p-2">
                      <Link
                        href={`/admin/books/edit/${book._id}`}
                        className="text-blue-500 hover:underline"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Page;
