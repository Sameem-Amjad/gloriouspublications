"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import "../globals.css";
import gloriouslogo from "@/public/gloriouslogo.jpg";
import { BsCart4 } from "react-icons/bs";
import {
  HiOutlineMenuAlt1,
  HiOutlineShoppingBag,
  HiOutlinePhone,
  HiOutlineInformationCircle,
} from "react-icons/hi";

const HomeHeader = () => {
  const [isRotated, setIsRotated] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const handleClick = () => {
    setIsRotated(!isRotated);
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const updateCartCount = () => {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        const cartItems = JSON.parse(storedCart);
        setCartCount(cartItems.length);
      } else {
        setCartCount(0);
      }
    };

    // Initial check
    updateCartCount();

    // Set up storage event listener
    window.addEventListener("storage", updateCartCount);

    // Clean up event listener on component unmount
    return () => window.removeEventListener("storage", updateCartCount);
  }, []);

  return (
    <div className="relative z-50">
      <div className="bg-gray-800 flex flex-1 pr-[6%] pl-[5%] justify-between items-center py-2 w-full">
        <div className="flex text-white items-center gap-2 sm:gap-8">
          <HiOutlineMenuAlt1
            onClick={handleClick}
            className={`text-3xl sm:hidden transform transition-transform duration-500 ${
              isRotated ? "-rotate-180" : ""
            }`}
          />
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
          <Link href="/user/cart" className="relative text-3xl hover:opacity-75">
            <BsCart4 />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2 py-1">
                {cartCount}
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
        <h2 className="flex items-center gap-1 mt-2 text-2xl">Categories</h2>
        <label className="flex items-center justify-between text-xl">
          Coming Soon
          <input type="checkbox" name="e-book" className="mr-2" />
        </label>
        <label className="flex items-center justify-between">
          New Arrival
          <input type="checkbox" name="e-book" className="mr-2" />
        </label>
        <label className="flex items-center justify-between">
          Children and Youth
          <input type="checkbox" name="e-book" className="mr-2" />
        </label>
        <label className="flex items-center justify-between">
          Sacred Writings
          <input type="checkbox" name="e-book" className="mr-2" />
        </label>
        <label className="flex items-center justify-between">
          Devotions
          <input type="checkbox" name="e-book" className="mr-2" />
        </label>
        <label className="flex items-center justify-between">
          History
          <input type="checkbox" name="e-book" className="mr-2" />
        </label>
        <label className="flex items-center justify-between">
          Introductory Books
          <input type="checkbox" name="e-book" className="mr-2" />
        </label>
        <hr className="border-gray-600" />
        <h2 className="flex items-center gap-1 mt-4 active:text-blue-700">
          <HiOutlineShoppingBag />
          Check Out
        </h2>
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
