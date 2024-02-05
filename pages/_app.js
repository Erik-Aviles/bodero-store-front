import { CartContextProvider } from "@/components/CartContext";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { DataProvider } from "@/context/DataContext";
import { NotificationProvider } from "@/context/NotificationContext";
import { BackgroundColor } from "@/lib/colors";
import Head from "next/head";
import { createGlobalStyle } from "styled-components";

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
    padding: 0
  }

  li {
    display: inline;
  }

  img{
      object-fit: cover;
      object-position: 0 30%;
    }
   
   
  `;

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <NotificationProvider>
        <DataProvider>
          <CartContextProvider>
            <GlobalStyles />
            <Header />
            <Component {...pageProps} />
            <Footer />
          </CartContextProvider>{" "}
        </DataProvider>
      </NotificationProvider>
    </>
  );
}
