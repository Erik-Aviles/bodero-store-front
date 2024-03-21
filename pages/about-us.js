import CategoriesComponent from "@/components/CategoriesComponent";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import styled, { css } from "styled-components";
import { CenterSecction } from "@/components/stylesComponents/CenterSecction";
import Image from "next/image";
import logo from "@/public/logo.jpg";
import horizontal1 from "@/public/images/about-us/horizontal1.jpg";
import horizontal2 from "@/public/images/about-us/horizontal2.jpg";
import vertical1 from "@/public/images/about-us/vertical1.jpg";
import vertical2 from "@/public/images/about-us/vertical2.jpg";
import vertical4 from "@/public/images/about-us/vertical4.jpg";
import Title from "@/components/stylesComponents/Title";
import Layout from "@/components/Layout";
import { useRouter } from "next/navigation";
import BackButton from "@/components/buttonComponents/BackButton";
import { FlexStyled } from "@/components/stylesComponents/Flex";
import { greylight } from "@/lib/colors";

const CenterDiv = styled.section`
  ${CenterSecction}
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 60px;
  @media screen and (max-width: 768px) {
    padding-bottom: 0;
  }
`;
const SectionImagen = styled.section`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(3, auto);
  gap: 0.1rem;
  padding: 8px;
`;
const BoxImage = styled.figure`
  display: flex;
  flex-direction: column;
  margin: 0;
  ${(props) =>
    props.$uno &&
    css`
      grid-column: 1/3;
      grid-row: 1/3;
    `};
  ${(props) =>
    props.$dos &&
    css`
      grid-column: 3/5;
      grid-row: 1/3;
    `};
  ${(props) =>
    props.$tres &&
    css`
      grid-column: 5/7;
      grid-row: 1/3;
    `};
  ${(props) =>
    props.$cuatro &&
    css`
      grid-column: 1/4;
      grid-row: 3/4;
    `};
  ${(props) =>
    props.$cinco &&
    css`
      grid-column: 4/7;
      grid-row: 3/4;
    `};
  img {
    width: 100%;
    height: auto;
  }
  figcaption {
    color: ${greylight};
    font-size: 0.8rem;
    align-self: center;
    margin-top: 0.2rem;
  }
`;
const SectionText = styled.section`
  padding: 0 20px;
  letter-spacing: 0.025em;
  line-height: 30px;
  font-size: 18px;
  text-wrap: pretty;
  h3 {
    font-size: 1.5rem;
  }
  p {
    margin: 0;
    padding: 0;
  }
  @media screen and (max-width: 320px) {
  }
`;

export default function AboutUsPage({ categories }) {
  const router = useRouter();

  const handleGoBack = (e) => {
    e.preventDefault();
    router.back();
  };

  return (
    <Layout title="B.R.D | Quienes somos">
      <CategoriesComponent categories={categories} />
      <CenterDiv>
        <FlexStyled>
          <BackButton onClick={handleGoBack} />
          <Title>Quienes somos</Title>
        </FlexStyled>
        <Wrapper>
          <SectionImagen>
            <BoxImage $uno>
              <Image alt="Taller B.D.R" src={vertical1} />
              <figcaption>{"Area del taller"}</figcaption>
            </BoxImage>
            <BoxImage $dos>
              <Image alt="Logo B.D.R" src={vertical2} />
              <figcaption>{"Monitoreo digital"}</figcaption>
            </BoxImage>
            <BoxImage $tres>
              <Image alt="Logo B.D.R" src={vertical4} />
              <figcaption>{"Stok de productos"}</figcaption>
            </BoxImage>
            <BoxImage $cuatro>
              <Image alt="Logo B.D.R" src={horizontal1} />
              <figcaption>{"Area telescopica"}</figcaption>
            </BoxImage>
            <BoxImage $cinco>
              <Image alt="Logo B.D.R" src={horizontal2} />
              <figcaption>{"Checkeo computarizado"}</figcaption>
            </BoxImage>
          </SectionImagen>
          <SectionText>
            <p>
              Desde nuestros humildes comienzos en los albores de los años 90,
              en Mecánica de Motos Bodero Racing Development, nuestra historia
              está arraigada en una profunda pasión por la mecánica. Nos
              iniciamos bajo el nombre de Moto Servicio Progreso, un homenaje a
              la avenida que nos vio nacer.
              <br />
              <br />
              Con el paso del tiempo y el crecimiento de nuestra dedicación, en
              el año 2005 evolucionamos hacia Bodero Racing Technical, marcando
              un hito en nuestra trayectoria. Nuestra reputación se cimentó en
              la excelencia de nuestro trabajo, especialmente en la mejora y
              optimización de motores, consolidándonos como referentes en el
              ámbito de la mecánica de motos de alto rendimiento.
              <br />
              <br /> Nos ganamos el reconocimiento como verdaderos artesanos de
              la mecánica, dedicados a perfeccionar cada aspecto de las
              motocicletas que pasaban por nuestras manos. Con el cambio de
              milenio, nuestra pasión nos llevó a nuevos horizontes: la búsqueda
              de velocidades más vertiginosas.
              <br />
              <br /> Este período marcó el inicio de nuestra incursión en el
              mundo de las carreras de motos de velocidad, allá por los años 90.
              Este fue un punto de inflexión en nuestra historia, donde no solo
              nos dedicamos a la preparación de motos, sino que también nos
              lanzamos al desafío de la competición, donde la exigencia y la
              innovación nos llevaron a nuevos niveles de excelencia.
              <br />
              <br /> Desde el año 2016, hemos llevado nuestra pasión y
              compromiso un paso más allá al cambiar nuestro nombre a Bodero
              Racing Development.
              <br />
              <br /> Esta evolución no solo refleja nuestro crecimiento y
              madurez como empresa, sino que también subraya nuestro firme
              compromiso con la vanguardia tecnológica en el campo de la
              mecánica, repuestos y accesorios de motos. Manteniéndonos siempre
              a la vanguardia de la tecnología, hemos continuado explorando
              nuevas fronteras y adoptando las últimas innovaciones en nuestro
              trabajo.
              <br />
              <br /> Esta nueva etapa en nuestra trayectoria nos ha permitido
              seguir impulsando los límites de la ingeniería y la eficiencia,
              consolidando nuestra posición como líderes en el sector. A través
              de cada cambio de nombre y cada evolución, nuestra dedicación a la
              excelencia y nuestra pasión por las motos han permanecido
              inquebrantables.
              <br />
              <br /> En Bodero Racing Development, seguimos comprometidos con
              nuestro legado de calidad, innovación y rendimiento, listos para
              enfrentar los desafíos del mañana con determinación y entusiasmo
              renovados. A lo largo de los años, hemos continuado creciendo y
              perfeccionándonos, siempre impulsados por nuestra pasión y
              compromiso con la calidad. En cada carrera, en cada moto que pasa
              por nuestras manos, dejamos una marca de excelencia y dedicación,
              honrando nuestra herencia y mirando siempre hacia el futuro con
              entusiasmo y determinación.
              <br /> <br />
            </p>
            <h3>Misión</h3>
            <p>
              Ser el servicio técnico de motocicletas y venta de repuestos y
              accesorios líder en nuestra comunidad, reconocido por nuestra
              excelencia en servicio, calidad de trabajo y compromiso con la
              satisfacción del cliente
            </p>
            <h3>Visión</h3>
            <p>
              Brindar servicios de mantenimiento, reparación y asesoría de
              motocicletas con profesionalismo y eficiencia, utilizando
              tecnología avanzada y personal altamente capacitado, para asegurar
              la seguridad y rendimiento óptimo de las motos de nuestros
              clientes.
            </p>
            <h3>Valores</h3>
            <p>
              Liderazgo, Compromiso, Responsabilidad, Integridad, Trabajo en
              Equipo
            </p>
          </SectionText>
        </Wrapper>
      </CenterDiv>
    </Layout>
  );
}
export async function getStaticProps() {
  await mongooseConnect();
  const categories = await Category.find({}, null, { sort: { _id: -1 } });
  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories)),
    },
    revalidate: 10,
  };
}
