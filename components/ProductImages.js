import { useState } from "react";
import styled from "styled-components";

const BigImageWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const BigImage = styled.img`
  max-width: 100%;
  max-heigth: 100%;
  cursor: pointer;
`;
const Image = styled.img`
  max-width: 100%;
  max-heigth: 100%;
`;

const ImageButtons = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  flex-grow: 0;
  gap: 10px;
  margin-top: 10px;
`;

const ImageButton = styled.div`
  border: 2px solid #ccc;
  ${(props) =>
    props.active
      ? `border-color: #ccc;
      `
      : `border-color: transparent;
      `}
  heigth: 40px;
  padding: 2px;
  cursor: pointer;
  border-radius: 5px;
`;

export default function ProductImages({ images }) {
  console.log({ images });
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
