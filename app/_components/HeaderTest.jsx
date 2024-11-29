'use client'
import Link from "next/link";
import { useState } from "react";
import { LucideShoppingCart, LucideUser } from "lucide-react";

export default function HeaderTest() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search query:", searchQuery);
    // Implement your search logic here
  };

  return (
    <header className="bg-gray-100 shadow-sm">
      {/* Top Bar */}
      <div className="bg-primary py-2 text-white text-sm">
        <div className="container mx-auto flex justify-between items-center px-4">
          <span>Free Shipping on Orders Over $50!</span>
          <div className="flex gap-4">
            <Link href="/contact" className="hover:underline">
              Contact Us
            </Link>
            <Link href="/about" className="hover:underline">
              About Us
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-primary">
          Smart Shop
        </Link>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex items-center w-1/2">
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-grow py-2 px-4 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded-r-lg hover:bg-primary-dark transition"
          >
            Search
          </button>
        </form>

        {/* User and Cart */}
        <div className="flex items-center gap-6">
          <Link href="/login" className="flex items-center gap-2 hover:text-primary">
            <LucideUser className="w-5 h-5" />
            <span>Login</span>
          </Link>
          <Link href="/cart" className="relative flex items-center gap-2 hover:text-primary">
            <LucideShoppingCart className="w-5 h-5" />
            <span>Cart</span>
            {/* Cart Badge */}
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
              3
            </span>
          </Link>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="bg-gray-200">
        <div className="container mx-auto px-4 py-2 flex justify-center gap-8">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <Link href="/products" className="hover:text-primary">
            Products
          </Link>
          <Link href="/offers" className="hover:text-primary">
            Offers
          </Link>
          <Link href="/contact" className="hover:text-primary">
            Contact
          </Link>
        </div>
      </nav>
    </header>
  );
}
