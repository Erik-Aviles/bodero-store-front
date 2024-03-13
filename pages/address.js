import CategoriesComponent from "@/components/CategoriesComponent";
import { LocationIcon } from "@/components/Icons";
import { black, white } from "@/lib/colors";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import Title from "@/components/Title";
import styled from "styled-components";
import Map from "@/components/Map";
import Head from "next/head";
import { CenterSecction } from "@/components/StylesComponents/CenterSecction";

const CenterDiv = styled.section`
  ${CenterSecction}
`;

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 1.5fr;
  gap: 40px;
  margin: 20px 0 80px;
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;
const AddressWrapper = styled.aside`
  padding: 20px;
  background-color: ${black};
  color: ${white};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 0.9rem;
  figure,
  p {
    margin: 0;
    line-height: 24px;
  }
  @media screen and (max-width: 768px) {
    flex-direction: row;
    order: 2;
  }
`;

const MapWrapper = styled.div`
  height: 100%;
  width: 100%;
  border: 1px solid rgba(132, 135, 137, 0.1);
`;
export default function address({ categories }) {
  return (
    <>
      <Head>
        <title>B.R.D | Cómo llegar</title>
        <meta
          name="description"
          content="Ubicada en Quevedo, Av. Walter Andrade y calle primera, esquina "
        />
      </Head>
      <main>
        <CategoriesComponent categories={categories} />
        <CenterDiv>
          <Title>Tienda Física</Title>
          <ColumnsWrapper>
            <AddressWrapper>
              <figure>
                <LocationIcon />
              </figure>
              <p>
                Av. Walter Andrade y calle primera esquina. Frente al parque El
                Velero. Preguntar en el Taller de motos "BODERO RACING
                DEVELOPMENT"
              </p>
            </AddressWrapper>
            <MapWrapper>
              <Map />
            </MapWrapper>
          </ColumnsWrapper>
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
