"use client";
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import HTMLFlipBook from 'react-pageflip';
import { GrLock } from "react-icons/gr";
import "@/app/globals.css";
import { HiOutlineShoppingBag } from "react-icons/hi2";

const images = [
  '/test front.jpg',
  '/images.jpeg',
  '/images.jpeg',
  '/old.jpg',
  '/old.jpg',
  '/images.jpeg',
  '/images.jpeg',
  '/test back.jpg',
];
const Bookflip = () => {
    const flipBook = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [dimensions, setDimensions] = useState({ width: 300, height: 450 });
    useEffect(() => {
      const updateDimensions = () => {
        if (window.innerWidth < 640) {
          setDimensions({ width: 180, height: 270 });
        } else {
          setDimensions({ width: window.innerWidth / 4, height: (window.innerWidth / 4) * 1.5 });
        }
      };
  
      updateDimensions();
      window.addEventListener('resize', updateDimensions);
  
      return () => {
        window.removeEventListener('resize', updateDimensions);
      };
    }, []);
  return (
    <div className="flex flex-col items-center sm:justify-center max-sm:py-20 h-screen ">
      <HTMLFlipBook
        width={dimensions.width}
        height={dimensions.height}
        showCover={true}
        ref={flipBook}
        onFlip={(e) => console.log(e.data)}
        className=""
      >
        {images.map((image, index) => (
          <div key={index} className="w-full h-full rounded shadow-md relative">
            <Image src={image} alt={`Image ${index + 1}`} layout="fill" objectFit="cover" className="h-full w-full rounded shadow-md" />
            {index === images.length - 1 && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-70">
                <GrLock className="text-white text-6xl" />
                <div className='flex flex-col items-center p-4'>
                  <h2 className='text-white'>Sample Preview has ended</h2>
                  <h2 className='text-white'>Purchase book for more</h2>
                </div>
              </div>
            )}
            {index === 0 && (
              <div className='absolute inset-0 flex items-center justify-center blink'>
                <h2 className='text-md sm:text-xl bg-white bg-opacity-50 rounded-md'>Tap or Swipe to turn pages</h2>
              </div>
            )}
          </div>
        ))}
      </HTMLFlipBook>
      <div className='flex p-4 gap-1 sm:w-2/4 items-center justify-center'>
        <button className='rounded-md py-1 px-4 border border-gray-800 shadow-lg sm:w-2/5 text-gray-800 hover:bg-blue-600 hover:text-white active:bg-blue-700'>
          Add to Cart
        </button>
        <button className='rounded-md py-1 px-4 border bg-gray-800 shadow-lg sm:w-2/5 text-white hover:bg-blue-600 active:bg-blue-700 flex justify-center items-center'>
          <HiOutlineShoppingBag className='text-xl mr-2' />Buy Now
        </button>
      </div>
    </div>
  )
}

export default Bookflip