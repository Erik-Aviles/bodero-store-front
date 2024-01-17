import { useState } from "react";
import styled from "styled-components";

const BigImageWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const BigImage = styled.img`
  max-width: 100%;
  height: auto;
`;
const Image = styled.img`
  width: 100px;
`;

const ImageButtons = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 20px;
  margin-top: 10px;
`;

const ImageButton = styled.div`
  width: fit-content;
  heigth: fit-content;
  border: 2px solid #ccc;
  ${(props) =>
    props.active
      ? `border-color: #ccc;
      `
      : `border-color: transparent;
      `}
  heigth: auto;
  padding: 2px;
  cursor: pointer;
  border-radius: 5px;
`;

export default function ProductImages({ images }) {
  const [activeImage, setActiveImage] = useState(images?.[0]);
  return (
    <>
      <BigImageWrapper>
        <BigImage
          src={activeImage}
          alt="Imagen referencial"
          title="Ver imagen en grande"
        />
      </BigImageWrapper>
      <ImageButtons>
        {images.map((image) => (
          <ImageButton
            key={image}
            active={image === activeImage}
            onClick={() => setActiveImage(image)}
          >
            <Image src={image} alt="Imagen referencial" />
          </ImageButton>
        ))}
      </ImageButtons>
    </>
  );
}
