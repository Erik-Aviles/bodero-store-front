import React from "react";
import { CenterSecction } from "@/components/stylesComponents/CenterSecction";
import CategoriesComponent from "@/components/CategoriesComponent";
import { mongooseConnect } from "@/lib/mongoose";
import styled, { css } from "styled-components";
import { Category } from "@/models/Category";
import { black, white } from "@/lib/colors";
import Title from "@/components/Title";
import Head from "next/head";

const CenterDiv = styled.section`
  ${CenterSecction}
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  margin: 40px 0 80px;
  @media screen and (max-width: 768px) {
    margin-left: 20px;
    margin-right: 20px;
    margin-bottom: 20px;
  }
`;
const Box = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  height: fit-content;
  ${(props) =>
    props.deliverblack &&
    css`
      background-color: ${black};
      color: ${white};
    `};
  ${(props) =>
    props.white &&
    css`
      background-color: ${white};
      box-shadow: 1px 4px 20px rgb(0 0 0 / 50%);
    `};
  h3 {
    padding: 15px;
    margin: 16px 0 0;
    font-size: 1.6rem;
    line-height: 2.4rem;
    font-weight: normal;
    background-color: ${black};
    color: ${white};
    box-shadow: 1px 4px 20px rgb(0 0 0 / 50%);
  }
  p,
  span {
    line-height: 1.6rem;
  }
  span {
    padding: 7px 0 7px 10px;
  }
`;

export default function DeliveryPage({ categories }) {
  return (
    <>
      <Head>
        <title>B.R.D | Padidos y entrega</title>
      </Head>
      <main>
        <CategoriesComponent categories={categories} />
        <CenterDiv>
          <Title>Información</Title>
          <Wrapper>
            <Box white={1}>
              <h3>¿Cómo Comprar?</h3>
              <p>Para realizar tus compras vía web, solo sigue estos pasos:</p>
              <span>* Ingresa a www.boderoracing.com</span>
              <span>* Escoge el producto que deseas comprar.</span>
              <span>
                * Presiona el icono de WhatsApp. Nos eviará un chat con la
                información del producto y tendrá atención personalizada.
              </span>
              <span>
                * Especificar la forma de envío (entrega a domicilio o recogida
                en el local)
              </span>
              <span>* Especificar el método de pago</span>
            </Box>
            <Box white={1}>
              <h3>Formas de pago aceptadas</h3>
              <p>
                En Boderoracing.com, nos complace ofrecerte diversas opciones de
                pago para que elijas la que mejor se adapte a tus necesidades:
              </p>
              <p>
                Transferencia bancaria:{" "}
                <span>
                  Realiza tu pago de forma segura y conveniente mediante
                  transferencia bancaria. Te proporcionaremos todos los detalles
                  necesarios para completar la transacción.
                </span>
              </p>
              <p>
                Pago en efectivo:
                <span>
                  Si prefieres retirar tu compra directamente en nuestro local,
                  aceptamos pagos en efectivo al momento de la entrega. Esta
                  opción te brinda flexibilidad y comodidad para completar tu
                  compra según tus preferencias.
                </span>
              </p>
              <p>
                Con estas opciones de pago, queremos asegurarnos de que tu
                experiencia de compra sea lo más conveniente y satisfactoria
                posible. No dudes en contactarnos si tienes alguna pregunta o
                necesitas asistencia adicional durante el proceso de compra.
              </p>
            </Box>{" "}
            <Box white={1}>
              <h3>Tiempos de Entrega</h3>
              <p>
                Utilizamos los servicios de Servientrega o transporte público
                para hacer llegar tus compras hasta la puerta de tu hogar u
                oficina. Garantizamos un proceso de entrega seguro y rápido.
              </p>
              <p>
                Envío gratuito para compras superiores a $50: ¡Aprovecha nuestra
                oferta de envío gratuito para compras que superen los $50
                dólares! Realiza tu pedido con total confianza y disfruta de
                esta ventaja sin costos adicionales.
              </p>
              <p>
                Una vez realizado tu pedido, nos comprometemos a entregarlo en
                un plazo de 24 a 48 horas, dependiendo de la ciudad de destino.
              </p>
            </Box>
          </Wrapper>
        </CenterDiv>
      </main>
    </>
  );
}
export async function getServerSideProps() {
  await mongooseConnect();
  const categories = await Category.find({}, null, { sort: { _id: -1 } });
  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
}
