import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const body = await req.json(); // Extract the JSON body from the request
    const { total } = body; // Destructure 'total' from the request body
    
    console.log("Total Amount", total);
    
    // Create a checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Total Amount',
            },
            unit_amount: total * 100, // Stripe expects amount in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_DOMAIN}/success/{CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN}/cancel`,
    });

    // Logging the session object for debugging
    //console.log("Session Object:", session);

    // Simple status check function to see if the payment is completed
    const checkPaymentStatus = async (sessionId) => {
      const paymentSession = await stripe.checkout.sessions.retrieve(sessionId);
      return paymentSession.payment_status === 'paid';
    };

    // Check if the payment is completed
    const isPaymentCompleted = await checkPaymentStatus(session.id);

    if (isPaymentCompleted) {
      console.log("Payment is completed for session:", session.id);
      // Here you could send a confirmation email or perform any other action
      // e.g., sendMailToUser(session.customer_email); // Placeholder for sending email
    } else {
      //console.log("Payment is not completed yet for session:", session.id);
    }

    // Return the session ID in the response
    return NextResponse.json({ id: session.id, session });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
