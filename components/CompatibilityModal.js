import React, { useState } from "react";
import styled from "styled-components";
import { black, grey, success, white } from "@/lib/colors";

const StyledDiv = styled.div`
  height: 80vh;
`;
const WrapperButton = styled.section`
  margin: 20px 0;
`;

const ModalBackground = styled.div`
  position: fixed;
  inset: 0;
  z-index: 10;
  background-color: rgba(37, 37, 37, 0.5);
`;

const ModalContainer = styled.div`
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const ModalContent = styled.div`
  overflow: hidden;
  border-radius: 0.5rem;
  background-color: #fff;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  width: 90vw;
  max-width: 40rem;
`;

const ModalHeader = styled.div`
  position: relative;
  padding: 1.5rem 1.5rem 0;
`;

const ModalTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  span {
    color: ${success};
    padding-left: 10px;
  }
`;

const ModalBody = styled.article`
  padding: 1.5rem;
  p {
    color: ${black};
    span {
      color: ${grey};
    }
  }
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  background-color: #f7fafc;
  padding: 1rem;
`;

const ModalButton = styled.button`
  border: 1px solid ${(props) => (props.primary ? "#3182ce" : "#d2d6dc")};
  background-color: ${(props) => (props.primary ? "#3182ce" : "#fff")};
  color: ${(props) => (props.primary ? "#fff" : "#4a5568")};
  border-radius: 0.375rem;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    border-color: ${black};
    background-color: ${black};
    color: ${white};
  }
`;

const CompatibilityModal = ({ product }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <StyledDiv>
      <div>
        <WrapperButton>
          <ModalButton onClick={toggleModal}>Compatibilidad</ModalButton>
        </WrapperButton>
        {showModal && (
          <>
            <ModalBackground onClick={toggleModal} />
            <ModalContainer>
              <ModalContent>
                <ModalHeader>
                  <ModalTitle>
                    Compatibilidad de:
                    <span>{product.title.toUpperCase()}</span>
                  </ModalTitle>
                </ModalHeader>
                <ModalBody>
                  <p>
                    This is some
                    <br /> <span>scrolling</span>
                  </p>
                  <p>
                    This is some: <span>scrolling</span>
                  </p>
                  <p>
                    This is some= <span>scrolling</span>
                  </p>
                  <p>
                    This is some <span>scrolling</span>
                  </p>
                </ModalBody>
                <ModalFooter>
                  <ModalButton primary={1} onClick={toggleModal}>
                    Cerrar
                  </ModalButton>
                </ModalFooter>
              </ModalContent>
            </ModalContainer>
          </>
        )}
      </div>
    </StyledDiv>
  );
};

export default CompatibilityModal;
