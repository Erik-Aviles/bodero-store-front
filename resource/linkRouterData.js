import { BsFillPersonVcardFill } from "react-icons/bs";
import { BsEnvelopeFill } from "react-icons/bs";
import { BsFillHouseFill } from "react-icons/bs";
import { BsPinMapFill } from "react-icons/bs";
import { BsPcDisplayHorizontal } from "react-icons/bs";

export const linksUp = [
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
