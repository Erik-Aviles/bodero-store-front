import React, { useContext } from "react";
import styled, { css } from "styled-components";
import ButtonClose from "../buttonComponents/ButtonClose";

const WrapperOne = styled.div`
  position: fixed;
  z-index: 3;
  top: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: transparent;
`;
const WrapperTwo = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: 3;
  right: 0;
  background-color: rgb(28 39 48 / 50%);
  backdrop-filter: blur(4px);
`;

const ModalContainert = styled.div`
  position: relative;
  z-index: 4;
  max-height: 90%;
  max-width: 500px;
  border-radius: 5px;
  display: flex;
  padding: 16px 48px;
  background-color: #f7f7f7;
  box-shadow: 0 0 10px rgb(0 0 0 / 30%);
  transform: scale(0.8);
  will-change: transform;
  transition: transform 0.25s ease-in-out;
`;

const AuthModal = ({ toggleAuthModal }) => {
  return (
    <WrapperOne>
      <WrapperTwo />
      <ModalContainert>
        <ButtonClose onClick={toggleAuthModal} />
        Holitas, Estoy en construcción
      </ModalContainert>
    </WrapperOne>
  );
};
export default AuthModal;
