import styled from "styled-components";
import Center from "./Center";
import Title from "./Title";
import { BackgroundColor, black, primary, white } from "@/lib/colors";

const brands = [
  {
    name: "Honda",
    src: "https://www.hondamotovalencia.es/wp-content/uploads/2018/10/favicon-honda-moto-valencia.png",
  },
  {
    name: "Bajab",
    src: "https://assets.ducati.com/dist/0.15.0/assets/img/ducati_id.png",
  },
  {
    name: "Suzuki",
    src: "https://assets.ducati.com/dist/0.15.0/assets/img/ducati_id.png",
  },
  {
    name: "KTM",
    src: "https://assets.ducati.com/dist/0.15.0/assets/img/ducati_id.png",
  },
  {
    name: "IGM",
    src: "https://assets.ducati.com/dist/0.15.0/assets/img/ducati_id.png",
  },
  {
    name: "Benelli",
    src: "https://assets.ducati.com/dist/0.15.0/assets/img/ducati_id.png",
  },
  {
    name: "Kawasaki",
    src: "https://assets.ducati.com/dist/0.15.0/assets/img/ducati_id.png",
  },
  {
    name: "Yamaha",
    src: "https://assets.ducati.com/dist/0.15.0/assets/img/ducati_id.png",
  },
  {
    name: "Oromoto",
    src: "https://assets.ducati.com/dist/0.15.0/assets/img/ducati_id.png",
  },
  {
    name: "Ducati",
    src: "https://assets.ducati.com/dist/0.15.0/assets/img/ducati_id.png",
  },
];

const Wrapper = styled.section`
  background-image: url("https://yamaha-motor.com/images/mock-homepage/homepage_bu_1.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  height: 100vh;
  h2 {
    color: ${white};
    padding-top: 20px;
  }
`;
const BrandsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 15px;
  padding: 30px 0;
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
  color: ${primary};
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
