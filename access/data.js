const { HomeIcon } = require("@/components/Icons");
import * as React from "react";

export const InfoData = [
  {
    name: "Quiénes somos",
    href: "/about-us",
    icon: <HomeIcon />,
    description: "Conoce nuestra historia y quienes somos",
  },
  {
    name: "Pedidos y entregas",
    href: "/delivery",
    icon: <HomeIcon />,
    description: "Conoce nuestro método de pedidos y entrega ",
  },
  {
    name: "Como llegar?",
    href: "/address",
    icon: <HomeIcon />,
    description: "Conoce la dirección en donde estamos ubicados",
  },
  {
    name: "Contáctenos",
    href: "/contact",
    icon: <HomeIcon />,
    description: "Tines una duda, ingresa aqui",
  },
];

export const dataCarousel = [
  {
    id: 1,
    imgUrl: "/images/slide/slinder1.jpg",
  },
  {
    id: 2,
    imgUrl: "/images/slide/slinder2.jpg",
  },
  {
    id: 3,
    imgUrl: "/images/slide/slinder3.jpg",
  },
  {
    id: 4,
    imgUrl: "/images/slide/slinder4.jpg",
  },
];
