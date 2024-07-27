import SlinderHorizontal from "./SlinderHorizontal";
import { black, white } from "@/lib/colors";
import styled from "styled-components";

const ContainerSesion = styled.section`
  width: 100%;
  margin: 0 auto;
  padding: 20px 0 40px;
  @media screen and (min-width: 640px) {
    padding: 20px;
  }
`;
const Wrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px 0 40px;
  background-color: ${black};
  border-radius: 10px;
  @media screen and (min-width: 640px) {
    padding: 20px;
  }
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
  color: ${white};
  @media screen and (min-width: 768px) {
    font-size: 1.8rem;
  }
`;

export default function NewProducts({ products, isLoading }) {
  return (
    <ContainerSesion>
      <Wrapper>
        <Title>Recien llegados</Title>
        <SlinderHorizontal products={products} isLoading={isLoading} />
      </Wrapper>
    </ContainerSesion>
  );
}
