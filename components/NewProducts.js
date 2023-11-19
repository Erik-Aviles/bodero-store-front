import styled from "styled-components";
import Center from "./Center";
import ProductsGrid from "./ProductsGrid";
import Title from "./Title";

export default function NewProducts({ products }) {
  return (
    <Center>
      <Title>Novedades</Title>
      <ProductsGrid products={products} />
    </Center>
  );
}
