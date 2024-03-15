import Center from "./stylesComponents/Center";
import SlinderHorizontal from "./SlinderHorizontal";
import Title from "./stylesComponents/Title";

export default function NewProducts({ products }) {
  return (
    <Center>
      <section>
        <Title>Productos nuevos</Title>
        <SlinderHorizontal products={products} />
      </section>
    </Center>
  );
}
