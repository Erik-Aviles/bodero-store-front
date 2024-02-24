import CategoriesComponent from "@/components/CategoriesComponent";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import styled from "styled-components";
import Title from "@/components/Title";
import Head from "next/head";
import { CenterSecction } from "@/components/stylesComponents/CenterSecction";

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
  width: 100%;
  place-self: center;
  margin: 20px;
  img {
    width: 100%;
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
  return (
    <>
      <Head>
        <title> B.R.D | Quienes somos</title>
      </Head>
      <main>
        <CategoriesComponent categories={categories} />
        <CenterDiv>
          <Title>Quienes somos</Title>
          <Wrapper>
            <SectionImagen>
              <img
                src="/logo.jpg"
                alt="Equipo del taller"
                text="Foto del equipo"
              />
            </SectionImagen>
            <SectionText>
              <p>
                Desde nuestros humildes comienzos en los albores de los años 90,
                en Mecánica de Motos Bodero Racing Development, nuestra historia
                está arraigada en una profunda pasión por la mecánica. Nos
                iniciamos bajo el nombre de Moto Servicio Progreso, un homenaje
                a la avenida que nos vio nacer.
                <br />
                <br />
                Con el paso del tiempo y el crecimiento de nuestra dedicación,
                en el año 2005 evolucionamos hacia Bodero Racing Technical,
                marcando un hito en nuestra trayectoria. Nuestra reputación se
                cimentó en la excelencia de nuestro trabajo, especialmente en la
                mejora y optimización de motores, consolidándonos como
                referentes en el ámbito de la mecánica de motos de alto
                rendimiento.
                <br />
                <br /> Nos ganamos el reconocimiento como verdaderos artesanos
                de la mecánica, dedicados a perfeccionar cada aspecto de las
                motocicletas que pasaban por nuestras manos. Con el cambio de
                milenio, nuestra pasión nos llevó a nuevos horizontes: la
                búsqueda de velocidades más vertiginosas.
                <br />
                <br /> Este período marcó el inicio de nuestra incursión en el
                mundo de las carreras de motos de velocidad, allá por los años
                90. Este fue un punto de inflexión en nuestra historia, donde no
                solo nos dedicamos a la preparación de motos, sino que también
                nos lanzamos al desafío de la competición, donde la exigencia y
                la innovación nos llevaron a nuevos niveles de excelencia.
                <br />
                <br /> Desde el año 2016, hemos llevado nuestra pasión y
                compromiso un paso más allá al cambiar nuestro nombre a Bodero
                Racing Development.
                <br />
                <br /> Esta evolución no solo refleja nuestro crecimiento y
                madurez como empresa, sino que también subraya nuestro firme
                compromiso con la vanguardia tecnológica en el campo de la
                mecánica, repuestos y accesorios de motos. Manteniéndonos
                siempre a la vanguardia de la tecnología, hemos continuado
                explorando nuevas fronteras y adoptando las últimas innovaciones
                en nuestro trabajo.
                <br />
                <br /> Esta nueva etapa en nuestra trayectoria nos ha permitido
                seguir impulsando los límites de la ingeniería y la eficiencia,
                consolidando nuestra posición como líderes en el sector. A
                través de cada cambio de nombre y cada evolución, nuestra
                dedicación a la excelencia y nuestra pasión por las motos han
                permanecido inquebrantables.
                <br />
                <br /> En Bodero Racing Development, seguimos comprometidos con
                nuestro legado de calidad, innovación y rendimiento, listos para
                enfrentar los desafíos del mañana con determinación y entusiasmo
                renovados. A lo largo de los años, hemos continuado creciendo y
                perfeccionándonos, siempre impulsados por nuestra pasión y
                compromiso con la calidad. En cada carrera, en cada moto que
                pasa por nuestras manos, dejamos una marca de excelencia y
                dedicación, honrando nuestra herencia y mirando siempre hacia el
                futuro con entusiasmo y determinación.
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
                tecnología avanzada y personal altamente capacitado, para
                asegurar la seguridad y rendimiento óptimo de las motos de
                nuestros clientes.
              </p>
              <h3>Valores</h3>
              <p>
                Liderazgo, Compromiso, Responsabilidad, Integridad, Trabajo en
                Equipo
              </p>
            </SectionText>
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
