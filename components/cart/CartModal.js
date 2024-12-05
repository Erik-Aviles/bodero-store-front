import React from 'react'
import TableCart from './TableCart'
import ButtonLink from '../buttonComponents/ButtonLink'
import styled, { css } from 'styled-components'
import ButtonClose from '../buttonComponents/ButtonClose'

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 10;
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  opacity: ${({ $isOpen }) => ($isOpen ? '1' : '0')};
  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
`

const WrapperdDopDown = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: initial;
  height: 100%;
  background-color: #ffffff;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.2);
  transform: translateX(100%);
  transition: transform 0.3s ease-in-out;

  ${({ $isOpen }) =>
    $isOpen &&
    css`
      transform: translateX(0);
    `}
`

const WrapperCart = styled.div`
  position: relative;
  margin: 20px;
  padding-buttom: 20px;
`
const WrapperTableCart = styled.section`
  padding: 20px;
  overflow: overlay;
  max-height: calc(100vh - 122px);
`

const WrapperButtonCart = styled.div`
  padding: 1rem;
  width: 100%;
  display: flex;
  gap: 20px;
`
const CartModal = ({ isOpen, toggleModal }) => {
  return (
    <Wrapper $isOpen={isOpen} onClick={toggleModal}>
      <WrapperdDopDown $isOpen={isOpen} onClick={(e) => e.stopPropagation()}>
        <WrapperCart>
          <ButtonClose onClick={toggleModal} />
        </WrapperCart>
        <WrapperTableCart>
          <TableCart />
        </WrapperTableCart>
        <WrapperButtonCart>
          <ButtonLink
            onClick={toggleModal}
            href={'/categories'}
            $black={1}
            $outline={1}
            $block={1}
          >
            Seguir comprando
          </ButtonLink>
          <ButtonLink
            onClick={toggleModal}
            href={'/carrito-de-compras'}
            $black
            $block={1}
          >
            Ver Carrito
          </ButtonLink>
        </WrapperButtonCart>
      </WrapperdDopDown>
    </Wrapper>
  )
}
export default CartModal
