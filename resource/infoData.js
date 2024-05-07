import info1 from "../public/images/information/grupo.png";
import info2 from "../public/images/information/lista-de-verificacion.png";
import info3 from "../public/images/information/mapa.png";
import info4 from "../public/images/information/comunicar.png";

export const InfoData = [
  {
    id: crypto.randomUUID(),
    name: "Quiénes somos",
    href: "/quienes-somos",
    src: info1,
    description: "Conoce nuestra historia y quienes somos",
  },
  {
    id: crypto.randomUUID(),
    name: "Pedidos y entregas",
    href: "/pedidos-y-entregas",
    src: info2,
    description: "Conoce nuestro método de pedidos y entrega ",
  },
  {
    id: crypto.randomUUID(),
    name: "Cómo llegar?",
    href: "/como-llegar",
    src: info3,
    description: "Conoce la dirección en donde estamos ubicados",
  },
  {
    id: crypto.randomUUID(),
    name: "Contáctenos",
    href: "/contactenos",
    src: info4,
    description: "Tienes una duda, ingresa aquí",
  },
];
