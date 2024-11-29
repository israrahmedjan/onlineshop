import React from 'react'
import { Home,Search  } from 'lucide-react';
import Link from 'next/link';

function BreadCrumbs({category}) {
  return (
    <div>
       <div className='md:mx-12 border-gray-50 rounded-md px-2 mt-2 mb-2'>
      <div className='flex justify-between align items-center'>
      <div className='flex justify-start items-center'>
      <Home className="w-6 h-6 text-gray-600" />
      <Link href="/">Home/ {category}</Link>      </div>
        <div className='flex'>
        
      <input
        type="text"
        placeholder="Search items"
        className="outline-none w-full border-gray-200 border rounded-md px-2"
      />
      <Search className="text-gray-400 mr-2" /> {/* Search icon from Lucide */}
        </div>
      </div>
      </div>


    </div>
  )
}

export default BreadCrumbs