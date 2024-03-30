import { white, grey, primary } from "@/lib/colors";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { HomeIcon } from "./Icons";
import Center from "./stylesComponents/Center";

const linksUp = [
  {
    name: "Quiénes somos ",
    href: "/quienes-somos",
    icon: <HomeIcon />,
    description: "Conoce nuestra historia y quienes somos",
  },
  {
    name: "Pedidos y entregas ",
    href: "/pedidos-y-entregas",
    icon: <HomeIcon />,
    description: "Conoce nuestro método de pedidos y entrega ",
  },
  {
    name: "Como llegar? ",
    href: "/como-llegar",
    icon: <HomeIcon />,
    description: "Conoce la dirección en donde estamos ubicados",
  },
  {
    name: "Contáctenos",
    href: "/contactenos",
    icon: <HomeIcon />,
    description: "Tines una duda, ingresa aqui",
  },
];

const Wrapper = styled.div`
  background-color: ${primary};
`;

const ListInformation = styled.ul`
  display: block;
  margin: 0;
  text-align: right;
  list-style-type: none;
  color: ${grey};
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const ItemInformation = styled.li`
  border-right: 0.3px solid #ccc;
  line-height: 36px;
  padding: 0 14px;
`;
const StaledLink = styled(Link)`
  &:hover {
    color: ${white};
    cursor: pointer;
  }
`;

const InformationHeader = () => {
  return (
    <Wrapper>
      <Center>
        <ListInformation>
          {linksUp.map((link, index) => (
            <ItemInformation key={`id${index}1`} title={link.name}>
              <StaledLink href={link.href}>{link.name}</StaledLink>
            </ItemInformation>
          ))}
        </ListInformation>
      </Center>
    </Wrapper>
  );
};

export default InformationHeader;
