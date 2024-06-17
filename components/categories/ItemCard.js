import React from "react";
import styled from "styled-components";
import { black, grey, greylight, white } from "@/lib/colors";
import { useRouter } from "next/router";
import Image from "next/image";
import Text from "../stylesComponents/HighlightedText";
import logo from "../../public/logo.jpg";
import cloudinaryLoader from "../loaderes/cloudinaryLoader";
import localLoader from "../loaderes/localLoader";

const ItemInformation = styled.li`
  height: 200px;
  position: relative;
  background-color: ${white};
  padding: 20px;
  white-space: break-spaces;
  overflow: hidden;
  border-radius: 5px;
  box-shadow: 0px 3px 3px rgba(255, 0, 0, 0.5);
  @media screen and (max-width: 768px) {
    border: 1px solid ${greylight};
    outline: 0.2px solid rgba(255, 0, 0, 0.5);
  }
  &:hover {
    color: ${white};
    outline: 0.2px solid rgba(255, 0, 0, 0.5);
    box-shadow: 0px 3px 3px rgba(255, 0, 0, 0.5);
    border-radius: 5px;
  }
  img {
    cursor: pointer;
  }
`;

const StaledDiv = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  gap: 10px;
  flex-direction: column;
  h3 {
    text-align: center;
    text-transform: capitalize;
    white-space: nowrap;
    overflow: hidden;
    cursor: pointer;
    margin: 0;
    padding: 0 0 10px;
    font-weight: 700;
    font-size: 18px;
    color: ${black};
    border-bottom: 1px solid rgba(255, 0, 0, 0.5);
    @media screen and (max-width: 640px) {
      margin: 0;
      font-size: 14px;
    }
  }
  p {
    text-transform: capitalize;
    text-align: center;
    font-size: 12px;
    height: 30px;
    width: 100%;
    margin: 3px 0 0;
    color: ${grey};
  }
  span {
    text-align: center;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const WrapperButton = styled.div`
  text-align: end;
  position: relative;
  z-index: 1;
`;

const ItemImage = styled(Image)`
  width: 100%;
  height: 60px;
  object-fit: scale-down;
`;

const ImagesIContainer = styled.div`
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: ${white};
  color: ${white};
  font-weight: 700;
  margin-right: 10px;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.25);
  @media screen and (max-width: 640px) {
    float: left;
    width: 60px;
    height: 60px;
  }
  @media screen and (min-width: 1024px) {
    float: left;
  }
`;

const ItemCard = ({ item: { _id, name, image, description } }) => {
  const router = useRouter();

  const filterSearchCategory = ({ router, category }) => {
    if (category) {
      router.push(`/categories?category=${category}`);
    }
  };

  const handle = (id) => {
    filterSearchCategory({ router, category: id });
  };
  return (
    <ItemInformation key={_id} title={name.toUpperCase()}>
      <div style={{ height: 60 }}>
        <ItemImage
          loader={!image || image.length === 0 ? localLoader : cloudinaryLoader}
          onClick={() => handle(_id)}
          src={!image || image.length === 0 ? logo : image[0]}
          alt={name.toUpperCase()}
          title={name.toUpperCase()}
          width={250}
          height={250}
        />
      </div>
      <StaledDiv>
        <h3>{name}</h3>
        <p>
          {description
            ? description
            : "Descripción de la categoria en especifica."}
        </p>
        <Text $big={1} onClick={() => handle(_id)}>
          Ver productos
        </Text>
      </StaledDiv>
    </ItemInformation>
  );
};
export default ItemCard;
