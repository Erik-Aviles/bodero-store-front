import { CartContextProvider } from "@/components/CartContext";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { BackgroundColor } from "@/lib/colors";
import Head from "next/head";
import { createGlobalStyle } from "styled-components";

/* @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');*/

const GlobalStyles = createGlobalStyle` 
  body{
    background-color: ${BackgroundColor};
    padding:0;
    margin:0;
    font-family: 'Poppins', sans-serif;
    }
  `;

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <CartContextProvider>
        <GlobalStyles />
        <Header />
        <Component {...pageProps} />
        <Footer />
      </CartContextProvider>
    </>
  );
}
