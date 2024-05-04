import styled from "styled-components";
import Center from "./stylesComponents/Center";
import Title from "./stylesComponents/Title";
import { BackgroundColor, black } from "@/lib/colors";
import { brands } from "@/resource/testimonialsData";
import Image from "next/image";
import backgroundBrand from "../public/images/brands/background.jpg";

const Wrapper = styled.section`
  position: relative;
  h2 {
    padding-top: 20px;
    position: relative;
  }
  @media screen and (min-width: 640px) {
    height: 100vh;
  }
`;
const BrandsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  justify-content: center;
  gap: 30px;
  padding: 20px 0;
  @media screen and (max-width: 640px) {
    padding: 20px 20px;
    gap: 10px;
  }
`;

const StyledCard = styled.article`
  position: relative;
  background-color: ${BackgroundColor};
  padding: 10px;
  height: 120px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  border-radius: 5px;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.2);
  cursor: pointer;

  &:hover h3 {
    font-size: 2rem;
    font-weight: bold;
    color: ${black};
  }
`;

const BrandName = styled.h3`
  font-weight: normal;
  font-size: 1.5rem;
  margin: 0;
  color: ${black};
  text-decoration: none;
`;

export default function Brands() {
  return (
    <Wrapper>
      <Image
        alt="Imagen de fondo De un paisaje"
        src={backgroundBrand}
        layout="fill"
      />
      <Center>
        <Title>Marcas destacadas</Title>
        <BrandsWrapper>
          {brands?.map(({ id, name, src }) => (
            <StyledCard key={id}>
              <BrandName>{name.toUpperCase()}</BrandName>
              <Image src={src} alt={name} width={50} height={50} />
            </StyledCard>
          ))}
        </BrandsWrapper>
      </Center>
    </Wrapper>
  );
}
