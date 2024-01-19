import styled from "styled-components";
import Center from "./Center";
import ProductsGrid from "./ProductsGrid";
import Title from "./Title";

export default function NewProducts({ products }) {
  return (
    <Center style={{ paddingTop: "20px" }}>
      <Title>Productos nuevos</Title>
      <ProductsGrid products={products} />
    </Center>
  );
}
