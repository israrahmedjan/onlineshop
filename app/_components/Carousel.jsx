import React, { useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


// import './styles.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import GlobalApi from '../_utils/GlobalApi';

export default function Carousel() {
  const [products,setproducts] = useState([]);
  const ProductByCategory = async ()=>
 {
 const data = await GlobalApi.getProductsByCategory("featured");
 //console.log("Slider Data", data)
 setproducts(data);
 }   
    // const products = useSelector((state) => state.product?.testitems);
   
   useEffect(()=>
 {
  
     ProductByCategory();
 
 },[])

  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  return (
    <>
    {products.length>0 && (
  

    <div className=''>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper"
      >

{products.map((item, index) => (
<SwiperSlide key={index} className='mt-2'>
<section
  className="relative bg-cover bg-center bg-no-repeat"
  style={{
    backgroundImage: `url(${GlobalApi.getStrapiMedia(item?.attributes?.mainImage, "large") || 'http://localhost:3000/assets/images/defaultImage.png'})`
  }}
>
  <div
    className="absolute inset-0 bg-white/75 sm:bg-transparent sm:from-white/95 sm:to-white/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"
  ></div>

  <div
    className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8"
  >
    <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
      <h1 className="text-3xl font-bold sm:text-5xl text-primary">
        Let us find your
        {/* {GlobalApi.getStrapiMedia(item?.attributes?.mainImage,"large")} */}

        <strong className="block font-bold text-secondary"> {item?.attributes?.name}. </strong>
      </h1>

      <p className="mt-4 max-w-lg sm:text-xl/relaxed text-primary">
      {item?.attributes?.description}
      </p>

      <div className="mt-8 flex flex-wrap gap-4 text-center">
        <a
          href="#"
          className="block w-full rounded bg-rose-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-primary focus:outline-none focus:ring active:bg-rose-500 sm:w-auto"
        >
          Get Started
        </a>

        <a
          href="#"
          className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-rose-600 shadow hover:text-primary focus:outline-none focus:ring active:text-rose-500 sm:w-auto"
        >
          Learn More
        </a>
      </div>
    </div>
  </div>
</section>
</SwiperSlide>
))}
        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
      </div>
    )}
    </>
  );
}
