import Layout from "@/components/Layout";
import React, { useEffect } from "react";
import {signIn, useSession} from 'next-auth/react'
import Link from "next/link";
import {useForm} from 'react-hook-form';
import { getError } from "@/utils/error";
import {toast} from 'react-toastify';
import { useRouter } from "next/router";
import axios from "axios";


export default function LoginScreen() {
    const {data: session} = useSession();
    const router = useRouter();
    const {redirect} = router.query;

    useEffect(()=>{
        if(session?.user){
            router.push(redirect || '/')
        }
    }, [router, session, redirect]);

    const{
        handleSubmit,
        register,
        formState: {errors},
    } = useForm();

    const submitHandler = async ({name, email, password}) =>{
        try {
            await axios.post('/api/auth/signup',{
                name, email, password
            })
            const result = await signIn('credentials',{
                redirect: false,
                email,
                password
            });
            if(result.error){
                toast.error(result.error)
            }
        } catch (err) {
            toast.error(getError(err))
        }
    }
    return( 
        <Layout title="Register">
            <form action="" className="mx-auto max-w-screen-md" onSubmit={handleSubmit(submitHandler)}>
                <h1 className="mb-4 text-xl text-center text-primary">Create an Account </h1>

                <div className="mb-4">
                        <label htmlFor="name">Username</label>
                        <input type="text"
                        {...register('name', {required:'Please enter name'})} className="w-full" id="name" autoFocus />
                        {
                            errors.name && (
                                <div className="text-red-500">
                                    {errors.email.name}
                                </div>
                            )
                        }
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email">Email</label>
                        <input type="email"
                        {...register('email', {required:'Please enter email address',
                            pattern:{
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                                message: 'Please enter a valid email address'

                            }
                        })} className="w-full" id="email" autoFocus />
                        {
                            errors.email && (
                                <div className="text-red-500">
                                    {errors.email.message}
                                </div>
                            )
                        }
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password">Password</label>
                        <input type="password" 
                            {...register('password', {
                                required:'Please enter valid password',
                                minLength: {value: 4, message: 'Password must be at least 6 characters'}
            
                            })} className="w-full" id="password" autoFocus />
                        {
                            errors.password && (
                                <div className="text-red-500">
                                    {errors.password.message}
                                </div>
                            )
                        }
                        
                    </div>
                    <div className="mb-4">
                        <button className="primary-button">Register</button>
                    </div>
                    <div className="mb-4">
                        Already have an account? <span className="font-bold text-highlight">
                            <Link href={`/login?redirect=${redirect || '/'}`} >Login here</Link>
                        </span>
                    </div>

            </form>
        </Layout>
    )
}
