import Center from "./stylesComponents/Center";
import SlinderHorizontal from "./SlinderHorizontal";
import Title from "./stylesComponents/Title";
import { BackgroundColor } from "@/lib/colors";

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
