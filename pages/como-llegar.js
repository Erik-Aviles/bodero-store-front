import CategoriesComponent from "@/components/CategoriesComponent";
import { LocationIcon } from "@/components/Icons";
import { black, white } from "@/lib/colors";
import Title from "@/components/stylesComponents/Title";
import styled from "styled-components";
import Map from "@/components/Map";
import { CenterSecction } from "@/components/stylesComponents/CenterSecction";
import Layout from "@/components/Layout";
import BackButton from "@/components/buttonComponents/BackButton";
import { FlexStyled } from "@/components/stylesComponents/Flex";
import { DataContext } from "@/context/DataContext";
import { useContext, useEffect, useState } from "react";
import { Loading } from "@/components/Loading";
import { useRouter } from "next/router";

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

export default function AddressPage() {
  const { categories } = useContext(DataContext);
  const router = useRouter();
  const [isUpLoanding, setIsUpLoanding] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsUpLoanding(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  const handleGoBack = (e) => {
    e.preventDefault();
    router.back();
  };

  if (isUpLoanding) {
    return <Loading />;
  }

  return (
    <Layout
      title="B.R.D | Cómo llegar"
      description="Ubicada en Quevedo, Av. Walter Andrade y calle primera, esquina"
    >
      <CategoriesComponent categories={categories} />
      <CenterDiv>
        <FlexStyled>
          <BackButton onClick={handleGoBack} />
          <Title>Tienda Física</Title>
        </FlexStyled>
        <ColumnsWrapper>
          <AddressWrapper>
            <figure>
              <LocationIcon />
            </figure>
            <p>
              Av. Walter Andrade y calle primera esquina. Frente al parque El
              Velero. Preguntar en el Taller de motos &ldquo;BODERO RACING
              DEVELOPMENT&rdquo;
            </p>
          </AddressWrapper>
          <MapWrapper>
            <Map />
          </MapWrapper>
        </ColumnsWrapper>
      </CenterDiv>
    </Layout>
  );
}
