import avatar1 from "../public/images/testimonials/avatar1.png";
import avatar2 from "../public/images/testimonials/avatar2.jpg";
import avatar3 from "../public/images/testimonials/avatar3.jpg";
import avatar4 from "../public/images/testimonials/avatar4.jpg";
import instagram from "../public/svg/instagram.svg";
import facebook from "../public/svg/facebook.svg";

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
