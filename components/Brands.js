import styled from "styled-components";
import Center from "./Center";
import Title from "./Title";
import { BackgroundColor, black, white } from "@/lib/colors";
import { brands } from "@/resource/data";
import Image from "next/image";

const Wrapper = styled.section`
  background-image: url("https://yamaha-motor.com/images/mock-homepage/homepage_bu_1.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  height: auto;
  h2 {
    color: ${white};
    padding-top: 20px;
  }
`;
const BrandsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  justify-content: center;
  gap: 10px;
  padding: 20px 0;
  @media screen and (max-width: 640px) {
    padding: 20px 20px;
  }
`;

const StyledCard = styled.article`
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
