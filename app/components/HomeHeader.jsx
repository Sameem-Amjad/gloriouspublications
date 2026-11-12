"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import "../globals.css";
import gloriouslogo from "@/public/gloriouslogo.jpg";
import { BsCart4 } from "react-icons/bs";
import { cartCount, readCart } from "@/lib/cart";
import {
  HiOutlineMenuAlt1,
  HiOutlineShoppingBag,
  HiOutlinePhone,
  HiOutlineInformationCircle,
} from "react-icons/hi";

const HomeHeader = () => {
  const [isRotated, setIsRotated] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartTotal, setCartCount] = useState(0);

  const handleClick = () => {
    setIsRotated(!isRotated);
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const sync = () => setCartCount(cartCount(readCart()));
    sync();
    // "cart-updated" covers this tab; "storage" covers other tabs.
    window.addEventListener("cart-updated", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("cart-updated", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return (
    <div className="relative z-50">
      <div className="bg-gray-800 flex flex-1 pr-[6%] pl-[5%] justify-between items-center py-2 w-full">
        <div className="flex text-white items-center gap-2 sm:gap-8">
          <button type="button" onClick={handleClick} aria-label="Menu" aria-expanded={isMenuOpen} className="sm:hidden">
            <HiOutlineMenuAlt1
              className={`text-3xl transform transition-transform duration-500 ${
                isRotated ? "-rotate-180" : ""
              }`}
            />
          </button>
          <Link href="/">
            <Image
              src={gloriouslogo}
              alt="Logo"
              className="rounded-full w-14"
            />
          </Link>
          <h1 className="text-lg md:text-2xl font-bold">
            Glorious Publications
          </h1>
        </div>

        <div className="flex gap-6 py-2 items-center text-white text-lg">
          <Link href="#footer" className="max-sm:hidden">
            <h2 className="flex items-center gap-1 mt-2 active:text-blue-700 hover:opacity-70 link-underline link-underline-black">
              <HiOutlinePhone />
              Contact Us
            </h2>
          </Link>
          <Link href="/about" className="max-sm:hidden">
            <h2 className="flex items-center gap-1 mt-2 active:text-blue-700 hover:opacity-70 link-underline link-underline-black">
              <HiOutlineInformationCircle />
              About Us
            </h2>
          </Link>
          <Link href="/cart" aria-label={`Cart, ${cartTotal} items`} className="relative text-3xl hover:opacity-75">
            <BsCart4 />
            {cartTotal > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2 py-1">
                {cartTotal}
              </span>
            )}
          </Link>
        </div>
      </div>

      <div
        className={`absolute z-10 text-white left-0 top-full border-t border-gray-600 w-1/2 bg-gray-800 p-4 transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300`}
      >
        <h1 className="text-xl font-bold">Menu</h1>
        <hr className="border-gray-600" />

        <Link href="/" className="flex items-center gap-1 mt-4 active:text-blue-700" onClick={handleClick}>
          <HiOutlineShoppingBag />
          <h2>Shop</h2>
        </Link>
        <Link href="/cart" className="flex items-center gap-1 mt-2 active:text-blue-700" onClick={handleClick}>
          <BsCart4 />
          <h2>Cart</h2>
        </Link>
        <Link
          href="#footer"
          className="flex items-center gap-1 mt-2 active:text-blue-700"
        >
          <HiOutlinePhone />
          <h2>Contact Us</h2>
        </Link>
        <Link
          href="/about"
          className="flex items-center gap-1 mt-2 active:text-blue-700"
        >
          <HiOutlineInformationCircle />
          <h2>About Us</h2>
        </Link>
      </div>
    </div>
  );
};

export default HomeHeader;
