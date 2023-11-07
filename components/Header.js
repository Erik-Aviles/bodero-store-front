import CustomLink from "./CustomLink";
import Logo from "./Logo";
import styled from "styled-components";

const StyledHeader = styled.header`
  padding: 0;
`;
const WrapperUp = styled.div`
  background-color: #222;
  display: flex;
  justify-content: flex-end;
  padding: 10px 0;
`;
const WrapperDown = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 30px;
`;
const StaledNavUp = styled.nav`
  display: flex;
  padding: 0 30px;
  gap: 10px;
`;
const StaledNav = styled.nav`
  display: flex;
  gap: 10px;
`;

//  links
const linksUp = [
  { title: "Quiénes somos ", href: "/about", icon: "j" },
  { title: "Formas de pago  ", href: "/payments", icon: "j" },
  { title: "Tiempo de entrega ", href: "/delivery", icon: "j" },
  { title: "Recomendaciones ", href: "/suggestions", icon: "j" },
  { title: "Contacto", href: "/contact", icon: "j" },
];
const linksDown = [
  { title: "Mi cuenta", href: "/account", icon: "j" },
  { title: "Carrito (0)", href: "/cart", icon: "j" },
];

export default function Header() {
  return (
    <StyledHeader>
      <WrapperUp>
        <StaledNavUp>
          {linksUp.map((link, index) => (
            <CustomLink
              href={link.href}
              key={`id${index}${link.title}`}
              title={link.title}
            />
          ))}
        </StaledNavUp>
      </WrapperUp>

      <WrapperDown>
        <Logo href={"/"} />
        <StaledNav>
          {linksDown.map((link, index) => (
            <CustomLink
              href={link.href}
              key={`id${index}${link.title}`}
              title={link.title}
            />
          ))}
        </StaledNav>
      </WrapperDown>
    </StyledHeader>
  );
}
