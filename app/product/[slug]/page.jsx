'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import GlobalApi from '@/app/_utils/GlobalApi';
import ProductDetail from '@/app/_components/products/productDetail';
import ProductCard from '../../_components/products/ProductCard'
import { fetchRelatedProducts, getCategoryBySlug, getProductBySlug } from '@/app/_components/firebase/helper';


function Page() {
  const { slug } = useParams(); // Get the dynamic id from the route
  const [product, setProduct] = useState(null); // Initialize with null
  const [Relproduct, setRelProduct] = useState([]);
  const [category,setcategory] = useState();
  const [categoryslug,setcategoryslug] = useState();
  const [categoryId,setcategoryId] = useState(null);

  const fetchProduct = async (slug) => {
    try {
      
      const result = await getProductBySlug(slug); // Await the API call
     // console.log("Categoryu id:",result.category.id); 
     // console.log("Result:", result[0]);
      setProduct(result); // Set the product data to the state
      setcategory(result.category.title);
      setcategoryslug(result.category.slug);
      setcategoryId(result?.category?.id);
     
       
    
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  useEffect(()=>{
   // console.log("Slug test",slug)
    if(slug)
    {
      fetchProduct(slug);
     
      
    }
  },[slug])


  const fetchRelProducts =  async (categoryId)=>{
    console.log("fetch related function is called!",categoryId);

    const data = await fetchRelatedProducts(categoryId);
  
  setRelProduct(data);

  }
useEffect(()=>{
 console.log("Use effect is called ", categoryId)
 if(categoryId){
  fetchRelProducts(categoryId);
}
},[categoryId])
  return (
    <>
    <div className="mx-14 px-4 py-12">
      {/* {Relproduct && (<h1>Releted products {Relproduct.length}:{JSON.stringify(Relproduct,null,2)}</h1>)} */}
      
      {product ? <ProductDetail item={product} /> : <p>Loading...</p>} {/* Show loading or the product detail */}
    </div>

    {/* Related Products  */}
    <div>Category ID-- {JSON.stringify(categoryId,null,2)}</div>
    <div>{Relproduct.length}</div>
    <div className='border-gray-100 border py-4'>
<div className='md:mx-12 border-gray-50 border rounded-md px-2'>
    <h1 className='text-[20px] text-primary py-4 font-semibold'>Releted Products : {product?.category?.title}</h1>
   {Relproduct?"done":"loading.."}
    {(categoryId) && (
         <div className='grid-cols-2 md:grid-cols-4 grid gap-4'>
          {Relproduct.map((item, index) => (
            <div>
            <ProductCard key={index} item={item} />
          </div>
           ) )}

         </div>
     
    ) }
   
</div>
</div>

    </>
  );
}

export default Page;
