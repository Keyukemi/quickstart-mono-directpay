import '@/styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import { StoreProvider } from '@/utils/Store';

function App({ Component, pageProps:{session, ...pageProps}}) {
  return (
    <SessionProvider session={session}>
      <StoreProvider>
        <Component {...pageProps} />
      </StoreProvider>
    </SessionProvider>
  )
}

export default App;