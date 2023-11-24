import { black, white } from "@/lib/colors";
import Link from "next/link";
import { useRouter } from "next/router";
import styled, { css } from "styled-components";

const Wrapper = styled.aside`
  max-height: 290px;
  background-color: ${black};
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 1px 4px 20px rgb(0 0 0 / 20%);
`;
const StylesNavAside = styled.nav`
  width: auto;
  display: flex;
  flex-direction: column;
`;
const StylesLink = styled(Link)`
  text-decoration: none;
  color: ${white};
  font-size: 1rem;
  padding: 20px;
  cursor: pointer;
  &:hover {
    background-color: rgba(132, 135, 137, 0.6);
  }
  ${(props) =>
    props.active &&
    css`
      background-color: #5d6062;
    `};
`;

export default function AsideInfoAccount() {
  const router = useRouter();
  const { pathname } = router;

  return (
    <Wrapper>
      <StylesNavAside>
        {pathname === "/account/user-info" ? (
          <StylesLink active={1} href={"/account/user-info"}>
            INFORMACION PERSONAL
          </StylesLink>
        ) : (
          <StylesLink href={"/account/user-info"}>
            INFORMACION PERSONAL
          </StylesLink>
        )}
        {pathname === "/account/orders-info" ? (
          <StylesLink active={1} href={"/account/orders-info"}>
            PEDIDOS
          </StylesLink>
        ) : (
          <StylesLink href={"/account/orders-info"}>PEDIDOS</StylesLink>
        )}
        <StylesLink href={"/"}>Salir</StylesLink>
      </StylesNavAside>
    </Wrapper>
  );
}
