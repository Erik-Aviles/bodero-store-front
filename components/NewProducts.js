import Center from "./Center";
import SlinderHorizontal from "./SlinderHorizontal";
import Title from "./Title";

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
