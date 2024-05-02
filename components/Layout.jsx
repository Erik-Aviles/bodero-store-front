import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";
import CategoriesComponent from "./CategoriesComponent";
import { useState } from "react";

export default function Layout({ children, title, description }) {
  const [category, setCategory] = useState("all");
  const datos = { category, setCategory };
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <Header />
      <CategoriesComponent datos={datos} />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
