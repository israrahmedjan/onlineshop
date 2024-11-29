'use client';

import React, { useEffect, useState } from 'react';
import { Check, X } from 'lucide-react';
import { useParams } from 'next/navigation';
import GlobalApi from '@/app/_utils/GlobalApi';

function Page() {
  const { session_id } = useParams(); // Get the session_id from the route
  const [transactionStatus, setTransactionStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [customerData,setcustomerData] = useState(null);

  useEffect(() => {
    const fetchTransactionStatus = async () => {
      try {
        setLoading(true);

        // Replace the URL with your actual backend API endpoint that verifies the session
        const response = await fetch(`/api/transaction-status?session_id=${session_id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch transaction status');
        }

        const data = await response.json();
       // console.log("Here data is");
        setcustomerData(data.data);
       const resp = await GlobalApi.sendEmail(data.data);
        setTransactionStatus(data.paymentCompleted); // e.g., 'completed' or 'failed'

       
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (session_id) {
      fetchTransactionStatus();
    }
  }, [session_id]);

  if (loading) return <><div className="px-20 text-[25px] flex flex-col items-center py-16">
  <div className="flex items-center space-x-2">
    {/* Spinner */}
    <div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
    {/* Loading Text */}
    <span>Loading transaction detail...</span>
  </div>
</div></>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="px-20 flex flex-col items-center py-16">
      {transactionStatus}
      {(transactionStatus)  ? (
        <>
          <div className="text-[#01a101] border-[#01a101]-200 border rounded-[100px]">
            <Check size={100} />
          </div>
          <div className="text-[30px] py-10">
            Transaction completed successfully!
          </div>
          <p className='text-[20px]'>I’ve sent an email with the details of your purchased items. Please check your inbox.</p>
        </>
      ) : (
        <>
          <div className="text-[#ff0000] border-[#ff0000]-200 border rounded-[100px]">
            <X size={100} />
          </div>
          <div className="text-[30px] py-10">
            Transaction failed or is pending.
          </div>
        </>
      )}
      <div className="text-[18px] py-4">
        <span className="font-semibold">Your transaction ID :</span> <i>{session_id}</i>
      </div>
    </div>
  );
}

export default Page;
