'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

import { useDispatch,useSelector } from "react-redux";

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);
  const totalPrice = useSelector((state) => state.cart?.TotalPrice);
 console.log("Product in checkout page", totalPrice)

  const handleCheckout = async () => {
    setLoading(true);

    const res = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        total: totalPrice, // Pass your cart items or any other data
      }),

    });

    const { id } = await res.json();

    const stripe = await stripePromise;
    await stripe.redirectToCheckout({ sessionId: id });

    setLoading(false);
  };

  return (
    <div>
      {/* <h1>Checkout Page</h1> */}
      <button className='bg-primary px-5 py-2.5 text-sm font-medium border-primary border rounded-md text-white transition hover:text-teal-600/75 sm:block' onClick={handleCheckout} disabled={loading}>
        {loading ? 'Loading...' : 'Checkout'}
      </button>
    </div>
  );
}
