import React,{useContext, useEffect, useState} from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import Head from 'next/head';
import Link from 'next/link';
import {Store} from "@/utils/Store";
import { BsCart4 } from 'react-icons/bs';
import { useSession } from 'next-auth/react';
import { FaRegUserCircle } from 'react-icons/fa';


export default function Layout({title, children}) {
  const {status, data:  session} = useSession();

  const { state } = useContext(Store);
  const {cart} = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);
  useEffect(()=>{
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0))
  }, [cart.cartItems])

  return (
    <>
        <Head>
            <title>{title ? title: "Mono DirectPay Quickstart App"}</title>
            <meta name='description' content='Created to showcase how to us the Mono DirectPay API'/>
            <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
        </Head>

        <ToastContainer position='bottom-center' limit={1} />
        <div className='flex min-h-screen flex-col justify-between'>
        <header>
          <nav className='flex h-12 items-center px-4 justify-between shadow-md'>
            <Link href="/">
              <p className='text-lg font-bold'>KLOSET</p>
            </Link>
            
            <div className="flex items-center space-x-4">
            {status === 'loading' ? (
                'Loading'
              ) : session?.user ? (
                <>
                  <span className="flex">
                    <FaRegUserCircle size={24} className='mr-1 text-paragraph'/>
                    {session.user.name}
                  </span>
                </>
              ) : (
                <Link href="/login" className='p-1'>Login</Link>
            )}
            <Link href="/cart" className='flex items-center'>
                <BsCart4 size={24} /> 
                    <span className='ml-1'> Cart
                      {cartItemsCount > 0 && (
                        <span className='ml-1 rounded-full bg-red-500 px-2 py-1 text-white font-bold text-xs'>
                          {cartItemsCount}
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

