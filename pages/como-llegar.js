import { CenterSecction } from '@/components/stylesComponents/CenterSecction'
import BackButton from '@/components/buttonComponents/BackButton'
import { FlexStyled } from '@/components/stylesComponents/Flex'
import Title from '@/components/stylesComponents/Title'
import { LocationIcon } from '@/components/Icons'
import { Loading } from '@/components/Loading'
import { black, white } from '@/lib/colors'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Layout from '@/components/Layout'
import Map from '@/components/Map'
import { useHandleGoBack } from '@/hooks/useHandleGoBack'

const CenterDiv = styled.section`
  ${CenterSecction}
`

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  padding: 10px;
  @media screen and (min-width: 820px) {
    grid-template-columns: 0.5fr 1.5fr;
    padding: 0 60px 60px;
  }
`

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
`

const MapWrapper = styled.div`
  height: 100%;
  width: 100%;
  border: 1px solid rgba(132, 135, 137, 0.1);
`

export default function AddressPage() {
  const handleGoBack = useHandleGoBack()
  const [isUpLoanding, setIsUpLoanding] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsUpLoanding(false)
    }, 1000)
    return () => clearTimeout(timeout)
  }, [])

  if (isUpLoanding) {
    return <Loading />
  }

  return (
    <Layout
      title='B.R.D | Cómo llegar'
      description='Nuestra tienda física se encuentra ubicada en Quevedo, Av. Walter Andrade y calle primera, esquina. Diagonal al parque El Velero.'
      sity='/como-llegar'
    >
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
  )
}
