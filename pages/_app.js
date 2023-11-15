import { CartContextProvider } from "@/components/CartContext";
import { BackgroundColor } from "@/lib/colors";
import Head from "next/head";
import Link from "next/link";
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
        <Link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <GlobalStyles />

      <CartContextProvider>
        <Component {...pageProps} />
      </CartContextProvider>
    </>
  );
}
