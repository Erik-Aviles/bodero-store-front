import {
  black,
  blacklight,
  error,
  grey,
  greylight,
  primary,
  success,
  white,
} from "@/lib/colors";
import React, { useState } from "react";
import styled from "styled-components";

const StyledDiv = styled.div``;

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
  max-width: 40rem;
`;

const ModalHeader = styled.div`
  position: relative;
  padding: 1.5rem 1.5rem 0;
`;

const ModalTitle = styled.h3`
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  span {
    color: ${success};
    padding-left: 10px;
  }
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 1rem;
  font-size: 0.8rem;
`;
const ModalArticle = styled.article`
  padding: 0.5rem;
  margin: 0;
  border: 1px solid ${greylight};
  border-radius: 0.5rem;
`;
const ModalTextCompatibily = styled.p`
  margin: 0 0 4px;
  color: ${primary};
`;
const ModalListCompatibily = styled.span`
  color: ${grey};
  margin: 0;
  font-size: 0.8rem;
  word-break: break-all;
  display: flex;
  flex-direction: column;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  background-color: #f7fafc;
  padding: 1rem;
`;

const ModalButton = styled.button`
  border: 1px solid ${(props) => (props.$primary ? `${error}` : `${greylight}`)};
  background-color: ${(props) => (props.$primary ? `${error}` : `${white}`)};
  color: ${(props) => (props.$primary ? `${white}` : `${blacklight}`)};
  border-radius: 0.275rem;
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
                  {product.compatibility.length > 0 &&
                    product.compatibility.map((item, index) => (
                      <div key={index}>
                        <ModalArticle>
                          <ModalTextCompatibily>
                            {item.title.toUpperCase()}
                          </ModalTextCompatibily>

                          {Array.isArray(item.model) ? (
                            item.model.map((model, index) => (
                              <ModalListCompatibily key={index}>
                                {model}
                              </ModalListCompatibily>
                            ))
                          ) : (
                            <ModalListCompatibily>
                              {item.model.toUpperCase()}
                            </ModalListCompatibily>
                          )}
                        </ModalArticle>
                      </div>
                    ))}
                </ModalBody>
                <ModalFooter>
                  <ModalButton $primary={1} onClick={toggleModal}>
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
