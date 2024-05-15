import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";
import CategoriesComponent from "./categories/CategoriesComponent";
import NavMovil from "./NavMovil";
import DropdownCartComponents from "./cart/DropdownCartComponents";
import { useContext, useState } from "react";
import { CartContext } from "@/context/CartContext";

export default function Layout({ children, title, description }) {
  const { showCart } = useContext(CartContext);

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
      {showCart && <DropdownCartComponents />}
      <NavMovil />
    </div>
  );
}
