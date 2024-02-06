import styled from "styled-components";
import Center from "./Center";
import Title from "./Title";
import { BackgroundColor, black, primary, white } from "@/lib/colors";

const brands = [
  {
    name: "Honda",
    src: "/images/brands/Honda-Logo.png",
  },
  {
    name: "Bajab",
    src: "/images/brands/Bajaj-Logo.png",
  },
  {
    name: "Suzuki",
    src: "/images/brands/Suzuki-Logo.png",
  },
  {
    name: "IGM",
    src: "/images/brands/IGM-Logo.png",
  },
  {
    name: "KTM",
    src: "/images/brands/KTM-Logo.png",
  },
  {
    name: "Benelli",
    src: "/images/brands/Benelli-Logo.png",
  },
  {
    name: "Kawasaki",
    src: "/images/brands/Kawasaki-Logo.png",
  },
  {
    name: "Yamaha",
    src: "/images/brands/Yamaha-Logo.png",
  },

  {
    name: "Ducati",
    src: "/images/brands/Ducati-Logo.png",
  },
];

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
  img {
    width: 50px;
  }
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
          {brands.map((brand) => (
            <StyledCard key={brand.name}>
              <BrandName>{brand.name.toUpperCase()}</BrandName>
              <img src={brand.src} alt={brand.name} title="logo"></img>
            </StyledCard>
          ))}
        </BrandsWrapper>
      </Center>
    </Wrapper>
  );
}
