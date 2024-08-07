import React from 'react'
import { GrBook } from "react-icons/gr";
const page = () => {
  const value = 10;
  const title = 'Total Books';
  return (
    <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
      <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        <GrBook className="h-5 w-5 text-gray-700"/>
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p className='truncate rounded-xl bg-white px-4 py-8 text-center text-2xl'>
        {value}
      </p>
    </div>
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        <GrBook className="h-5 w-5 text-gray-700"/>
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p className='truncate rounded-xl bg-white px-4 py-8 text-center text-2xl'>
        {value}
      </p>
    </div>
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        <GrBook className="h-5 w-5 text-gray-700"/>
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p className='truncate rounded-xl bg-white px-4 py-8 text-center text-2xl'>
        {value}
      </p>
    </div>
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        <GrBook className="h-5 w-5 text-gray-700"/>
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p className='truncate rounded-xl bg-white px-4 py-8 text-center text-2xl'>
        {value}
      </p>
    </div>
    </div>
    
  )
}

export default page