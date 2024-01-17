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
