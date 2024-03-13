import { FacebookIcon, InstagramIcon } from "@/components/Icons";
import * as React from "react";

export const InfoData = [
  {
    name: "Quiénes somos",
    href: "/about-us",
    src: "/images/information/grupo.png",
    description: "Conoce nuestra historia y quienes somos",
  },
  {
    name: "Pedidos y entregas",
    href: "/delivery",
    src: "/images/information/lista-de-verificacion.png",
    description: "Conoce nuestro método de pedidos y entrega ",
  },
  {
    name: "Cómo llegar?",
    href: "/address",
    src: "/images/information/mapa.png",
    description: "Conoce la dirección en donde estamos ubicados",
  },
  {
    name: "Contáctenos",
    href: "/contact",
    src: "/images/information/comunicar.png",
    description: "Tienes una duda, ingresa aquí",
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
  {
    id: 5,
    imgUrl: "/images/slide/slinder5.jpg",
  },
];

export const brands = [
  {
    name: "Honda",
    src: "/images/brands/Honda-Logo.png",
  },
  {
    name: "Bajab",
    src: "/images/brands/Bajaj-Logo.png",
  },
  {
    name: "Suzuki",
    src: "/images/brands/Suzuki-Logo.png",
  },
  {
    name: "IGM",
    src: "/images/brands/IGM-Logo.png",
  },
  {
    name: "KTM",
    src: "/images/brands/KTM-Logo.png",
  },
  {
    name: "Benelli",
    src: "/images/brands/Benelli-Logo.png",
  },
  {
    name: "Kawasaki",
    src: "/images/brands/Kawasaki-Logo.png",
  },
  {
    name: "Yamaha",
    src: "/images/brands/Yamaha-Logo.png",
  },

  {
    name: "Ducati",
    src: "/images/brands/Ducati-Logo.png",
  },
];

export const testimonials = [
  {
    id: crypto.randomUUID(),
    avatar: "images/testimonials/avatar1.png",
    name: "Carlos Pereira",
    testimony:
      "¡Increíble experiencia con esta tienda en línea de repuestos para  motos! Necesitaba una pieza específica para mi motocicleta y la encontré aquí a un precio razonable. Además, el servicio al cliente fue excepcional, me ayudaron a elegir la pieza correcta y me dieron consejos útiles para la instalación. Definitivamente volveré a comprar aquí.",
    socialmedia: [
      { img: <InstagramIcon />, name: "Imstagram" },
      { img: <FacebookIcon />, name: "FaceBoook" },
    ],
  },
  {
    id: crypto.randomUUID(),
    avatar: "images/testimonials/avatar2.jpg",
    name: "Margarito Villares",
    testimony:
      "¡No puedo estar más feliz con el servicio de esta tienda en línea! Ordené varios repuestos para mi motocicleta y llegaron en tiempo  récord, incluso más rápido de lo que esperaba. Los repuestos eran originales y de alta calidad, lo que me dio tranquilidad. Además, cuando tuve una pregunta sobre la instalación, su equipo de soporte técnico fue extremadamente útil y paciente. Recomiendo encarecidamente esta tienda a todos los amantes de las motos.",
    socialmedia: [
      { img: <InstagramIcon />, name: "Imstagram" },
      { img: <FacebookIcon />, name: "FaceBoook" },
    ],
  },
  {
    id: crypto.randomUUID(),
    avatar: "images/testimonials/avatar3.jpg",
    name: "Antonio Anzules",
    testimony:
      "Después de buscar en varios sitios en línea, encontré esta tienda de repuestos para motos y estoy muy contento de haberlo hecho. No solo tenían todas las piezas que necesitaba, sino que el proceso de compra fue fácil y rápido. Cuando recibí los repuestos, estaban muy bien empaquetados y en perfecto estado. Además, su atención al cliente fue excepcional; espondieron rápidamente a mis preguntas y me brindaron asesoramiento experto sobre la instalación. ¡Definitivamente mi tienda de referencia para futuras compras!",
    socialmedia: [
      { img: <InstagramIcon />, name: "Imstagram" },
      { img: <FacebookIcon />, name: "FaceBoook" },
    ],
  },
  {
    id: crypto.randomUUID(),
    avatar: "images/testimonials/avatar4.jpg",
    name: "Felix Arboleda",
    testimony:
      "Personalmente, he tenido excelentes experiencias al obtener orientación de expertos en Bodero Racing Development. No solo me ayudaron a elegir las piezas correctas, sino que también me dieron valiosos consejos sobre su instalación",
    socialmedia: [
      { img: <InstagramIcon />, name: "Imstagram" },
      { img: <FacebookIcon />, name: "FaceBoook" },
    ],
  },
];
