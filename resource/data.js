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

export const palabras = [
  "title",
  "code",
  "salePrice",
  "brand",
  "category",
  "color",
  "size",
  "images",
  "quantity",
  "description",
  "createdAt",
  "updatedAt",
  "compatibility",
];

export const InfoData = [
  {
    id: new Date(),
    name: "Quiénes somos",
    href: "/quienes-somos",
    src: info1,
    description: "Conoce nuestra historia y quienes somos",
  },
  {
    id: new Date(),
    name: "Pedidos y entregas",
    href: "/pedidos-y-entregas",
    src: info2,
    description: "Conoce nuestro método de pedidos y entrega ",
  },
  {
    id: new Date(),
    name: "Cómo llegar?",
    href: "/como-llegar",
    src: info3,
    description: "Conoce la dirección en donde estamos ubicados",
  },
  {
    id: new Date(),
    name: "Contáctenos",
    href: "/contactenos",
    src: info4,
    description: "Tienes una duda, ingresa aquí",
  },
];

export const dataCarousel = [
  {
    id: new Date(),
    imgUrl: slide1,
  },
  {
    id: new Date(),
    imgUrl: slide2,
  },
  {
    id: new Date(),
    imgUrl: slide3,
  },
  {
    id: new Date(),
    imgUrl: slide4,
  },
  {
    id: new Date(),
    imgUrl: slide5,
  },
];

export const brands = [
  {
    id: new Date(),
    name: "Honda",
    src: honda,
  },
  {
    id: new Date(),
    name: "Bajab",
    src: bajaj,
  },
  {
    id: new Date(),
    name: "Suzuki",
    src: suzuki,
  },
  {
    id: new Date(),
    name: "KTM",
    src: ktm,
  },
  {
    id: new Date(),
    name: "Benelli",
    src: benelli,
  },
  {
    id: new Date(),
    name: "Kawasaki",
    src: kawasaki,
  },
  {
    id: new Date(),
    name: "Yamaha",
    src: yamaha,
  },
  {
    id: new Date(),
    name: "Ducati",
    src: ducati,
  },
];

export const testimonials = [
  {
    id: new Date(),
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
    id: new Date(),
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
    id: new Date(),
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
    id: new Date(),
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
