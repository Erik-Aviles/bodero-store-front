import GlobalStyle from "@/components/globalstyles";
import { NotificationProvider } from "@/context/NotificationContext";
import { CartContextProvider } from "@/context/CartContext";

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <NotificationProvider>
        <CartContextProvider>
          <Component {...pageProps} />
        </CartContextProvider>
      </NotificationProvider>
    </>
  );
}
