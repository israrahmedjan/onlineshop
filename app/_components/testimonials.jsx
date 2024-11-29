
'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';

const Testimonials = () => {
  const testimonials = [
    {
      name: "John Doe",
      role: "CEO, Example Co.",
      image: process.env.NEXT_PUBLIC_DOMAIN+"assets/images/testimonials/1.jpg",
      quote: "This service has truly transformed our business. The team is amazing and always goes above and beyond!",
      rating: 5
    },
    {
      name: "Jane Smith",
      role: "Marketing Director, ABC Corp.",
      image: process.env.NEXT_PUBLIC_DOMAIN+"assets/images/testimonials/2.jpg",
      quote: "A fantastic experience from start to finish. I highly recommend their services!",
      rating: 4
    },
    {
      name: "Mark Johnson",
      role: "Product Manager, XYZ Inc.",
      image: process.env.NEXT_PUBLIC_DOMAIN+"assets/images/testimonials/3.jpg",
      quote: "Great quality and attention to detail. I was very impressed with the final results!",
      rating: 5
    },
    {
        name: "Miss, Amelia",
        role: "Product Manager, XYZ Inc.",
        image: process.env.NEXT_PUBLIC_DOMAIN+"assets/images/testimonials/4.jpg",
        quote: "Great quality and attention to detail. I was very impressed with the final results!",
        rating: 5
      }
  ];

  return (
   <>
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold text-center mb-8 text-primary">What Our Clients Say</h2>
        <Swiper
    spaceBetween={50}
    slidesPerView={3}
    navigation
    pagination={{ clickable: true }}
    modules={[Navigation, Pagination]}
  >
    {testimonials.map((testimonial,index)=>
    {
        return (
        <SwiperSlide key={index}>
             <div  className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="mb-4">
                <Image
                  className="rounded-full mx-auto"
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={80}
                  height={80}
                />
              </div>
              <blockquote className="text-primary text-[16px] italic mb-4">“{testimonial.quote}”</blockquote>
              <h3 className="text-[16px] font-bold">{testimonial.name}</h3>
              <p className="text-primary text-[16px]">{testimonial.role}</p>
              <div className="mt-4">
                <div className="flex justify-center">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674h4.905c.97 0 1.371 1.24.588 1.81l-3.975 2.89 1.518 4.673c.3.921-.755 1.688-1.539 1.11L10 13.347l-3.975 2.89c-.784.578-1.838-.189-1.539-1.11l1.518-4.674-3.975-2.89c-.784-.57-.382-1.81.588-1.81h4.905L9.049 2.927z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
               </SwiperSlide>)
       
    })}
   
       
        </Swiper>
      </div>
    </section>
    
    </>
  );
};

export default Testimonials;

