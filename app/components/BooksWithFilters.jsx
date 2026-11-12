"use client";
import { useEffect, useMemo, useState } from "react";

import BookCard from "./Bookcard";
import Categories from "./Categories";

const SORTS = {
  title: (a, b) => a.title.localeCompare(b.title),
  category: (a, b) => (a.category || "").localeCompare(b.category || "") || a.title.localeCompare(b.title),
  newest: (a, b) => new Date(b.publicationDate || 0) - new Date(a.publicationDate || 0),
  oldest: (a, b) => new Date(a.publicationDate || 0) - new Date(b.publicationDate || 0),
  "price-low-to-high": (a, b) => a.price - b.price,
  "price-high-to-low": (a, b) => b.price - a.price
};

export default function BooksWithFilters() {
  const [books, setBooks] = useState(null);
  const [failed, setFailed] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortOption, setSortOption] = useState("title");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterFormat, setFilterFormat] = useState({ ebook: false, hardCopy: false });

  useEffect(() => {
    fetch("/api/books")
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then(setBooks)
      .catch(() => setFailed(true));
  }, []);

  const shown = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return (books || [])
      .filter((b) => selectedCategories.length === 0 || selectedCategories.includes(b.category))
      .filter((b) => !q || b.title.toLowerCase().includes(q) || (b.author || "").toLowerCase().includes(q))
      .filter((b) => {
        if (!filterFormat.ebook && !filterFormat.hardCopy) return true;
        const ebook = b.category !== "Coming Soon";
        const hard = b.quantity > 0;
        return (filterFormat.ebook && ebook) || (filterFormat.hardCopy && hard);
      })
      .sort(SORTS[sortOption] || SORTS.title);
  }, [books, selectedCategories, searchQuery, filterFormat, sortOption]);

  return (
    <div className="flex flex-col items-center">
      <div className="bg-custom-container w-full">
        <div className="bg-custom"></div>
        <div className="content p-8">
          <label className="sr-only" htmlFor="book-search">Search books</label>
          <input
            id="book-search"
            type="search"
            className="h-10 w-2/3 rounded-lg border border-black px-3 py-3 sm:w-1/3"
            placeholder="Search by title or author"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="relative flex flex-col py-4 max-sm:items-center">
        <Categories
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          sortOption={sortOption}
          setSortOption={setSortOption}
          filterFormat={filterFormat}
          setFilterFormat={setFilterFormat}
        />
      </div>
      <div className="flex w-full max-w-7xl flex-wrap justify-center gap-4 p-2 pb-12" aria-live="polite">
        {failed ? (
          <p className="py-10 text-gray-600">The catalogue couldn&apos;t be loaded. Please try again in a moment.</p>
        ) : books === null ? (
          <p className="py-10 text-gray-500">Loading books…</p>
        ) : shown.length === 0 ? (
          <p className="py-10 text-gray-600">
            {selectedCategories.length ? `No titles in ${selectedCategories.join(", ")} yet.` : "No books match your search."}
          </p>
        ) : (
          shown.map((book, index) => <BookCard key={book._id} book={book} index={index} />)
        )}
      </div>
    </div>
  );
}
