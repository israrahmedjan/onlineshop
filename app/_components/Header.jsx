'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { ShoppingCart, Mail, Phone, Twitter, Facebook, Instagram } from 'lucide-react';
import { useDispatch, useSelector } from "react-redux";

function HeaderPage() {
  // const totalItems = useSelector((state) => state.cart?.TotalNumItems);
  // const cartItemCount = totalItems;//5; // Example cart count


  // console.log("Products in header", cartItemCount);


  return (
    <header className="bg-white shadow-md">
      {/* Top Bar */}
      <div className="bg-primary text-white text-[14px] py-1 ">
        <div className="container  mx-auto px-2 flex justify-between items-center">
          {/* Left Side: Text */}
          <span>Welcome to Our Store! Get the best deals today.</span>

          {/* Right Side: Contact and Social Icons */}
          <div className="flex items-center space-x-4">
            {/* Email */}
            <div className="flex items-center space-x-1">
              <Mail size={16} />
              <span>email@example.com</span>
            </div>

            {/* Phone */}
            <div className="flex items-center space-x-1">
              <Phone size={16} />
              <span>+123 456 7890</span>
            </div>

            {/* Social Icons */}
            <div className="flex space-x-3">
              <a href="#" target="_blank" rel="noopener noreferrer">
                <Twitter size={16} className="hover:text-blue-400" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <Facebook size={16} className="hover:text-blue-600" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <Instagram size={16} className="hover:text-pink-500" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto flex h-22 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        {/* <Link href="/" className="block text-teal-600 mt-4">
    <Image src={process.env.NEXT_PUBLIC_DOMAIN+`assets/images/logo.png`} width={250} height={220} alt="" />
    </Link> */}
        <Link href="/" className="block text-teal-600 mt-4">
          <Image
            src={new URL('assets/images/logo.png', process.env.NEXT_PUBLIC_DOMAIN).toString()}
            width={250}
            height={220}
            alt="Logo"
          />
        </Link>




        <div className="flex flex-1 items-center justify-end md:justify-between mt-4">
          <nav aria-label="Global" className="hidden md:block">


            <ul className="flex items-center gap-6 text-[15px] font-semibold">
              <li>
                <Link href="/" className="text-primary transition hover:text-secondary"> Home </Link>
              </li>
              <li>
                <Link href="/about" className="text-primary transition hover:text-secondary"> About </Link>
              </li>

              <li>
                <Link
                  className="text-primary transition hover:text-secondary"
                  href={new URL(`category/electronics`, process.env.NEXT_PUBLIC_DOMAIN).toString()}
                >
                  Electronics
                </Link>
              </li>



              <li>
                <Link
                  className="text-primary transition hover:text-secondary"
                  href={new URL(`category/home-appliances`, process.env.NEXT_PUBLIC_DOMAIN).toString()}
                >
                  Home Applicances
                </Link>
              </li>


              <li>
                <Link
                  className="text-primary transition hover:text-secondary"
                  href={new URL(`category/mobile-phones`, process.env.NEXT_PUBLIC_DOMAIN).toString()}
                >
                  Mobile Phones
                </Link>
              </li>




              <li>
                <a className="text-primary transition hover:text-secondary" href="#"> Contact Us </a>
              </li>
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <div className="sm:flex sm:gap-4">
              <a
                className="block rounded-md bg-secondary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
                href="#"
              >
                Login
              </a>

              <a
                className="hidden rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:text-teal-600/75 sm:block"
                href="#"
              >
                Register
              </a>
              <Link href={process.env.NEXT_PUBLIC_DOMAIN + `/cartdetail`} className='relative text-primary font-bold'>
                <ShoppingCart size={36} />
                {/* Cart count badge */}
                {/* {cartItemCount > 0 && (
        <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {cartItemCount}
        </span>
      )} */}
              </Link>
            </div>

            <button
              className="block rounded bg-primary-100 p-2.5 text-primary-600 transition hover:text-primary-600/75 md:hidden"
            >
              <span className="sr-only">Toggle menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default HeaderPage