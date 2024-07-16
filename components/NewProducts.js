import styled from "styled-components";
import SlinderHorizontal from "./SlinderHorizontal";
import Title from "./stylesComponents/Title";

const ContainerSesion = styled.section`
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px 0 40px;
  @media screen and (min-width: 640px) {
    padding: 20px;
  }
`;

export default function NewProducts({ products, isLoading }) {
  return (
    <ContainerSesion>
      <Title>Productos nuevos</Title>
      <SlinderHorizontal products={products} isLoading={isLoading} />
    </ContainerSesion>
  );
}
