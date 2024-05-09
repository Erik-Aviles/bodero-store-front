import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";
import CategoriesComponent from "./CategoriesComponent";
import NavMovil from "./NavMovil";

export default function Layout({ children, title, description }) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <Header />
      <CategoriesComponent />
      <main>{children}</main>
      <Footer />
      <NavMovil />
    </div>
  );
}
