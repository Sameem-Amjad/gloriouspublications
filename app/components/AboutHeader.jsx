"use client"
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import "@/app/globals.css";
import gloriouslogo from '@/public/gloriouslogo.jpg';
import { BsCart4 } from "react-icons/bs";
const AboutHeader = () => {
  return (
    <div className='bg-gray-800 flex flex-1 pr-[6%] pl-[5%] justify-between items-center py-2 w-full'>
        <div className='flex items-center gap-4 md:gap-8'>
            <Link href="/"><Image src={gloriouslogo} alt="Logo" className='rounded-full w-14'/></Link>
            <h1 className='text-white text-lg md:text-2xl font-bold'>Glorious Publications</h1>
        </div>
        
        <div className='flex justify-end text-white gap-8 py-2 items-center'>
            <Link href="./" className='hidden md:flex md:font-semibold hover:opacity-75 link-underline link-underline-black'>Continue to Shop</Link>
            <Link href="#" className='text-3xl hover:opacity-75'><BsCart4/></Link>
        </div>
    </div>
  )
}

export default AboutHeader