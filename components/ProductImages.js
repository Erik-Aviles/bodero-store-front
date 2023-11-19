import { useState } from "react";
import styled from "styled-components";

const BigImage = styled.img`
  max-width: 100%;
  max-heigth: 200px;
`;
const BigImageWrapper = styled.div`
  display: flex;
  justify-content: center;
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
  const [activeImage, setActiveImage] = useState(images?.[0]);
  return (
    <>
      <BigImageWrapper>
        <BigImage src={activeImage} alt="" />
      </BigImageWrapper>
      <ImageButtons>
        {images.map((image) => (
          <ImageButton
            key={image}
            active={image === activeImage}
            onClick={() => setActiveImage(image)}
          >
            <Image src={image} alt="" />
          </ImageButton>
        ))}
      </ImageButtons>
    </>
  );
}
