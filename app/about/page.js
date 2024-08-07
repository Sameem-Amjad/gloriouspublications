import React from 'react'
import AboutHeader from '../components/AboutHeader';
import Image from 'next/image';
import gloriouslogo from '@/public/gloriouslogo.jpg';
import "../globals.css";
import Footer from '../components/Footer';
const page = () => {
  return (
    <>
        <AboutHeader/>
        <div className='flex flex-col justify-center items-center p-4'>
            <h2 className='text-2xl font-bold'>About Us</h2>
        </div>
        <div className='flex px-4 pt-2 sm:px-20 gap-6 items-center justify-center'>
            <Image src={gloriouslogo} alt="Logo" className='w-24 sm:w-32 rounded-xl'/>
            <h1 className='text-3xl sm:text-6xl text-gradient font-serif'>Glorious Publications</h1>
        </div>
        <div className='p-2 sm:p-16'>
        <div className='border-4 border-amber-500 shadow-lg'>
            <p className='text-lg sm:text-2xl font-sans px-6 indent-24 pb-6 text-justify italic'><span className="text-2xl sm:text-4xl">G</span>lorious Publications, stands out as a distinctive publishing endeavor, entirely dedicated to curating literature and materials revolving around the Bahá’í Faith. Since its establishment, it has wholeheartedly embraced a mission aimed at fostering the proliferation of innovative concepts and fresh interpretations of Bahá’í Teachings. At its core, Glorious Publication endeavors to promote a diverse array of publications, including compilations of Bahá’í Writings on various subjects. These publications cater to a wide audience, ranging from enriching works tailored for Bahá’í gatherings to resources designed for personal deepening studies. Importantly, Glorious Publication operates with a non-profit ethos, striving to ensure affordability of its products for individuals with limited financial means, recognizing that the Words of God are meant for all.<br/>
            Authors and book writers who lack the means and resources to independently publish their works may choose to collaborate with Glorious Publications. Through this partnership, authors have the opportunity to sell their books and materials while benefiting from the support and resources provided by Glorious Publications. This collaboration enables aspiring writers to share their insights and perspectives with a wider audience, thereby contributing to the enrichment of Bahá’í literature and the dissemination of Bahá’í teachings.</p>
        </div>
        </div>
        <Footer/>
    </>
  )
}

export default page