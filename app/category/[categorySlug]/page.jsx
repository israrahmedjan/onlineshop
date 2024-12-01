'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import ProductsByCategory from '@/app/_components/products/ProductsByCategory';
import { fethCategory, getCategoryBySlug} from '@/app/_components/firebase/helper';


function Page() {
  const { categorySlug } = useParams(); // Get the dynamic id from the route
  const [categoryId,setCategoryId] = useState();
  const getId = async ()=>
    {
     const catId = await getCategoryBySlug(categorySlug);
    //console.log("Id",catId);
    setCategoryId(catId);
     //.log(d);
    }

  useEffect(() => {
   getId();
   console.log("Use effect is called 123!",categorySlug);
    }, [categorySlug]);
    
  return (
    <>

{/* <BreadCrumbs /> */}

{categoryId && (
  <ProductsByCategory 
    categoryId={categoryId} 
    limit={10} 
    categoryname={categorySlug} 
  />
)}
    </>
  );
}

export default Page;
