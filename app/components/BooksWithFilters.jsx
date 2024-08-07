"use client";
import React, { useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import Categories from "./Categories";
// import { IoFilter, IoSearch } from "react-icons/io5";

const BookCard = dynamic(() => import("./BookCard"), {
  loading: () => <div>Loading...</div>,
  suspense: true,
});

const BooksWithFilters = () => {
  const [books, setBooks] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortOption, setSortOption] = useState("title");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterFormat, setFilterFormat] = useState({
    ebook: false,
    hardCopy: false,
  });
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("/api/books");
        const data = await response.json();
        setBooks(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBooks();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredBooks = books
    .filter((book) => {
      if (selectedCategories.length === 0) return true;
      return selectedCategories.includes(book.category);
    })
    .filter((book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((book) => {
      if (!filterFormat.ebook && !filterFormat.hardCopy) return true;
      if (filterFormat.ebook && book.bookFormat.includes("Paperback"))
        return true;
      if (filterFormat.hardCopy && book.bookFormat.includes("Hardcover"))
        return true;
      return false;
    })
    .sort((a, b) => {
      if (sortOption === "title") return a.title.localeCompare(b.title);
      if (sortOption === "price-low-to-high") return a.price - b.price;
      if (sortOption === "price-high-to-low") return b.price - a.price;
      return 0;
    });

  const categories = [
    "Coming Soon",
    "New Arrival",
    "Children and Youth",
    "Sacred Writings",
    "Devotions",
    "History",
    "Introductory Books",
  ];

  return (
    <div className="flex flex-col items-center ">
      <div className="bg-custom-container w-full">
        <div className="bg-custom"></div>
        <div className="content p-8">
          <input
            type="search"
            className="border border-black px-3 py-3 rounded-lg w-2/3 sm:w-1/3 h-10"
            placeholder="Search by title"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          {/* <button className="flex text-gray-800 text-3xl bg-white rounded-lg border border-black w-10 h-10 justify-center items-center sm:hover:bg-gray-800 sm:hover:text-white active:text-blue-700">
            <IoSearch />
          </button> */}
        </div>
      </div>
      <div className="flex flex-col max-sm:items-center py-4 relative">
        <Categories
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          sortOption={sortOption}
          setSortOption={setSortOption}
          filterFormat={filterFormat}
          setFilterFormat={setFilterFormat}
        />
      </div>
      <div className="flex flex-wrap justify-center p-2 w-full gap-4">
        <Suspense fallback={<div>Loading books...</div>}>
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
    </div>
  );
};

export default BooksWithFilters;
