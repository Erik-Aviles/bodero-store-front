import { CartContextProvider } from "@/components/CartContext";
import { NotificationProvider } from "@/context/NotificationContext";
import { createGlobalStyle } from "styled-components";
import { DataProvider } from "@/context/DataContext";
import { BackgroundColor } from "@/lib/colors";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Head from "next/head";

const GlobalStyles = createGlobalStyle` 
  html,body{
    background-color: ${BackgroundColor};
    padding:0;
    margin:0;
    outline: none;
    font-family: 'Poppins', sans-serif;
  }
  a {
    color: inherit;
    text-decoration: none;
  }

  * {
      box-sizing: border-box;
  }

  ul,
  li {
    list-style: none;
    white-space: nowrap;
    padding: 0;
  }

  li {
    display: inline;
  }

  img{
      object-fit: cover;
    }
   
  `;

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="Tienda de repuestos y accesorios originales de las marcas más prestigiosas "
        />
      </Head>

      <NotificationProvider>
        <DataProvider>
          <CartContextProvider>
            <GlobalStyles />
            <Header />
            <Component {...pageProps} />
            <Footer />
          </CartContextProvider>
        </DataProvider>
      </NotificationProvider>
    </>
  );
}
