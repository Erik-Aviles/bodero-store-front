import { white, grey, primary, black, success, warning } from "@/lib/colors";
import Link from "next/link";
import React from "react";
import styled, { css } from "styled-components";
import { HomeIcon } from "./Icons";
import { BsFillPersonVcardFill } from "react-icons/bs";
import { BsEnvelopeFill } from "react-icons/bs";
import { BsFillHouseFill } from "react-icons/bs";
import { BsPinMapFill } from "react-icons/bs";
import { BsPcDisplayHorizontal } from "react-icons/bs";
import { useRouter } from "next/router";

const linksUp = [
  {
    name: "Inicio ",
    href: "/",
    icon: <BsFillHouseFill />,
    description: "Pagina principal",
  },
  {
    name: "Quiénes somos ",
    href: "/quienes-somos",
    icon: <BsFillPersonVcardFill />,
    description: "Conoce nuestra historia y quienes somos",
  },
  {
    name: "Pedidos y entregas ",
    href: "/pedidos-y-entregas",
    icon: <BsPcDisplayHorizontal />,
    description: "Conoce nuestro método de pedidos y entrega ",
  },
  {
    name: "Como llegar? ",
    href: "/como-llegar",
    icon: <BsPinMapFill />,
    description: "Conoce la dirección en donde estamos ubicados",
  },
  {
    name: "Contáctenos",
    href: "/contactenos",
    icon: <BsEnvelopeFill />,
    description: "Tines una duda, ingresa aqui",
  },
];

const Wrapper = styled.div`
  background: ${black};
  width: 100%;
  height: 41px;
  overflow: hidden;
  position: relative;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const NavHeader = styled.nav`
  top: -30px;
  position: absolute;
  right: 0;
  margin: 12px auto 0;
  max-width: 800px;
  width: 100%;
`;

const ListInformation = styled.ul`
  display: table;
  width: 100%;
  position: relative;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const ItemInformation = styled.li`
  display: table-cell;
  border-right: 0.3px solid #ccc;
`;

const StaledLink = styled(Link)`
  color: ${white};
  display: block;
  padding: 12px;
  position: relative;
  text-align: center;
  text-decoration: none;
  -webkit-transition: all 0.3s ease;
  -moz-transition: all 0.3s ease;
  -ms-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  transition: all 0.3s ease;
  &:hover {
    span {
      top: 0;
    }
  }
`;

const Spans = styled.span`
  display: block;
  width: 100%;
  height: 100%;
  left: 0;
  position: absolute;
  top: -35px;
  -webkit-transition: all 0.3s ease;
  -moz-transition: all 0.3s ease;
  -ms-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  transition: all 0.3s ease;
  ${(props) =>
    props.$isActive &&
    css`
      top: 0;
    `};
  ${(props) =>
    props.$one &&
    css`
      background: ${primary};
    `};
  ${(props) =>
    props.$two &&
    css`
      background: ${success};
    `};
  ${(props) =>
    props.$three &&
    css`
      background: #f2ae0d; /*amarillo*/
    `};
  ${(props) =>
    props.$four &&
    css`
      background: #013c92; /* azul */
    `};
  ${(props) =>
    props.$five &&
    css`
      background: ${warning};
    `};
`;

const Icons = styled.i`
  display: block;
  line-height: 45px;
`;

const InformationHeader = () => {
  const router = useRouter();
  const pathname = router.pathname;

  return (
    <Wrapper>
      <NavHeader>
        <ListInformation>
          {linksUp.map((link, index) => (
            <ItemInformation key={`id${index}1`} title={link.name}>
              <StaledLink href={link.href}>
                <Spans
                  $one={index === 0}
                  $two={index === 1}
                  $three={index === 2}
                  $four={index === 3}
                  $five={index === 4}
                  $isActive={pathname === link.href}
                >
                  <Icons>{link.icon}</Icons>
                </Spans>
                {link.name}
              </StaledLink>
            </ItemInformation>
          ))}
        </ListInformation>
      </NavHeader>
    </Wrapper>
  );
};

export default InformationHeader;

// const InformationHeader = () => {
//   return (
//     <Wrapper>
//       <ListInformation>
//         {linksUp.map((link, index) => (
//           <ItemInformation key={`id${index}1`} title={link.name}>
//             <StaledLink href={link.href}>{link.name}</StaledLink>
//           </ItemInformation>
//         ))}
//       </ListInformation>
//     </Wrapper>
//   );
// };

// export default InformationHeader;
