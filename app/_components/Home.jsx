"use client"
import React, { useEffect } from 'react'
import CheckoutPage from './checkout'
import Counter from './counter'
import MiniCart from './MiniCart'
import ProductListing from './products/ProductListing'
import Carousel from './Carousel'
import Testimonials from './testimonials'
import ProductListing_2 from './products/ProductListing_2'
import ProductsByCategory from './products/ProductsByCategory'



function HomePage() {
  

  return (
    <>
      
   {/* <Carousel /> */}
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