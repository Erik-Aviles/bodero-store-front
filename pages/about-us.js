import FilterOnlyCategories from "@/components/FilterOnlyCategories";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import Center from "@/components/Center";
import styled from "styled-components";
import Title from "@/components/Title";
import Head from "next/head";
import SlinderCategories from "@/components/SlinderCategories";
import CategoriesComponent from "@/components/CategoriesComponent";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 60px;
`;
const SectionImagen = styled.section`
  width: 100%;
  place-self: center;
  margin: 20px;
  img {
    width: 100%;
  }
`;
const SectionText = styled.section`
  h3 {
    font-size: 1.5rem;
  }
  p {
    margin: 0;
    padding: 0 30px;
    @media screen and (max-width: 320px) {
      padding: 0 10px;
    }
  }
`;

export default function AboutUsPage({ categories }) {
  return (
    <>
      <Head>
        <title> B.R.D | Quienes somos</title>
      </Head>
      <main>
        <CategoriesComponent categories={categories} />
        <Center>
          <Title>Quienes somos</Title>
          <Wrapper>
            <SectionImagen>
              <img
                src="/images/about-us/equipoTaller.jpg"
                alt="Equipo del taller"
                text="Foto del equipo"
              />
            </SectionImagen>
            <SectionText>
              <p>
                Bodero Racing Development, fundada en el año 2016, es la primera
                empresa de ventas por televisión en Sudamérica. Somos una
                empresa multicanal comprometida a brindar el mejor servicio, los
                mejores precios y la mejor calidad en todos los aspectos de
                nuestro trabajo. Con más de 30 años de experiencia en entrega a
                domicilio, somos la mejor opción para realizar compras en
                nuestra página web, y locales comerciales a nivel nacional.{" "}
                <br /> <br /> Nuestra meta no es hacer una venta sino ganar un
                cliente. No vendemos productos sino una experiencia positiva con
                la mejor garantía del país. TVentas también sirve a proveedores
                del Ecuador y el mundo que deseen promocionar y distribuir sus
                productos de manera rápida y efectiva
              </p>
              <h3>Misión</h3>
              <p>
                Trabajamos en equipo para ser una empresa productiva, dinámica y
                rentable manteniendo un ambiente laboral que permita el
                crecimiento de nuestros colaboradores, tanto a nivel profesional
                como personal. <br /> <br />
                Ofrecemos productos innovadores y de calidad brindando
                experiencias inigualables a cada uno de nuestros clientes.
                Queremos ser un ejemplo de excelencia para el Ecuador y fuente
                de oportunidad para todos los que hacemos TVentas.
              </p>
              <h3>Visión</h3>
              <p>
                Ser la mejor empresa multicanal del Ecuador, mejorando la vida
                de las personas, gestionando modelos de negocio innovadores y
                una administración efectiva, trabajando en equipo junto a los
                mejores colaboradores.
              </p>
              <h3>Valores</h3>
              <p>
                Liderazgo, Compromiso, Responsabilidad, Integridad, Trabajo en
                Equipo
              </p>
            </SectionText>
          </Wrapper>
        </Center>
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
