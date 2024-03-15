import { NotificationProvider } from "@/context/NotificationContext";
import { DataProvider } from "@/context/DataContext";
import GlobalStyle from "@/components/globalstyles";

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <NotificationProvider>
        <DataProvider>
          <Component {...pageProps} />
        </DataProvider>
      </NotificationProvider>
    </>
  );
}
