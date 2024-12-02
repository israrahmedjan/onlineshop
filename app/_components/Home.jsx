"use client"
import React, { useEffect } from 'react'
import ProductsByCategory from './products/ProductsByCategory'
import Counter from './Counter'



function HomePage() {
  

  return (
    <>
  <h1>Home Page..</h1>  
  <div><Counter /></div>  
   {/* <Carousel /> slider added*/}
  <ProductsByCategory categoryId={1} limit={4} categoryname="Electronics" />
  
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