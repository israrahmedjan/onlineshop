'use client'
import React, { useEffect, useState } from 'react'
import { fetchProductFirst, fetchProductNext, fetchProductPrev } from '../firebase/helper';
// import ProductCard from './ProductCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Loader from '../Loader';
import ProductCard from './ProductCard';
import { useSelector, useDispatch } from 'react-redux';

function ProductsByCategory({ categoryId, limit,categoryname }) {
    const [productData, setProductData] = useState(null);
    const [loading, setloading] = useState(false);
    const [hasNext, sethasNext] = useState(false);
    const [hasPrev, sethasPrev] = useState(false);
    const [prodSort, setprodSort] = useState({ name: "name", direction: "asc" });

    // Data set ..

  ///console.log("Data Products..",products);

    useEffect(() => {
      
        const fetchProducts = async () => {
            try {
                console.log("Product by 99999",categoryId)
                setloading(true);
                let data = await fetchProductFirst(categoryId,limit, prodSort); // Wait for the promise to resolve
                // console.log("Product data:", data);
                setProductData(data); // Set resolved data to state
            } catch (error) {
                console.error("Error fetching products:", error);
            }
            finally {
                setloading(false);
            }
        };

        fetchProducts(); // Call the async function
        console.log("Use effect is called!");
    }, [prodSort]);
    // useEffect(() => {
    //    // console.log('product sort changed!', prodSort);
    // }, [prodSort])

    const NextPage = async () => {
        try {
            setloading(true);
            let data = await fetchProductNext(categoryId,limit, prodSort);
            if (data.length === 0) {
                sethasNext(true); // No more products, disable the button
                // console.log("Has products is set!");
            } else {
                setProductData(data);
                sethasNext(false); // Products are available
                sethasPrev(false); // Products are available
            }

        }
        catch (err) {
            console.log("error");

        }
        finally {
            setloading(false);
        }

    }
    const PrevPage = async () => {
        try {
            setloading(true);
            let data = await fetchProductPrev(categoryId,limit, prodSort);
            if (data.length === 0) {
                sethasPrev(true); // No more products, disable the button
                // console.log("Has products is set!");
            } else {
                setProductData(data);
                setloading(false);
                sethasNext(false)
                sethasPrev(false); // Products are available
            }
        }
        catch (err) {

        }
        finally {
            setloading(false);
        }

    }

    const SortHandle = (e) => {

        let sortval = e.target.value //{ name:"price",direction:"desc"}
        if (sortval == 1) {
            setprodSort({ name: "name", direction: "asc" })
        }
        else if (sortval == 2) {
            setprodSort({ name: "name", direction: "desc" })
        }
        else if (sortval == 3) {
            setprodSort({ name: "price", direction: "asc" })
        }
        else if (sortval == 4) {
            setprodSort({ name: "price", direction: "desc" })
        }

        //if()
    }
    return (
        <>
            <div className='border-gray-100 border py-4'>
                {/* <p>{JSON.stringify(plusstr)}</p> */}


<div>Add Items...</div>

                <div className='md:mx-12 border-gray-50 border rounded-md px-2'>
                    {/* Sort Items  */}
                    <div className="flex justify-between items-center space-x-4">
                        <h1 className="text-[20px] text-primary py-4 font-semibold uppercase">{categoryname}</h1>
                        <div className="relative">

                            <label className="text-[16px] font-semibold mr-2" onChange={() => console.log("Click!")}>Sort By:</label>

                            <select className="border border-gray-300 rounded-md p-1 focus:outline-none" onChange={(e) => SortHandle(e)}>
                                <option>Select</option>
                                <option value={1}>Name Ascending</option>
                                <option value={2}>Name Descending</option>
                                <option value={3}>Price Ascending</option>
                                <option value={4}>Name Descending</option>
                            </select>
                        </div>
                    </div>
                    {/* Sort Items End */}

                    {loading ? (
                <div><Loader /></div>
            ) : (
                productData &&
                <div className='grid-cols-2 md:grid-cols-4 grid gap-4'>
                    {productData.map((item, index) => (
                     <div key={index}>
                         <ProductCard item={item} />
                         <h1 onClick={()=>dispatch(AddItems(item))}>Add Items</h1>
                         </div>
                    ))}

                </div>
            )}
    <div className='flex justify-end gap-3 mt-3'>
            
                <ChevronLeft size={32} color="#e11d48" strokeWidth={2} className={`${hasPrev ? 'cursor-not-allowed disabled:' : 'cursor-pointer'}`}
                    onClick={() => PrevPage()}
                    disabled={hasPrev} />
                   
                <ChevronRight size={32} color="#e11d48" value strokeWidth={2} className={`${hasNext ? 'cursor-not-allowed disabled:' : ' cursor-pointer'}`}
                    onClick={() => NextPage()}
                    disabled={hasNext} />

                </div>  

                </div>
             
            </div>

         


        </>
    )
}

export default ProductsByCategory