import Layout from "@/components/Layout";
import React, { useContext, useEffect } from "react";
import {useForm} from 'react-hook-form';
import CheckoutWizard from "@/components/CheckoutWizard";
import { Store } from "@/utils/Store";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

export default function ShippingScreen() {
    const router = useRouter();
    const{
        handleSubmit,
        register,
        formState: {errors},
        setValue,
    }= useForm();

    const {state, dispatch} = useContext(Store)
    const {cart} = state;
    const {shippingAddress} = cart;

    useEffect(()=>{
        if (shippingAddress){
            setValue('fullName', shippingAddress.fullName || '');
            setValue('phoneNumber', shippingAddress.phoneNumber || '');
            setValue('address', shippingAddress.address || '');
            setValue('city', shippingAddress.city || '');
            setValue('country', shippingAddress.country || '');
        }
    },[setValue, shippingAddress])

    const submitHandler = ({fullName, address, phoneNumber, city, country}) =>{
        dispatch({
            type:'SAVE_SHIPPING_ADDRESS',
            payload:{fullName, address, phoneNumber, city, country}
        });
        Cookies.set('cart', JSON.stringify({...cart, shippingAddress:{fullName, address, phoneNumber, city, country}}));
        router.push('/payment')
    }
    return(
        <Layout title="Shipping Address">
             <CheckoutWizard activeStep={1}/>
             <form className="mx-auto max-w-screen-md" onSubmit={handleSubmit(submitHandler)}>
                <h1 className="mb-4 text-4xl text-center text-primary">Shipping Address</h1>
                <div className="mb-4">
                    <label htmlFor="fullName">Full Name</label>
                    <input type="text"  id="fullName" className="w-full border-highlight" autoFocus placeholder="Jane Doe"
                        {...register ('fullName', {
                            required: 'Please enter full name',
                        })}
                    />
                    {
                        errors.fullName && (
                            <div className="text-red-500">
                                {errors.fullName.message}
                            </div>
                        )
                    }
                </div>
                <div className="mb-4">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input type="text"  id="phoneNumber" className="w-full border-highlight" autoFocus placeholder="+234 705 111 2222"
                        {...register ('phoneNumber', {
                            required: 'Please enter full name',
                        })}
                    />
                    {
                        errors.phoneNumber && (
                            <div className="text-red-500">
                                {errors.phoneNumber.message}
                            </div>
                        )
                    }
                </div>
                <div className="mb-4">
                    <label htmlFor="address">Address</label>
                    <input type="text"  id="address" className="w-full border-highlight" autoFocus 
                        placeholder="Plot 120 Herbert Macaulay Street"
                        {...register ('address', {
                            required: 'Please enter your full address',
                            minLength:{value:3, message:"address should be more 10 characters"},
                        })}
                    />
                    {
                        errors.address && (
                            <div className="text-red-500">
                                {errors.address.message}
                            </div>
                        )
                    }
                </div>
                <div className="mb-4">
                    <label htmlFor="city">City</label>
                    <input type="text"  id="city" className="w-full border-highlight" autoFocus placeholder="Lagos"
                        {...register ('city', {
                            required: 'Please enter city',
                        })}
                    />
                    {
                        errors.city && (
                            <div className="text-red-500">
                                {errors.city.message}
                            </div>
                        )
                    }
                </div>
                <div className="mb-4">
                    <label htmlFor="country">Country</label>
                    <input type="text"  id="country" className="w-full border-highlight" autoFocus placeholder="Nigeria"
                        {...register ('country', {
                            required: 'Please enter full name',
                        })}
                    />
                    {
                        errors.country && (
                            <div className="text-red-500">
                                {errors.country.message}
                            </div>
                        )
                    }
                </div>
                <div className="mb-4 flex justify-between">
                    <button className="secondary-button" type="button" onClick={()=> router.push('/cart')}> Back </button>
                    <button className="primary-button">Next</button>
                </div>
             </form>
        </Layout>
    )
    
}

ShippingScreen.auth = true;