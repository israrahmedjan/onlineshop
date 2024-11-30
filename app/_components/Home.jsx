"use client"
import React, { useEffect, useState } from 'react'
import { getCategoryBySlug } from './firebase/helper'




function HomePage() {
  const [category,setCategory] = useState()
  useEffect(()=>
  {
    const fetchCat = async()=>
    {
      const data = await getCategoryBySlug('mobile-phones')
      setCategory(data);
      console.log("Category Data!",data);
    
    }
    fetchCat();
  })

  return (
    <>
     <h1>This is home page.{category}</h1> 
   {/* <Carousel /> slider added*/}
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