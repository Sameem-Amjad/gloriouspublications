"use client";
import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import { BookSkeleton } from "./Skeletons";

const BookCard = dynamic(() => import("./BookCard"), {
  loading: () => <BookSkeleton />,
  suspense: true,
});

const Books = ({ books, selectedCategories, sortOption }) => {
  const filteredBooks = books
    .filter(
      (book) =>
        selectedCategories.length === 0 ||
        selectedCategories.includes(book.category)
    )
    .sort((a, b) => {
      if (sortOption === "title") return a.title.localeCompare(b.title);
      if (sortOption === "category")
        return a.category.localeCompare(b.category);
      if (sortOption === "newest")
        return new Date(b.releaseDate) - new Date(a.releaseDate);
      if (sortOption === "oldest")
        return new Date(a.releaseDate) - new Date(b.releaseDate);
      if (sortOption === "price-low-to-high") return a.price - b.price;
      if (sortOption === "price-high-to-low") return b.price - a.price;
      return 0;
    });

  return (
    <div className="flex flex-wrap justify-center p-2 gap-4">
      <Suspense fallback={<BookSkeleton />}>
        {filteredBooks.map((book, index) => (
          <BookCard
            key={index}
            frontImage={book.frontCoverImage}
            backImage={book.backCoverImage}
            index={index}
            book={book}
          />
        ))}
      </Suspense>
    </div>
  );
};

export default Books;
