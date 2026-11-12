"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaCartPlus } from "react-icons/fa";

import { addToCart } from "@/lib/cart";

/** A catalogue card; hovering flips between the front and back covers. */
export default function BookCard({ book, index }) {
  const [showBack, setShowBack] = useState(false);
  const [hover, setHover] = useState(false);
  const [added, setAdded] = useState(false);
  const inStock = book.quantity > 0;

  useEffect(() => {
    if (!hover || !book.backCoverImage) {
      setShowBack(false);
      return;
    }
    const id = setInterval(() => setShowBack((b) => !b), 1800);
    return () => clearInterval(id);
  }, [hover, book.backCoverImage]);

  const add = () => {
    addToCart(book, inStock ? "Hard copy" : "E-book");
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="flex w-[46%] flex-col rounded-md bg-gray-50 p-2 shadow-sm animate-slide-in sm:w-[30%] lg:w-[18%]" style={{ animationDelay: `${index * 0.08}s` }}>
      <Link href={`/books/${book.slug}`} className="relative block overflow-hidden rounded-md" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        <Image
          src={showBack ? book.backCoverImage : book.frontCoverImage}
          alt={`${book.title} cover`}
          width={300}
          height={450}
          className="h-auto w-full rounded-md transition-opacity duration-500"
        />
        {!inStock ? <span className="absolute left-2 top-2 rounded bg-amber-500 px-2 py-0.5 text-xs font-semibold text-white">{book.category === "Coming Soon" ? "Coming soon" : "E-book only"}</span> : null}
      </Link>
      <div className="flex flex-1 flex-col justify-between pt-2">
        <div>
          <Link href={`/books/${book.slug}`} className="block font-medium leading-snug hover:underline">{book.title}</Link>
          <p className="text-sm text-blue-700">{book.author}</p>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <p className="text-lg text-green-700">${book.price} <span className="text-xs text-gray-500">e-book</span></p>
          {book.category === "Coming Soon" ? (
            <span className="text-xs text-amber-700">Coming soon</span>
          ) : (
            <button type="button" onClick={add} aria-label={`Add ${book.title} to cart`} className="flex items-center gap-1 rounded px-2 py-1 text-sm hover:bg-gray-200">
              <FaCartPlus className="text-lg" /> {added ? "Added" : "Add"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
