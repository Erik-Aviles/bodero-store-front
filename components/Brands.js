import { useData } from '@/hooks/useData'
import cloudinaryLoader from './loaderes/cloudinaryLoader'
import { BackgroundColor, black } from '@/lib/colors'
import Title from './stylesComponents/Title'
import styled from 'styled-components'
import Image from 'next/image'
import { useRouter } from 'next/router'

const Wrapper = styled.section`
  position: relative;
  width: 100%;
  @media screen and (min-width: 640px) {
    height: 100vh;
  }
`

const BackgroundSection = styled.section`
  background-image: ${({ $bgImage }) => `url(${$bgImage})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`

const TitleWrapper = styled.div`
  margin-bottom: auto;
  text-align: center;
`
const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1000px; /* Limita el ancho del contenido */
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
`

const BrandsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(100px, 1fr));
  justify-content: center;
  gap: 10px;

  @media screen and (min-width: 641px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 30px;
  }
`

const StyledCard = styled.button`
  background-color: ${BackgroundColor};
  padding: 10px;
  height: 120px;
  width: 100%;
  max-width: 200px; /* Limitar ancho del card */
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
  margin: auto;
`

const BrandName = styled.h3`
  display: none;
  @media screen and (min-width: 641px) {
    display: block;
    font-weight: normal;
    font-size: 1.5rem;
    margin: 0;
    color: ${black};
    text-decoration: none;
    &:hover {
      font-size: 2rem;
      font-weight: bold;
      color: ${black};
    }
  }
`

export default function Brands() {
  const { company } = useData()
  const brands = company?.brands
  const backgroundImage = company?.backgroundImageBrands?.image

  const router = useRouter()

  const handleSearch = (name) => {
    const normalized = name.toLowerCase()
    if (name) {
      router.push(`/busqueda?q=${normalized}`)
    }
  }

  return (
    <Wrapper>
      <BackgroundSection $bgImage={backgroundImage}>
        <TitleWrapper>
          <Title>Marcas destacadas</Title>
        </TitleWrapper>
        <ContentWrapper>
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
        </ContentWrapper>
      </BackgroundSection>
    </Wrapper>
  )
}
