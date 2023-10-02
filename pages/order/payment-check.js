// pages/order/payment-check.js
import { useRouter } from 'next/router';
import {toast} from 'react-toastify';
import axios from 'axios';
import { useEffect } from 'react';
import { getError } from "@/utils/error";
import LoadingSpinner from '@/components/LoadingSpinner';
import Layout from '@/components/Layout';

function PaymentCheckPage() {
  const router = useRouter();
  const { reference, status, orderId } = router.query;

  useEffect(() => {
    //uncomment this when redirect_url now returns reference and status
    
    // if (!reference || !status) {
    //   router.push('/');
    //   return;
    // }
    const verifyPayment = async () => {
      try {
        const response = await axios.post('/api/verifypayment', { orderId: orderId });
        if (response.data.paymentStatus === 'successful') {
          router.push(`/order/${response.data.orderId}`);
        } else {
          
          router.push(`/order/${response.data.orderId}`);
        }
      } catch (error) {
        toast.error(getError(error))
      }
    };

    verifyPayment();
  }, [orderId, reference, router, status]);

  return (
    <Layout>
        <div className='flex justify-center align-center text-2xl text-highlight'>
            Verifying Payment...
        </div>
        <LoadingSpinner/>
    </Layout>
 );
}

export default PaymentCheckPage;
