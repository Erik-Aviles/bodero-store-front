import { DataContext } from "@/context/DataContext";
import { useContext } from "react";
import useSWR from "swr";
import { Loading } from "@/components/Loading";
import CategoriesComponent from "@/components/CategoriesComponent";
import NewProducts from "@/components/NewProducts";
import Carousel from "@/components/Carousel";
import Brands from "@/components/Brands";
import { dataCarousel } from "@/resource/data";
import Testimonios from "@/components/Testimonios";
import Layout from "@/components/Layout";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function HomePage() {
  const { categories } = useContext(DataContext);

  const { data, error } = useSWR(`/api/new-products`, fetcher, {
    dedupingInterval: 2000,
  });

  if (error) return <div>Error al cargar los datos</div>;
  if (!data) return <Loading />;

  const newProducts = data?.newProducts;

  return (
    <Layout
      title="B.R.D | INICIO"
      description="Tienda de repuestos y accesorios originales de moto en Quevedo"
    >
      <CategoriesComponent categories={categories} />
      <Carousel data={dataCarousel} />
      <NewProducts products={newProducts} />
      <Brands />
      <Testimonios />
    </Layout>
  );
}
