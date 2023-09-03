import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Layout({title, children}) {
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
              <div>
                <Link href="/cart" className='p-2'>Cart</Link>
                <Link href="/login" className='p-2'>Login</Link>
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

