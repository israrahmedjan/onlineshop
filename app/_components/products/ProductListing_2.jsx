
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import ProductCard from './ProductCard';
import GlobalApi from '@/app/_utils/GlobalApi';
import SwiperWithNav from '../SwiperWithNav';

function ProductListing_2() {
const [products,setproducts] = useState([]);
 const ProductByCategory = async ()=>
{
const data = await GlobalApi.getProductsByCategory("mobile-phones");

}   
   // const products = useSelector((state) => state.product?.testitems);
  
  useEffect(()=>
{
 
    ProductByCategory();

},[])


   // console.log("tete product",products)
  return (
    <>
    {/* <SwiperWithNav /> */}
   <div className='border-gray-100 border py-4'>
<div className='md:mx-12 border-gray-50 border rounded-md px-2'>
    <h1 className='text-[20px] text-primary py-4 font-semibold'>Mobile Phones</h1>
   
    {products.length > 0 ? (
         <div className='grid-cols-2 md:grid-cols-4 grid gap-4'>
        {products.map((item, index) => (
            <ProductCard key={index} item={item} />
        ))}

         </div>
     
    ):<div className='grid-cols-2 md:grid-cols-4 grid gap-4'>
        { [1, 2, 3, 4].map((item, index) => (
                <div
                  className="h-[220px] bg-slate-200 
            w-full rounded-lg animate-pulse"
                  key={index}
                ></div>
              ))}
    </div>
    }
   
</div>
</div>



    </>
  )
}

export default ProductListing_2