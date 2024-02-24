import { styled } from "styled-components";
import Center from "./Center";
import SlinderHorizontal from "./SlinderHorizontal";
import Title from "./Title";

const WrapperNewProducto = styled.div`
  margin: 80px 0 40px;
`;

export default function NewProducts({ products }) {
  return (
    <Center>
      <WrapperNewProducto>
        <Title>Productos nuevos</Title>
        <SlinderHorizontal products={products} />
      </WrapperNewProducto>
    </Center>
  );
}
