import Center from "./Center";
import ProductsGrid from "./ProductsGrid";
import Title from "./Title";

export default function AllProducts({ products }) {
  return (
    <Center>
      <Title>Productos</Title>
      <ProductsGrid products={products} />
    </Center>
  );
}
