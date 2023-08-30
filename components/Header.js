import Center from "./Center";
import CustomLink from "./CustomLink";
import Logo from "./Logo";
import { styled } from "styled-components";

const StyledHeader = styled.header`
  background-color: #222;
  padding: 0;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`;
const StaledNav = styled.nav`
  display: flex;
  gap: 10px;
`;

//  links
const links = [
  { title: "Inicio", href: "/", icon: "j" },
  { title: "Productos", href: "/products", icon: "j" },
  { title: "Categorias", href: "/categories", icon: "j" },
  { title: "Cuenta", href: "/account", icon: "j" },
  { title: "Carrito (0)", href: "/cart", icon: "j" },
];

export default function Header() {
  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <Logo href={"/"} />
          <StaledNav>
            {links.map((link, index) => (
              <CustomLink
                href={link.href}
                key={`id${index}${link.title}`}
                title={link.title}
              />
            ))}
          </StaledNav>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}
