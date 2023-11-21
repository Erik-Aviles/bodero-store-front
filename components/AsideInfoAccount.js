import { black, error, grey, white } from "@/lib/colors";
import Link from "next/link";
import styled from "styled-components";

const Wrapper = styled.aside`
  background-color: ${black};
  display: flex;
  flex-direction: column;
`;
const StylesNavAside = styled.nav`
  display: flex;
  flex-direction: column;
  a {
    text-decoration: none;
    color: ${white};
    font-size: 1rem;
    padding: 20px;
    &:hover {
      background-color: #5d6062;
    }
  }
`;

export default function AsideInfoAccount() {
  return (
    <Wrapper>
      <StylesNavAside>
        <Link href={"/account/user-info"}>INFORMACION PERSONAL</Link>
        <Link href={"/account/orders-info"}>PEDIDOS</Link>
        <Link href={"/account/invoice-info"}>FACTURAS</Link>
        <Link href={"/"}>Salir</Link>
      </StylesNavAside>
    </Wrapper>
  );
}
