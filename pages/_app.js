import { NotificationProvider } from "@/context/NotificationContext";
import { DataProvider } from "@/context/DataContext";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import GlobalStyle from "@/components/globalstyles";

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <NotificationProvider>
        <DataProvider>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </DataProvider>
      </NotificationProvider>
    </>
  );
}
