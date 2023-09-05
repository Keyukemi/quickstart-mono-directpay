import Layout from "@/components/Layout";
import React from "react";
import Link from "next/link";
import {useForm} from 'react-hook-form'


export default function LoginScreen() {
    const{
        handleSubmit,
        register,
        formState: {errors},
    } = useForm();

    const submitHandler = ({email, password}) =>{
        console.log(email, password)
    }
    return( 
        <Layout title="Login">
            <form action="" className="mx-auto max-w-screen-md" onSubmit={handleSubmit(submitHandler)}>
                <h1 className="mb-4 text-xl">Login</h1>
                    <div className="mb-4">
                        <label htmlFor="email">Email</label>
                        <input type="email"
                        {...register('email', {required:'Please enter email address',
                            pattern:{
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                                message: 'Please enter a valid email address'

                            }
                        })} className="w-full" id="email" autofocus />
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
                                minLength: {value: 7, message: 'Password must be at least 8 characters'}
            
                            })} className="w-full" id="password" autofocus />
                        {
                            errors.password && (
                                <div className="text-red-500">
                                    {errors.password.message}
                                </div>
                            )
                        }
                        
                    </div>
                    <div className="mb-4">
                        <button className="primary-button">Login</button>
                    </div>
                    <div className="mb-4">
                        Don&apos;t have an account? <span className="font-bold text-paragraph">
                            <Link href="register">Register here</Link>
                        </span>
                    </div>

            </form>
        </Layout>
    )
}
