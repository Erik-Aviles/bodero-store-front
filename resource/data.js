import { FacebookIcon } from "@/components/Icons";
import * as React from "react";
import avatar1 from "../public/images/testimonials/avatar1.png";
import avatar2 from "../public/images/testimonials/avatar2.jpg";
import avatar3 from "../public/images/testimonials/avatar3.jpg";
import avatar4 from "../public/images/testimonials/avatar4.jpg";
import slide1 from "../public/images/slide/slinder1.jpg";
import slide2 from "../public/images/slide/slinder2.jpg";
import slide3 from "../public/images/slide/slinder3.jpg";
import slide4 from "../public/images/slide/slinder4.jpg";
import slide5 from "../public/images/slide/slinder5.jpg";
import honda from "../public/images/brands/Honda-Logo.png";
import bajaj from "../public/images/brands/Bajaj-Logo.png";
import suzuki from "../public/images/brands/Suzuki-Logo.png";
import ktm from "../public/images/brands/KTM-Logo.png";
import benelli from "../public/images/brands/Benelli-Logo.png";
import kawasaki from "../public/images/brands/Kawasaki-Logo.png";
import yamaha from "../public/images/brands/Yamaha-Logo.png";
import ducati from "../public/images/brands/Ducati-Logo.png";
import info1 from "../public/images/information/grupo.png";
import info2 from "../public/images/information/lista-de-verificacion.png";
import info3 from "../public/images/information/mapa.png";
import info4 from "../public/images/information/comunicar.png";
import instagram from "../public/svg/instagram.svg";
import facebook from "../public/svg/facebook.svg";

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

export const dataCarousel = [
  {
    id: 1,
    imgUrl: slide1,
  },
  {
    id: 2,
    imgUrl: slide2,
  },
  {
    id: 3,
    imgUrl: slide3,
  },
  {
    id: 4,
    imgUrl: slide4,
  },
  {
    id: 5,
    imgUrl: slide5,
  },
];

export const brands = [
  {
    id: crypto.randomUUID(),
    name: "Honda",
    src: honda,
  },
  {
    id: crypto.randomUUID(),
    name: "Bajab",
    src: bajaj,
  },
  {
    id: crypto.randomUUID(),
    name: "Suzuki",
    src: suzuki,
  },
  {
    id: crypto.randomUUID(),
    name: "KTM",
    src: ktm,
  },
  {
    id: crypto.randomUUID(),
    name: "Benelli",
    src: benelli,
  },
  {
    id: crypto.randomUUID(),
    name: "Kawasaki",
    src: kawasaki,
  },
  {
    id: crypto.randomUUID(),
    name: "Yamaha",
    src: yamaha,
  },
  {
    id: crypto.randomUUID(),
    name: "Ducati",
    src: ducati,
  },
];

export const testimonials = [
  {
    id: crypto.randomUUID(),
    avatar: avatar1,
    name: "Carlos Pereira",
    testimony:
      "¡Increíble experiencia con esta tienda en línea de repuestos para  motos! Necesitaba una pieza específica para mi motocicleta y la encontré aquí a un precio razonable. Además, el servicio al cliente fue excepcional, me ayudaron a elegir la pieza correcta y me dieron consejos útiles para la instalación. Definitivamente volveré a comprar aquí.",
    socialmedia: [
      { img: instagram, name: "Imstagram" },
      { img: facebook, name: "FaceBoook" },
    ],
  },
  {
    id: crypto.randomUUID(),
    avatar: avatar2,
    name: "Margarito Villares",
    testimony:
      "¡No puedo estar más feliz con el servicio de esta tienda en línea! Ordené varios repuestos para mi motocicleta y llegaron en tiempo  récord, incluso más rápido de lo que esperaba. Los repuestos eran originales y de alta calidad, lo que me dio tranquilidad. Además, cuando tuve una pregunta sobre la instalación, su equipo de soporte técnico fue extremadamente útil y paciente. Recomiendo encarecidamente esta tienda a todos los amantes de las motos.",
    socialmedia: [
      { img: instagram, name: "Imstagram" },
      { img: facebook, name: "FaceBoook" },
    ],
  },
  {
    id: crypto.randomUUID(),
    avatar: avatar3,
    name: "Antonio Anzules",
    testimony:
      "Después de buscar en varios sitios en línea, encontré esta tienda de repuestos para motos y estoy muy contento de haberlo hecho. No solo tenían todas las piezas que necesitaba, sino que el proceso de compra fue fácil y rápido. Cuando recibí los repuestos, estaban muy bien empaquetados y en perfecto estado. Además, su atención al cliente fue excepcional; espondieron rápidamente a mis preguntas y me brindaron asesoramiento experto sobre la instalación. ¡Definitivamente mi tienda de referencia para futuras compras!",
    socialmedia: [
      { img: instagram, name: "Imstagram" },
      { img: facebook, name: "FaceBoook" },
    ],
  },
  {
    id: crypto.randomUUID(),
    avatar: avatar4,
    name: "Felix Arboleda",
    testimony:
      "Personalmente, he tenido excelentes experiencias al obtener orientación de expertos en Bodero Racing Development. No solo me ayudaron a elegir las piezas correctas, sino que también me dieron valiosos consejos sobre su instalación",
    socialmedia: [
      { img: instagram, name: "Imstagram" },
      { img: facebook, name: "FaceBoook" },
    ],
  },
];
