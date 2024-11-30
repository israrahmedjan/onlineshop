"use client"
import React, { useEffect } from 'react'

import ProductsByCategory from './products/products/ProductsByCategory'


function HomePage() {
  

  return (
    <>
      
   {/* <Carousel /> slider added*/}
   <ProductsByCategory categoryId={1} limit={4} categoryname="Electronics" />
   <ProductsByCategory categoryId={4} limit={4} categoryname="Mobile Phones" />
  {/* <ProductListing category="electronics" limit={4} pagingshow={true} />
  <ProductListing category="home-appliances" limit={4} pagingshow={true} /> */}
  {/* <ProductListing_2 /> */}
  {/* <Testimonials /> */}

{/* 
    <MiniCart /> */}
{/* <Counter /> */}

    {/* the checkout page is used for payment in features */}
    {/* <CheckoutPage /> */}
    </>
  )
}

export default HomePage