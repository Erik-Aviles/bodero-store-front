import styled from 'styled-components'
import {
  black,
  grey,
  greylight,
  primary,
  success,
  white,
  white2,
} from '@/lib/colors'
import ProductImages from '@/components/ProductImages'
import CompatibilityModal from '@/components/CompatibilityModal'
import BackButton from '@/components/buttonComponents/BackButton'
import { CenterSecction } from '@/components/stylesComponents/CenterSecction'
import Layout from '@/components/Layout'
import { FlexStyled } from '@/components/stylesComponents/Flex'
import { useContext } from 'react'
import { AddToCartIcon, RemoveFromCartIcon } from '@/components/Icons'
import { CartContext } from '@/context/CartContext'
import useProduct from '@/hooks/useProduct'
import { useRouter } from 'next/router'
import Text from '@/components/stylesComponents/HighlightedText'
import AddRemoveCart from '@/components/cart/AddRemoveCart'

const CenterDiv = styled.section`
  ${CenterSecction}
`

const ColWrapper = styled.div`
  font-size: 1rem;
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 640px) {
    padding: 0 20px;
  }
  @media screen and (min-width: 768px) {
    max-width: 1000px;
    margin: 0 auto;
    grid-template-columns: repeat(2, 1fr);
  }
`

const Title = styled.h2`
  font-size: 1rem;
  font-weight: 700;
  margin: 0 0 5px;
  color: ${primary};
  @media screen and (min-width: 640px) {
    font-size: 1.3rem;
  }
`

const Row = styled.div`
  display: flex;
  flex-direction: column;
  aling-items: center;
  padding: 0 20px 20px;
`

const InfoText = styled.p`
  margin: 0;
  padding: 0.8rem 0;
  border-top: 1px solid;
  border-bottom: 1px solid;
  border-color: ${greylight};
  color: ${grey};
  line-height: 1rem;
`
const InfoTitle = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 0.8rem;
  span {
    color: ${grey};
    font-size: 12px;
    strong {
      margin-right: 5px;
    }
  }
`
const Info = styled.div`
  display: flex;
  aling-items: center;
  justify-content: space-between;
  padding: 0.8rem 0;
  gap: 10px;
  border-bottom: 1px solid;
  border-color: ${greylight};
  span {
    place-self: center;
  }
  strong {
    font-size: 0.9rem;
  }
  div {
    display: flex;
    gap: 10px;
  }
  @media screen and (max-width: 780px) {
    flex-direction: column;
  }
`

const Price = styled.span`
  font-size: 1rem;
  font-weight: 600;
`
const WrapperButtons = styled.section`
  margin: 20px 0;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  gap: 8px;
`

const ButtonCard = styled.button`
  border: none;
  background-color: ${black};
  color: ${white};
  border-radius: 0.275rem;
  padding: 0.45rem;
  font-size: 0.6rem;
  font-weight: 500;
  &:hover {
    background-color: #5e5b5b;
    cursor: pointer;
  }
  &:active {
    background-color: ${success};
  }
  &:disabled {
    &:active {
      background: #5e5b5b;
    }
    &:hover {
      cursor: no-drop;
    }
  }
`

export default function ProductPage() {
  const { addProduct, cartProducts, removeOneProduct, removeProduct } =
    useContext(CartContext)
  const router = useRouter()
  const { id } = router.query
  const { product, isLoading, isError } = useProduct(id)

  const checkProductInCart = (product) => {
    return cartProducts.some((item) => item === product)
  }
  const isProductInCart = checkProductInCart(product?._id)

  const handleGoBack = (e) => {
    e.preventDefault()
    router.back()
  }

  return (
    <Layout
      title={
        isLoading
          ? 'B.R.D | Cargando...'
          : `B.R.D | ${product?.title?.toUpperCase() || 'Producto Sin Título'}`
      }
      sity={`/products/${product?._id || ''}`}
    >
      <CenterDiv>
        <FlexStyled>
          <BackButton onClick={handleGoBack} /> <Text>Volver</Text>
        </FlexStyled>
        <ColWrapper>
          <Row>
            <ProductImages
              images={product?.images}
              name={product?.title}
              isLoading={isLoading}
            />
          </Row>
          <Row>
            <InfoTitle>
              <Title>{product?.title.toUpperCase()}</Title>
              <span>
                <strong>Código:</strong>
                {product?.code}
              </span>
            </InfoTitle>
            <InfoText>{product?.description}</InfoText>
            <Info>
              <div>
                <span style={{ color: success, fontSize: 20 }}>
                  Precio Venta:
                </span>
                <Price>${product?.salePrice}</Price>
              </div>
            </Info>
            <Info>
              <div>
                <span style={{ color: grey, fontSize: 16 }}>
                  Disponibilidad:
                </span>
                <span>
                  <strong>{product?.quantity}</strong>
                </span>
              </div>
              <div>
                <span style={{ color: grey, fontSize: 16 }}>Marca:</span>
                <span>
                  <strong>{product?.brand}</strong>
                </span>
              </div>
            </Info>

            <WrapperButtons>
              <CompatibilityModal product={product} />
              <ButtonCard
                disabled={product?.quantity === 0 ? true : false}
                style={{
                  backgroundColor: isProductInCart ? success : null,
                }}
                title={
                  isProductInCart ? 'Elimina del carrito' : 'Agregar al carrito'
                }
                onClick={() =>
                  isProductInCart
                    ? removeOneProduct(product._id)
                    : addProduct(product._id)
                }
              >
                {isProductInCart ? <RemoveFromCartIcon /> : <AddToCartIcon />}
              </ButtonCard>
              <AddRemoveCart
                product={product}
                cartProducts={cartProducts}
                addProduct={addProduct}
                removeProduct={removeProduct}
              />
            </WrapperButtons>
          </Row>
        </ColWrapper>
      </CenterDiv>
    </Layout>
  )
}

/* export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;
  const product = await Product.findById(id);

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}
 */
