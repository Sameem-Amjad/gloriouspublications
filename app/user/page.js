"use client";
import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { HiOutlineBuildingOffice, HiOutlineShoppingBag } from "react-icons/hi2";
import {
  IoCalendarOutline,
  IoEarthOutline,
  IoDocumentsOutline,
} from "react-icons/io5";
import BuyForm from "../components/BuyForm";
import { LuBookMarked } from "react-icons/lu";
import { RxDimensions } from "react-icons/rx";
import { RiBarcodeLine } from "react-icons/ri";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import Modal from "../components/Modal";
import Link from "next/link";

const Book = () => {
  const searchParams = useSearchParams();
  const bookString = searchParams.get("book");
  const book = bookString ? JSON.parse(bookString) : null;
  const [isModalBookOpen, setIsModalBookOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const handleBuy = () => {
    setIsModalBookOpen(true);
  };
  const closeBookModal = () => {
    setIsModalBookOpen(false);
  };
  const openModal = (imageSrc) => {
    setSelectedImage(imageSrc);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const addToCart = (book) => {
    const newCart = [...cart, book];
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 2000); // Alert will be visible for 2 seconds
  };

  return (
    <div className="relative flex max-sm:flex-col p-8 gap-4">
      {showAlert && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-md shadow-lg z-50">
          <p>Item added to cart successfully!</p>
        </div>
      )}
      <div className="flex flex-col sm:w-1/2">
        <div className="flex gap-4 p-2 ">
          <div
            className="relative rounded-lg cursor-pointer "
            onClick={() => openModal(book.frontCoverImage)}
          >
            <Image
              src={book.frontCoverImage}
              alt="Front Cover"
              width={300}
              height={400}
              className="w-full sm:w-60"
            />
            <div className="absolute max-sm:hidden inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 hover:opacity-100 transition-opacity duration-300">
              <span className="text-xl font-bold">View Image</span>
            </div>
          </div>
          <div
            className="relative rounded-lg cursor-pointer"
            onClick={() => openModal(book.backCoverImage)}
          >
            <Image
              src={book.backCoverImage}
              alt="Back Cover"
              width={300}
              height={400}
              className="w-full sm:w-60"
            />
            <div className="absolute max-sm:hidden inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 hover:opacity-100 transition-opacity duration-300">
              <span className="text-xl font-bold">View Image</span>
            </div>
          </div>
        </div>
        <h2 className="text-3xl w-full">{book.title}</h2>
        <h3 className="text-blue-700 font-semibold">Author: {book.author}</h3>
        <div className="flex py-8 justify-center">
          <Link
            className="rounded-md bg-gray-800 px-10 py-2 text-white hover:bg-blue-600 active:bg-blue-700"
            href="/user/preview"
          >
            Preview Sample
          </Link>
        </div>
      </div>
      <div className="sm:w-1/2">
        <h2 className="max-sm:hidden text-3xl w-full">{book.title}</h2>
        <h3 className="max-sm:hidden text-blue-700 font-semibold">
          Author: {book.author}
        </h3>
        <div className="flex items-center gap-2">
          <h3 className="text-2xl text-green-500">${Math.floor(book.price)}</h3>
          <h3 className="text-red-500 pr-4">E-book</h3>
          <h3 className="text-2xl text-green-500">
            ${Math.floor(book.price) + 3}
          </h3>
          <h3 className="text-red-500">Hard copy</h3>
        </div>
        <h2 className="text-xl font-bold">Description:</h2>
        <p>{book.description}</p>
        <div className="flex max-sm:flex-col py-4 gap-4 sm:items-center">
          <div className="flex gap-4">
            <h3 className="font-semibold">Category:</h3>
            <h3 className="border-2 border-black text-blue-700 px-2">
              {book.category}
            </h3>
          </div>
          <div className="flex gap-4">
            <h3 className="font-semibold">In Stock:</h3>
            <h3 className="border-2 border-black text-blue-700 px-2">
              {book.quantity}
            </h3>
          </div>
        </div>
        <div className="flex flex-col py-4 gap-1 items-center justify-center">
          <button
            onClick={() => addToCart(book)}
            className="rounded-md border border-gray-800 shadow-lg w-2/4 py-2 text-gray-800 hover:bg-blue-600 hover:text-white active:bg-blue-700 flex justify-center items-center"
          >
            Add To Cart
          </button>
          <button
            onClick={handleBuy}
            className="rounded-md border bg-gray-800 shadow-lg w-2/4 py-2 text-white hover:bg-blue-600 active:bg-blue-700 flex justify-center items-center"
          >
            <HiOutlineShoppingBag className="text-2xl mr-2" />
            Buy Now
          </button>
        </div>
        <hr className="my-4 border-gray-800" />
        <div className="flex flex-wrap max-sm:flex-col py-2 gap-4">
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-gray-600 font-mono text-[12px]">Publisher</h3>
            <HiOutlineBuildingOffice className="w-8 h-8" />
            <h3 className="text-[13px] text-center">Glorious Publications</h3>
          </div>
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-gray-600 font-mono text-[12px] whitespace-nowrap">
              Published On
            </h3>
            <IoCalendarOutline className="w-8 h-8" />
            <h3 className="text-[13px] text-center">{book.publicationDate}</h3>
          </div>
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-gray-600 font-mono text-[12px]">Language</h3>
            <IoEarthOutline className="w-8 h-8" />
            <h3 className="text-[13px] text-center">{book.language}</h3>
          </div>
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-gray-600 font-mono text-[12px] whitespace-nowrap">
              Book Format
            </h3>
            <LuBookMarked className="w-8 h-8" />
            <h3 className="text-[13px] text-center">{book.bookFormat}</h3>
          </div>
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-gray-600 font-mono text-[12px]">Pages</h3>
            <IoDocumentsOutline className="w-8 h-8" />
            <h3 className="text-[13px] text-center">{book.pages}</h3>
          </div>
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-gray-600 font-mono text-[12px]">Dimensions</h3>
            <RxDimensions className="w-8 h-8" />
            <h3 className="text-[13px] text-center">{book.dimensions}</h3>
          </div>
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-gray-600 font-mono text-[12px]">ISBN-10</h3>
            <RiBarcodeLine className="w-8 h-8" />
            <h3 className="text-[13px] text-center">527-0188368629</h3>
          </div>
        </div>
        <hr className="my-4 border-gray-800" />
        <h2 className="text-[20px] font-semibold pt-1">Rating:</h2>
        <div className="flex gap-1 text-yellow-400 text-[20px] items-center py-2">
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStarHalfAlt />
        </div>
        <button className="rounded-md text-[12px] border border-blue-500 px-2 py-1 text-blue-500 hover:bg-blue-600 hover:text-white active:bg-blue-700">
          Rate Book
        </button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        imageSrc={selectedImage}
        alt="Full Screen Image"
      />
      {isModalBookOpen && (
        <div className="fixed inset-0 flex  items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 w-[800px] rounded-lg shadow-lg">
            <BuyForm book={book} closeModal={closeBookModal} />
          </div>
        </div>
      )}
    </div>
  );
};

function UserPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Book />
    </Suspense>
  );
}
export default UserPageWrapper;
