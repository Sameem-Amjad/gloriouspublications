"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaCartPlus } from "react-icons/fa";

const BookCard = ({ frontImage, backImage, index, book }) => {
  const [currentImage, setCurrentImage] = useState(frontImage);
  const [isHovered, setIsHovered] = useState(false);
  const [fade, setFade] = useState(false);
  const [cart, setCart] = useState([]);
  useEffect(() => {
    let intervalId;
    if (isHovered) {
      intervalId = setInterval(() => {
        setFade(true);
        setTimeout(() => {
          setCurrentImage((prevImage) =>
            prevImage === frontImage ? backImage : frontImage
          );
          setFade(false);
        }, 500);
      }, 2000);
    } else {
      setCurrentImage(frontImage);
      setFade(false);
    }
    return () => clearInterval(intervalId);
  }, [isHovered, frontImage, backImage]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const addToCart = (book) => {
    const newCart = [...cart, book];
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 2000); // Alert will be visible for 2 seconds
  };
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const bookQueryParams = `?book=${encodeURIComponent(JSON.stringify(book))}`;
  return (
    <div
      className={`flex flex-col rounded-md bg-gray-50 p-2 sm:w-1/6 animate-slide-in w-[100%]`}
      style={{ animationDelay: `${index * 0.2}s` }}
    >
      <div className="flex sm:flex-col gap-2">
        <div
          className="relative w-full rounded-md overflow-hidden"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Image
            src={currentImage}
            alt="Book Cover"
            width={300}
            height={400}
            className={`rounded-md active:opacity-50 w-full sm:transition-opacity sm:duration-700 ${
              fade ? "sm:opacity-0" : "sm:opacity-100"
            }`}
          />
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <Link href={`/user${bookQueryParams}`}>
              <h2 className="text-xl py-1">{book.title}</h2>
            </Link>
            <h2 className="text-red-600">
              Author:{" "}
              <span className="text-blue-600 font-semibold">{book.author}</span>
            </h2>
          </div>

          <div>
            <div className="flex gap-2 items-center">
              <h2 className="text-2xl text-green-600">
                $ {Math.floor(book.price)}
              </h2>
              <h2>E-book</h2>
            </div>
            <div className="flex justify-between">
              <div
                className="flex gap-1 items-center"
                onClick={() => addToCart(book)}
              >
                <FaCartPlus className="text-2xl cursor-pointer" />
                <h2>Add to Cart</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
