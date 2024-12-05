import Head from 'next/head'
import GlobalStyle from '@/components/globalstyles'
import { NotificationProvider } from '@/context/NotificationContext'
import { CartContextProvider } from '@/context/CartContext'
import { ActionsProvider } from '@/context/actionsProvider'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* Metaetiqueta viewport */}
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, maximum-scale=1'
        />
      </Head>
      <GlobalStyle />
      <NotificationProvider>
        <ActionsProvider>
          <CartContextProvider>
            <Component {...pageProps} />
          </CartContextProvider>
        </ActionsProvider>
      </NotificationProvider>
    </>
  )
}
