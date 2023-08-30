import React from "react";
import Center from "./Center";
import { styled } from "styled-components";

const Bg = styled.div`
  background-color: #222;
  color: #ffff;
  padding: 50px 0;
`;

const Title = styled.h1`
  margin: 0;
  font-weight: normal;
`;

const Descp = styled.p`
  color: #aaa;
  font-size: 0.8rem;
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: 40px;
  img {
    max-width: 100%;
  }
`;

const Columns = styled.div`
  display: flex;
  align-items: center;
`;

const Featured = () => {
  return (
    <Bg>
      <Center>
        <Wrapper>
          <Columns>
            <div>
              <Title>Featured</Title>
              <Descp>
                Lorem ipsum is placeholder text commonly used in the graphic,
                print, and publishing industries for previewing layouts and
                visual mockups.
              </Descp>
              <button>Leer mas</button>
              <button>Agregar al carrito</button>
            </div>
          </Columns>
          <Columns>
            <img src="https://bodero-ecommence-admin.s3.amazonaws.com/1693418506765.png" />
          </Columns>
        </Wrapper>
      </Center>
    </Bg>
  );
};

export default Featured;
