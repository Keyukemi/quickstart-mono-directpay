import React,{useContext} from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {Store} from "@/utils/Store";
import { BsCart4 } from 'react-icons/bs';


export default function Layout({title, children}) {
  const { state, dispatch } = useContext(Store);
  const {cart} = state;

  return (
    <>
        <Head>
            <title>{title ? title: "Mono DirectPay Quickstart App"}</title>
            <meta name='description' content='Created to showcase how to us the Mono DirectPay API'/>
            <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
        </Head>

        <div className='flex min-h-screen flex-col justify-between'>
        <header>
          <nav className='flex h-12 items-center px-4 justify-between shadow-md'>
            <Link href="/">
              <p className='text-lg font-bold'>KLOSET</p>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/login" className='p-1'>Login</Link>
              <Link href="/cart" className='flex items-center'>
                <BsCart4 size={24} /> 
                    <span className='ml-1'> Cart
                      {cart?.cartItems?.length > 0 && (
                        <span className='ml-1 rounded-full bg-red-500 px-2 py-1 text-white font-bold text-xs'>
                          {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                        </span>
                      )}
                    </span> 
              </Link>
            </div>
          </nav> 
        </header>

        <main className='container m-auto mt-4 px-4'>
            {children}
        </main>

        <footer className='flex justify-center items-center h-10 shadow-inner'>
          <p>Copyright ©️ 2023 Keyukemi Ubi for Mono Technologies LTD</p>
        </footer>
        </div>
    </>
  );
}

