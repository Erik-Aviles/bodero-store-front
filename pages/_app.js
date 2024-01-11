import { CartContextProvider } from "@/components/CartContext";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { DataProvider } from "@/context/DataContext";
import { NotificationProvider } from "@/context/NotificationContext";
import { BackgroundColor } from "@/lib/colors";
import Head from "next/head";
import { createGlobalStyle } from "styled-components";

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
