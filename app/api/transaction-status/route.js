// import GlobalApi from '@/app/_utils/GlobalApi';
// import { NextResponse } from 'next/server';
// import { Resend } from 'resend';
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
// const resend = new Resend(process.env.RESEND_API_KEY);


// export async function GET(req) {
//   const { searchParams } = new URL(req.url);
//   const sessionId = searchParams.get('session_id');

//   try {
//     const session = await stripe.checkout.sessions.retrieve(sessionId);
//     const isPaymentCompleted = session.payment_status === 'paid';

//     const customInfo = {
//       amount_total: session.amount_total / 100,  // Adjust amount to proper decimal
//       email: session.customer_details.email,
//       name: session.customer_details.name,
//       phone: session.customer_details.phone,
//     };

    
//     return NextResponse.json({ paymentCompleted: isPaymentCompleted,data:customInfo });
//   } catch (error) {
//     console.error('Error:', error.message);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }
