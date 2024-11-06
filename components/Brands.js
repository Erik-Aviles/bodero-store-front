import { useData } from "@/hooks/useData";
import cloudinaryLoader from "./loaderes/cloudinaryLoader";
import { BackgroundColor, black } from "@/lib/colors";
import Center from "./stylesComponents/Center";
import Title from "./stylesComponents/Title";
import styled from "styled-components";
import Image from "next/image";
import { useRouter } from "next/router";

const Wrapper = styled.section`
  position: relative;
  h2 {
    padding-top: 40px;
    position: relative;
  }
  @media screen and (min-width: 640px) {
    height: 100vh;
  }
`;
const BrandsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(100px, 1fr));
  justify-content: center;
  padding: 20px;
  gap: 10px;

  @media screen and (min-width: 641px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 30px;
    padding: 20px 0;
  }
`;

const StyledCard = styled.button`
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
  border: none;
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
  const { company } = useData();
  const brands = company?.brands;
  const backgroundImageBrands = company?.backgroundImageBrands;
  const backgroundImage = backgroundImageBrands?.image;
  const backgroundDescription = backgroundImageBrands?.description;

  const router = useRouter();

  const handleSearch = (name) => {
    const normalized = name.toLowerCase();
    if (name) {
      router.push(`/busqueda?q=${normalized}`);
    }
  };

  return (
    <Wrapper>
      <Image
        loader={cloudinaryLoader}
        alt={backgroundDescription}
        src={backgroundImage}
        layout="fill"
      />
      <Center>
        <Title>Marcas destacadas</Title>
        <BrandsWrapper>
          {brands?.map(({ brandId, name, image }) => (
            <StyledCard key={brandId} onClick={() => handleSearch(name)}>
              <BrandName>{name.toUpperCase()}</BrandName>
              {image ? (
                <Image
                  loader={cloudinaryLoader}
                  src={image}
                  alt={name}
                  width={50}
                  height={50}
                />
              ) : null}
            </StyledCard>
          ))}
        </BrandsWrapper>
      </Center>
    </Wrapper>
  );
}
