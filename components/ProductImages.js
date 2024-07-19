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
  min-width: 250px;
  min-height: 250px;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${white};
  border: 1px solid ${greylight};
  border-radius: 5px;
  @media screen and (min-width: 480px) {
    min-width: 328.4px;
    min-height: 328.4px;
  }
`;

const BigImage = styled(Image)`
  max-width: 100%;
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
  padding: 5px;
  background-color: ${white};
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

const SmallImage = styled(Image)`
  max-width: 100%;
`;

export default function ProductImages({ images, name, isLoading }) {
  const [activeImage, setActiveImage] = useState(images?.[0]);

  useEffect(() => {
    setActiveImage(images?.length > 0 ? images?.[0] : logo);
  }, [images]);

  return (
    <WhiteBox>
      <BigImageWrapper>
        {isLoading ? (
          <Spinner />
        ) : (
          <BigImage
            loader={activeImage === logo ? localLoader : awsS3Loader}
            src={activeImage}
            alt={name}
            width={300}
            height={300}
          />
        )}
      </BigImageWrapper>
      <ImageButtons>
        {isLoading
          ? images?.map((image) => (
              <ImageButton key={image}>
                <Spinner />
              </ImageButton>
            ))
          : images?.map((image) => (
              <ImageButton
                key={image}
                $actived={image === activeImage}
                onClick={() => setActiveImage(image)}
              >
                <SmallImage
                  loader={image && awsS3Loader}
                  src={image}
                  alt={name}
                  width={70}
                  height={70}
                />
              </ImageButton>
            ))}
      </ImageButtons>
    </WhiteBox>
  );
}
