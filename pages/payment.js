import CheckoutWizard from "@/components/CheckoutWizard";
import Layout from "@/components/Layout";
import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { Store } from "@/utils/Store";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

export default function PaymentScreen() {
    const [selectedPaymentMethod, setSelectedPaymentMethod ]= useState('');
    const{state, dispatch} = useContext(Store);
    const {cart} = state;
    const {shippingAddress, paymentMethod}= cart;
     
    const router = useRouter();
    const submitHandler =(e)=>{
        e.preventDefault();
        if(!selectedPaymentMethod){
            return toast.error('Payment method is required')
        }
        dispatch({type: 'SAVE_PAYMENT_METHOD', payload: selectedPaymentMethod});
        Cookies.set(
            'cart', JSON.stringify({...cart, paymentMethod:selectedPaymentMethod})
        );
        router.push('/confirmorder');  
    };
    useEffect(() =>{
        if(!shippingAddress.address){
           return router.push('/shipping')
        }
        setSelectedPaymentMethod(paymentMethod || '')
    },[paymentMethod, router, shippingAddress.address])
    return(
        <Layout title="Payment Method">
            <CheckoutWizard activeStep={2}/>
            <form className="mx-auto max-w-screen-md" onSubmit={submitHandler}>
                <h1 className="mb-4 text-4xl text-center text-primary">Choose a Payment Method</h1>
                {
                    ['Pay with Mono', 'Cash On Delivery'].map((payment)=> (
                        <div key={payment} className="mb-4">
                            <input type="radio" name="paymentMethod" id={payment}
                            className="p-2 m-2 outline-none focus:ring-0"
                            checked={selectedPaymentMethod === payment}
                            onChange={()=> setSelectedPaymentMethod(payment)} />
                            <label htmlFor={payment}>
                                {payment}
                            </label>
                        </div>
                    ))}
                <div className="mb-4 flex justify-between">
                    <button className="secondary-button" type="button" onClick={()=> router.push('/shipping')}> Back </button>
                    <button className="primary-button">Next</button>
                </div>
            </form>
        </Layout>
    )
}

PaymentScreen.auth = true;