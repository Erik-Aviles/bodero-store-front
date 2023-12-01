import { CartContextProvider } from "@/components/CartContext";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { NotificationProvider } from "@/context/NotificationContext";
import { BackgroundColor } from "@/lib/colors";
import Head from "next/head";
import { createGlobalStyle } from "styled-components";

/* @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');*/

const GlobalStyles = createGlobalStyle` 
  body{
    background-color: ${BackgroundColor};
    padding:0;
    margin:0;
    outline: none;
    font-family: 'Poppins', sans-serif;
    }
  `;

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" />
        <link rel="icon" href="/icons/favicon.ico" type="image/x-icon" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/icons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/icons/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <NotificationProvider>
        <CartContextProvider>
          <GlobalStyles />
          <Header />
          <Component {...pageProps} />
        </CartContextProvider>
      </NotificationProvider>
    </>
  );
}
