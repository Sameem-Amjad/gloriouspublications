"use client";
import React from 'react';
import "../globals.css";
import { FaEnvelope, FaFacebook, FaPhone } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="bg-gray-800 text-center p-6 text-white" id='footer'>
      <div className="mb-4">
        <p>Editorial Address: D.A.V College Road, Rawalpindi, Pakistan</p>
      </div>
      <div className="mb-4">
        <p className="mb-2">Contact Us:</p>
        <a href="" className="mx-2 inline-flex items-center hover:text-blue-700">
          <FaEnvelope className="mr-1" /> Email
        </a>
        <a href="" className=" mx-2 inline-flex items-center hover:text-blue-700">
          <FaFacebook className="mr-1" /> Facebook
        </a>
        <a href="" className=" mx-2 inline-flex items-center hover:text-blue-700">
          <FaPhone className="mr-1" /> Telephone
        </a>
      </div>
      <div className="mb-4">
        <a href="" className=" hover:text-blue-700 mx-2">Shipping Policy</a>
        <a href="" className=" hover:text-blue-700 mx-2">Return Policy</a>
      </div>
      <hr className="my-4 border-gray-300" />
      <div>
        <p>&copy; {new Date().getFullYear()} Glorious Publications, All rights reserved.</p>
        <p>Developed by <a href="https://www.bytesighttechnologies.live/" className='text-sky-500 hover:text-sky-700' target="_blank" rel="noopener noreferrer">Bytesight Technologies</a></p>
      </div>
    </div>
  );
}

export default Footer;
