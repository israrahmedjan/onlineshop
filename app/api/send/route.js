//import { EmailTemplate } from '../../../components/email-template';
// app/api/send/route.js
import KoalaWelcomeEmail from '../../../emails/my-email'
import { Resend } from 'resend';

export async function POST(req) {
  const resend = new Resend(process.env.RESEND_API_KEY);
   //const { amount_total, email, name,phone } = await req.json();
  
   //console.log("Send email is called",amount_total,email,name,phone);
    // return new Response(JSON.stringify({ message: 'Email data recieved successfully' }), {
    //   status: 200,
    //   headers: { 'Content-Type': 'application/json' },
    // });
  try {
   // const { to, subject, text } = await req.json();
   const body = await req.json();
   const { amount_total, email, name,phone } = body;

    const userFirstname = body.name;
    const subject = "Market Vibe Email";
    console.log(amount_total, email, name)

    const emailResponse = await resend.emails.send({
      from: 'onboarding@resend.dev', // Replace with a verified sender
      to:"ahmedjanworks@gmail.com",
      replyTo: 'onboarding@resend.dev',
      subject:subject,
      react: KoalaWelcomeEmail({ amount_total, email, name,phone }), // Use your template here
    });

    return new Response(JSON.stringify({ message: 'Email sent successfully', emailResponse }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error sending email:', error.name);
    return new Response(JSON.stringify({ message: 'Failed to send email', error }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// import EmailTemplate from '@/app/_components/email-template';

// const resend = new Resend(process.env.RESEND_API_KEY);

// export async function POST(req) {
//   const body = await req.json(); // Parse the request body
//   console.log("email sending is called!", body);
//   try {
//     const { data, error } = await resend.emails.send({
//       from: 'Acme <onboarding@resend.dev>',
//       to: ['israrahmedjan@gmail.com'],
//       subject: "Hello world",
//       react: <EmailTemplate firstName="John" />,
//     });

//     if (error) {
//       return Response.json({ error }, { status: 500 });
//     }

//     return Response.json({ data });
//   } catch (error) {
//     return Response.json({ error }, { status: 500 });
//   }
// }
