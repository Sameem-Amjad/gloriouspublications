"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { GrLock } from "react-icons/gr";
import HTMLFlipBook from "react-pageflip";

import { addToCart } from "@/lib/cart";

/** Page-flip preview: the front cover, the book's sample pages, then a locked last page. */
export default function Bookflip({ book }) {
  const flip = useRef(null);
  const [size, setSize] = useState({ width: 300, height: 450 });
  const [added, setAdded] = useState(false);
  const pages = [book.frontCoverImage, ...(book.bookImages || []), book.backCoverImage].filter(Boolean);

  useEffect(() => {
    const fit = () => {
      const w = window.innerWidth < 640 ? Math.min(260, window.innerWidth * 0.42) : Math.min(380, window.innerWidth / 4);
      setSize({ width: Math.round(w), height: Math.round(w * 1.5) });
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  return (
    <div className="flex flex-col items-center gap-6 px-4 py-10">
      <div className="text-center">
        <h1 className="text-2xl font-semibold">{book.title}</h1>
        <p className="text-sm text-gray-600">Sample pages. Click or swipe a page corner to turn it.</p>
      </div>
      <HTMLFlipBook key={size.width} width={size.width} height={size.height} showCover ref={flip} className="shadow-2xl">
        {pages.map((src, i) => (
          <div key={`${src}-${i}`} className="relative h-full w-full bg-white">
            <Image src={src} alt={`${book.title}, page ${i + 1}`} fill sizes="400px" className="object-cover" />
            {i === pages.length - 1 ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 p-4 text-center text-white">
                <GrLock className="text-5xl" />
                <p className="mt-3">The sample ends here.</p>
                <p className="text-sm text-white/80">Buy the book to keep reading.</p>
              </div>
            ) : null}
          </div>
        ))}
      </HTMLFlipBook>
      <div className="flex gap-3">
        <button type="button" onClick={() => flip.current?.pageFlip()?.flipPrev()} className="rounded-md border px-4 py-2 hover:bg-gray-100">Previous page</button>
        <button type="button" onClick={() => flip.current?.pageFlip()?.flipNext()} className="rounded-md border px-4 py-2 hover:bg-gray-100">Next page</button>
      </div>
      <div className="flex gap-3">
        {book.category !== "Coming Soon" ? (
          <button
            type="button"
            onClick={() => {
              addToCart(book, book.quantity > 0 ? "Hard copy" : "E-book");
              setAdded(true);
            }}
            className="rounded-md border border-gray-800 px-5 py-2 hover:bg-gray-100"
          >
            {added ? "Added to cart ✓" : "Add to cart"}
          </button>
        ) : null}
        <Link href={`/books/${book.slug}`} className="rounded-md bg-gray-800 px-5 py-2 text-white hover:bg-blue-600">Back to the book</Link>
      </div>
    </div>
  );
}
