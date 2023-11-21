import { white, grey, primary } from "@/lib/colors";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

const linksUp = [
  { name: "Quiénes somos ", href: "/about-us", icon: "j" },
  { name: "Formas de pago  ", href: "/payments", icon: "j" },
  { name: "Tiempo de entrega ", href: "/delivery", icon: "j" },
  { name: "Como llegar? ", href: "/address", icon: "j" },
  { name: "Contacto", href: "/contact", icon: "j" },
];

const Wrapper = styled.div`
  height: 35px;
  display: flex;
  justify-content: center;
  background-color: ${primary};
`;

const StyleNav = styled.nav`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const StaledLink = styled(Link)`
  text-decoration: none;
  padding: 0 20px 0 0;
  border-right: 0.3px solid #ccc;
  font-size: 0.8rem;
  cursor: pointer;
  color: ${grey};
  &:hover {
    color: ${white};
  }
`;

const Information = () => {
  return (
    <Wrapper>
      <StyleNav>
        {linksUp.map((link, index) => (
          <StaledLink
            href={link.href}
            key={`id${index}${link.name}`}
            title={link.name}
          >
            {link.name}
          </StaledLink>
        ))}
      </StyleNav>
    </Wrapper>
  );
};

export default Information;
