import styled, { css } from "styled-components";
import { greylight, success, white } from "@/lib/colors";
import { useEffect, useState } from "react";
import logo from "../public/logo.jpg";
import Image from "next/image";
import Spinner from "./Spinner";
import awsS3Loader from "./loaderes/awsS3Loader";
import localLoader from "./loaderes/localLoader";

const WhiteBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  @media screen and (max-width: 640px) {
    flex-direction: column;
    padding: 0 20px;
  }
  img {
    object-fit: contain;
  }
`;

const BigImageWrapper = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
  background-color: ${white};
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
  grid-template-rows: repeat(auto-fill, minmax(70px, 1fr));
  gap: 5px;
  @media screen and (max-width: 640px) {
    grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
  }
`;

const ImageButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 70px;
  outline: 1px solid ${greylight};
  cursor: pointer;
  border-radius: 5px;
  ${(props) =>
    props.$actived
      ? `outline: 1px solid ${success};
      `
      : `outline: 1px solid ${greylight};
      `}
`;

const SmallImage = styled.img`
  max-width: 100%;
  height: auto;
  padding: 5px;
  background-color: ${white};
  border-radius: 5px;
`;

export default function ProductImages({ images, name }) {
  const [activeImage, setActiveImage] = useState(images?.[0]);

  const [isUpLoanding, setIsUpLoanding] = useState(true);

  useEffect(() => {
    setActiveImage(images.length > 0 ? images?.[0] : logo);
  }, [images]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsUpLoanding(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <WhiteBox>
      <BigImageWrapper>
        <BigImage
          loader={activeImage === logo ? localLoader : awsS3Loader}
          src={activeImage}
          alt={name}
          width={300}
          height={300}
        />
      </BigImageWrapper>
      <ImageButtons>
        {isUpLoanding
          ? images.map((image) => (
              <ImageButton key={image}>
                <Spinner />
              </ImageButton>
            ))
          : images.map((image) => (
              <ImageButton
                key={image}
                $actived={image === activeImage}
                onClick={() => setActiveImage(image)}
              >
                <SmallImage src={image} alt={name} width={70} height={70} />
              </ImageButton>
            ))}
      </ImageButtons>
    </WhiteBox>
  );
}
