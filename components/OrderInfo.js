// components/OrderInfo.js
import { black, success, white, white2 } from "@/lib/colors";
import styled, { css } from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
  }
`;

const Title = styled.h3`
  padding: 10px;
  margin: 0;
  font-size: 1rem;
  line-height: 2rem;
  font-weight: normal;
  background-color: ${black};
  color: ${white};
  box-shadow: 1px 4px 20px rgb;
  ${(props) =>
    props.$green &&
    css`
      background-color: ${success};
      color: ${white2};
    `};
`;

const Description = styled.p`
  font-size: 1rem;
  color: #ffffff;
  line-height: 1.5;
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: center;
`;

export default function OrderInfo() {
  return (
    <Wrapper>
      <Container>
        <Title>Pedido Directo?</Title>
        <Description>
          Permite realizar el pedido directo a la empresa de manera
          rápida y eficiente.
        </Description>
      </Container>
      <Container>
        <Title $green={1}>Pedido por WhatsApp?</Title>
        <Description>
          Se envía el pedido por WhatsApp para obtener información
          personalizada y detallada sobre los productos escogidos.
        </Description>
      </Container>
    </Wrapper>
  );
}
