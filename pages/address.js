import Categories from "@/components/Categories";
import Center from "@/components/Center";
import { LocationIcon } from "@/components/Icons";
import Map from "@/components/Map";
import Title from "@/components/Title";
import { black, grey, white } from "@/lib/colors";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import Head from "next/head";
import styled from "styled-components";

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 1.5fr;
  gap: 40px;
  margin: 20px 0 80px;
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
`;

const MapWrapper = styled.div`
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
        <Categories categories={categories} />
        <Center>
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
