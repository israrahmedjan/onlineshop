
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import ProductCard from './ProductCard';
import GlobalApi from '@/app/_utils/GlobalApi';

import Pagination from './pagination';

function ProductListing({category,limit,pagingshow}) {


const [products,setproducts] = useState([]);
const [paginationData, setPaginationData] = useState();
const [page,setpage] = useState(1);
const [sortOption, setSortOption] = useState('name:asc'); // Default value

// Get product by api calls
const ProductByCategory = async (category,sortOption,limit,page)=>
{
const data = await GlobalApi.getProductsByCategory(category,sortOption,limit,page);
setproducts(data.data);
//console.log("Pagination links", data.meta.pagination)
setPaginationData(data.meta.pagination);
} 
// Get product by api calls 

useEffect(()=>
  {
      ProductByCategory(category,sortOption,4,page);
      console.log("Changed! sort items!",page)
      setSortOption(sortOption)
  
  },[sortOption,page])



const handleSortChange =()=>
{
  setSortOption(event.target.value);
}


// useEffect(()=>
//   {
//       ProductByCategory(category,sortOption,limit,page);
//       console.log("Page Changed!",page)
//     //  setSortOption(sortOption)
  
//   },[page])


const pageNumberHandle = (pageNum)=>
{
  console.log("Test Page!", pageNum);
  setpage(pageNum)
}
  return (
    <>
    {/* <SwiperWithNav /> */}
   <div className='border-gray-100 border py-4'>
    {/* <p>{JSON.stringify(plusstr)}</p> */}




<div className='md:mx-12 border-gray-50 border rounded-md px-2'>
  


<div className="flex justify-between items-center space-x-4">
    <h1 className="text-[20px] text-primary py-4 font-semibold uppercase">{category}</h1>
    <div className="relative">

        <label className="text-[16px] font-semibold mr-2" onChange={()=>console.log("Click!")}>Sort By:</label>
        <select
                    value={sortOption}
                    onClick={() => console.log("Click!")} // Log on each click
                    onChange={handleSortChange} // Update on each change
                    className="border border-gray-300 rounded-md p-1 focus:outline-none"
                >
              <option value="name:asc">Title - Ascending</option>
              <option value="name:desc">Title - Descending</option>
              <option value="price:asc">Price - Ascending</option>
              <option value="price:desc">Price - Descending</option>
           
        </select>
    </div>
</div>    
{products.length > 0 ? (
  <>
         <div className='grid-cols-2 md:grid-cols-4 grid gap-4'>
        {products.map((item, index) => (
            <ProductCard key={index} item={item} />
        ))}

         </div>
           
    {(products.length > 0) && (pagingshow == true) && (
  <>
    <Pagination paginationData={paginationData} pageNumberHandle={pageNumberHandle} pagingshow={true} />
  </>
)}
         </>
 
     
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

export default ProductListing