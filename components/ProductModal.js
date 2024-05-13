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
import { AllDeleteIcon } from "./Icons";
import Button from "./buttonComponents/Button";

const StyledDiv = styled.div`
  display: block;
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
  border-radius: 0.2rem;
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
  font-size: 0.6rem;
  word-break: break-all;
  display: flex;
  flex-direction: column;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  background-color: #f7fafc;
  padding: 0.4rem 1rem;
`;

const ModalButton = styled.button`
  height: 30px;
  border: 1px solid ${(props) => (props.$primary ? `${error}` : `${greylight}`)};
  background-color: ${(props) => (props.$primary ? `${error}` : `${white}`)};
  color: ${(props) => (props.$primary ? `${white}` : `${black}`)};
  border-radius: 3px;
  padding: 10px 10px;
  font-size: 0.6rem;
  font-weight: 500;
  font-family: "Poppins", sans-serif;
  cursor: pointer;
  &:hover {
    border-color: ${black};
    background-color: ${black};
    color: ${white};
  }
`;

const ProductModal = ({ product }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <StyledDiv>
      <div>
        <Button $primary={1} $outline={1} onClick={toggleModal}>
          COMPATIBILIDAD
        </Button>
        {showModal && (
          <>
            <ModalBackground onClick={toggleModal} />
            <ModalContainer>
              <ModalContent>
                <ModalHeader>
                  <ModalTitle>Compatible con:</ModalTitle>
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
                  <Button $primary={1} onClick={toggleModal}>
                    <AllDeleteIcon />
                  </Button>
                </ModalFooter>
              </ModalContent>
            </ModalContainer>
          </>
        )}
      </div>
    </StyledDiv>
  );
};

export default ProductModal;
