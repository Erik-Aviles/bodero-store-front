import styled, { css } from "styled-components";
import { greylight, success } from "@/lib/colors";
import { useEffect, useState } from "react";
import emptyimage from "../public/images/vacio.png";
import Image from "next/image";
import Spinner from "./Spinner";
import awsS3Loader from "./awsS3Loader";

const BigImageWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  border: 1px solid ${greylight};
  border-radius: 5px;
`;
const BigImage = styled(Image)`
  max-width: 100%;
  height: auto;
  padding: 5px;
`;

const ImageButtons = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 5px;
  margin-top: 10px;
`;

const ImageButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  border: 1px solid ${greylight};
  cursor: pointer;
  border-radius: 5px;
  ${(props) =>
    props.$spinner &&
    css`
      width: 80px;
      height: 80px;
    `}
  ${(props) =>
    props.$actived
      ? `border-color: ${success};
      `
      : `border-color: ${greylight};
      `}
`;

const SmallImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 5px;
`;

export default function ProductImages({ images, name }) {
  const [activeImage, setActiveImage] = useState(
    images?.[0] ? images?.[0] : emptyimage
  );

  const [isUpLoanding, setIsUpLoanding] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsUpLoanding(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <BigImageWrapper>
        <BigImage
          loader={awsS3Loader}
          src={activeImage}
          alt={name}
          width={300}
          height={300}
        />
      </BigImageWrapper>
      <ImageButtons>
        {isUpLoanding
          ? images.map((image) => (
              <ImageButton
                $spinner={1}
                key={image}
                $actived={image === activeImage}
                onClick={() => setActiveImage(image)}
              >
                <Spinner />
              </ImageButton>
            ))
          : images.map((image) => (
              <ImageButton
                key={image}
                $actived={image === activeImage}
                onClick={() => setActiveImage(image)}
              >
                <SmallImage src={image} alt={name} width={100} height={100} />
              </ImageButton>
            ))}
      </ImageButtons>
    </>
  );
}
