import React from 'react'
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

const ModalContainer = styled.div`
  position: fixed;
  padding: 20px;
  top: 0;
  right: 0;
  width: 100%;
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
  @media screen and (min-width: 1000px) {
    width: 400px;
  }
`
const AuthHeader = styled.header`
  position: relative;
`
const WrapperCart = styled.div`
  position: relative;
  margin: 20px;
  padding-buttom: 20px;
`
const AuthTitle = styled.h4`
  font-size: 1.2em;
  font-weight: bold;
  margin: 0;
`

const AuthModal = ({ isOpen, toggleModal }) => {
  return (
    <Wrapper $isOpen={isOpen} onClick={toggleModal}>
      <ModalContainer $isOpen={isOpen} onClick={(e) => e.stopPropagation()}>
        <AuthHeader>
          <ButtonClose onClick={toggleModal} />
          <AuthTitle>Mi cuenta</AuthTitle>
        </AuthHeader>
        <p>Contenido de la cuenta en construcción...</p>
      </ModalContainer>
    </Wrapper>
  )
}

export default AuthModal
