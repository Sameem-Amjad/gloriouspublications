"use client"
import Link from 'next/link';
import gloriouslogo from '@/public/gloriouslogo.jpg';
import Image from 'next/image';
import Navlinks from './Navlinks';
import { FiPower} from "react-icons/fi";

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
        <div className="w-32 text-white md:w-44 ml-[10%] pb-2">
        <Image src={gloriouslogo} alt="Logo" className='rounded-md'/>
        </div>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <Navlinks/>
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <form>
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <FiPower className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
