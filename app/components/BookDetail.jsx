"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { HiOutlineBuildingOffice, HiOutlineShoppingBag } from "react-icons/hi2";
import { IoCalendarOutline, IoDocumentsOutline, IoEarthOutline } from "react-icons/io5";
import { LuBookMarked } from "react-icons/lu";
import { RiBarcodeLine } from "react-icons/ri";

import { addToCart } from "@/lib/cart";

import BuyForm from "./BuyForm";
import Modal from "./Modal";

const HARD_COPY_EXTRA = 3;

export default function BookDetail({ book, related }) {
  const [zoom, setZoom] = useState(null);
  const [format, setFormat] = useState(book.quantity > 0 ? "Hard copy" : "E-book");
  const [buying, setBuying] = useState(false);
  const [added, setAdded] = useState(false);
  const inStock = book.quantity > 0;
  const comingSoon = book.category === "Coming Soon";
  const year = book.publicationDate ? new Date(book.publicationDate).getFullYear() : null;

  const add = () => {
    addToCart(book, format);
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  const facts = [
    { label: "Publisher", icon: HiOutlineBuildingOffice, value: "Glorious Publications" },
    year && { label: "First published", icon: IoCalendarOutline, value: year },
    { label: "Language", icon: IoEarthOutline, value: book.language },
    { label: "Format", icon: LuBookMarked, value: book.bookFormat },
    book.pages && { label: "Pages", icon: IoDocumentsOutline, value: book.pages },
    book.isbn && { label: "ISBN", icon: RiBarcodeLine, value: book.isbn }
  ].filter(Boolean);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-8">
      <nav className="mb-6 text-sm text-gray-500">
        <Link href="/" className="hover:text-gray-800">Shop</Link> <span aria-hidden>/</span> {book.category}
      </nav>
      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <div className="flex gap-4">
            {[book.frontCoverImage, book.backCoverImage].filter(Boolean).map((src, i) => (
              <button key={src} type="button" onClick={() => setZoom(src)} className="group relative w-1/2 overflow-hidden rounded-md shadow-md">
                <Image src={src} alt={`${book.title}, ${i === 0 ? "front" : "back"} cover`} width={600} height={900} className="h-auto w-full" priority={i === 0} />
                <span className="absolute inset-0 hidden items-center justify-center bg-black/50 text-sm font-semibold text-white group-hover:flex">View larger</span>
              </button>
            ))}
          </div>
          {book.bookImages?.length ? (
            <Link href={`/books/${book.slug}/preview`} className="mt-6 inline-flex w-full items-center justify-center rounded-md bg-gray-800 px-6 py-3 text-white hover:bg-blue-600">
              Preview the first pages
            </Link>
          ) : null}
        </div>

        <div>
          <h1 className="text-3xl font-semibold text-gray-900">{book.title}</h1>
          <p className="mt-1 font-semibold text-blue-700">{book.author}</p>
          <p className="mt-4 leading-relaxed text-gray-700">{book.description}</p>

          <fieldset className="mt-6">
            <legend className="mb-2 text-sm font-semibold text-gray-800">Choose a format</legend>
            <div className="grid grid-cols-2 gap-3">
              {[
                { f: "E-book", price: book.price, note: comingSoon ? "Coming soon" : "Instant download", disabled: comingSoon },
                { f: "Hard copy", price: book.price + HARD_COPY_EXTRA, note: inStock ? `${book.quantity} in stock` : "Coming soon", disabled: !inStock }
              ].map((o) => (
                <label
                  key={o.f}
                  className={`cursor-pointer rounded-lg border-2 p-3 ${format === o.f ? "border-blue-600 bg-blue-50" : "border-gray-200"} ${o.disabled ? "cursor-not-allowed opacity-50" : ""}`}
                >
                  <input type="radio" name="format" value={o.f} checked={format === o.f} onChange={() => setFormat(o.f)} disabled={o.disabled} className="sr-only" />
                  <span className="block text-sm text-gray-600">{o.f}</span>
                  <span className="block text-2xl font-semibold text-green-700">${o.price}</span>
                  <span className={`block text-xs ${o.disabled ? "text-red-600" : "text-gray-500"}`}>{o.note}</span>
                </label>
              ))}
            </div>
          </fieldset>

          {comingSoon ? (
            <p className="mt-6 rounded-md bg-amber-50 p-3 text-sm text-amber-900">Coming soon: this title isn&apos;t on sale yet.</p>
          ) : (
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <button type="button" onClick={add} className="rounded-md border border-gray-800 py-3 text-gray-800 hover:bg-gray-100">
              {added ? "Added to cart ✓" : "Add to cart"}
            </button>
            <button type="button" onClick={() => setBuying(true)} className="flex items-center justify-center rounded-md bg-gray-800 py-3 text-white hover:bg-blue-600">
              <HiOutlineShoppingBag className="mr-2 text-xl" /> Buy now
            </button>
          </div>
          )}
          <p role="status" className="mt-2 h-5 text-sm text-green-700">{added ? `${book.title} (${format}) is in your cart.` : ""}</p>

          <hr className="my-6" />
          <dl className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {facts.map(({ label, icon: Icon, value }) => (
              <div key={label} className="flex items-start gap-2">
                <Icon className="mt-1 h-5 w-5 shrink-0 text-gray-500" />
                <div>
                  <dt className="text-xs uppercase tracking-wide text-gray-500">{label}</dt>
                  <dd className="text-sm text-gray-900">{value}</dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {related?.length ? (
        <section className="mt-14">
          <h2 className="mb-4 text-xl font-semibold">More in {book.category}</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
            {related.map((r) => (
              <Link key={r._id} href={`/books/${r.slug}`} className="group">
                <Image src={r.frontCoverImage} alt="" width={300} height={450} className="h-auto w-full rounded-md shadow group-hover:opacity-90" />
                <p className="mt-2 text-sm font-medium">{r.title}</p>
                <p className="text-xs text-gray-500">{r.author}</p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <Modal isOpen={Boolean(zoom)} onClose={() => setZoom(null)} imageSrc={zoom} alt={`${book.title} cover`} />
      {buying ? <BuyForm items={[{ ...book, bookId: book._id, cover: book.frontCoverImage, format, quantity: 1 }]} onClose={() => setBuying(false)} /> : null}
    </div>
  );
}
