import Image from 'next/image';
import React from 'react'

function itemDetail({item}) {
    console.log("item:", item);
  return (
    <div> 
        {item && (
        <div className="flex flex-col lg:flex-row items-center gap-12">
      {/* item Image */}
      <div className="w-full lg:w-1/2">
        <Image
          src={item.mainImage}
          alt={item.name}
          width={500}
          height={600}
          className="w-full h-auto object-cover rounded-lg shadow-md"
        />
      </div>

      {/* item Details */}
      <div className="w-full lg:w-1/2">
        <h1 className="text-4xl font-bold text-gray-800">{item.name}</h1>
        <p className="mt-4 text-gray-600">{item.description}</p>

        <div className="mt-6 flex items-center justify-between">
        {/* <MiniCart className="" item={item} /> */}
          <span className="text-2xl font-semibold text-gray-900">
            ${item.price}
          </span>
         
        </div>

        {/* Add to Cart Button */}
        {/* <button
          onClick={() => alert('Added to Cart!')}
          className="mt-6 inline-block bg-blue-600 text-white font-semibold py-3 px-6 rounded-md hover:bg-blue-700 transition-all duration-300"
        >
          Add to Cart
        </button> */}


        {/* Back Button */}
        <button
          onClick={() => console.log("clicked")}
          className="mt-4 text-blue-600 hover:underline"
        >
          Go Back
        </button>
      </div>
    </div>    
        )}  
  </div>
  )
}

export default itemDetail