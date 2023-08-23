import React from 'react';
import Head from 'next/head'

export default function Layout({children}) {
  return (
    <>
        <Head>
            <title>Mono DirectPay Quickstart App</title>
            <meta name='description' content='Created to showcase how to us the Mono DirectPay API'/>
            <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
        </Head>
        <div>
        <header>

        </header>
        <main>
            {children}
        </main>
        <footer>

        </footer>
        </div>
    </>
  );
}

