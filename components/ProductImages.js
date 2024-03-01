import { greylight, success } from "@/lib/colors";
import { useState } from "react";
import styled from "styled-components";

const BigImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  border: 1px solid ${greylight};
  border-radius: 5px;
`;
const BigImage = styled.img`
  max-width: 100%;
  height: auto;
`;
const Image = styled.img`
  width: 100%;
  border-radius: 5px;
`;

const ImageButtons = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 5px;
  margin-top: 10px;
`;

const ImageButton = styled.div`
  width: fit-content;
  border: 1px solid ${greylight};
  cursor: pointer;
  border-radius: 5px;
  ${(props) =>
    props.$actived
      ? `border-color: ${success};
      `
      : `border-color: ${greylight};
      `}
`;

export default function ProductImages({ images }) {
  const [activeImage, setActiveImage] = useState(images?.[0]);
  return (
    <>
      <BigImageWrapper>
        <BigImage src={activeImage} alt="Producto" />
      </BigImageWrapper>
      <ImageButtons>
        {images.map((image) => (
          <ImageButton
            key={image}
            $actived={image === activeImage}
            onClick={() => setActiveImage(image)}
          >
            <Image src={image} alt="Producto" />
          </ImageButton>
        ))}
      </ImageButtons>
    </>
  );
}
