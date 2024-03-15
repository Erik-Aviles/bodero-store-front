import React, { useEffect, useState } from "react";
import Center from "./Center";
import styled, { css } from "styled-components";
import { testimonials } from "@/resource/data";
import { black, grey, white } from "@/lib/colors";
import Title from "./Title";
import Image from "next/image";

const WrapperTestimonial = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 95px;
  padding-top: 100px;
  margin: 0 20px;
  @media screen and (min-width: 768px) {
    padding: 20px 0 60px;
    gap: 20px;
  }
`;

const WrapperArticle = styled.article`
  padding: 20px;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  color: ${grey};
  box-shadow: 1px 4px 20px rgb(0 0 0 / 50%);
  @media screen and (min-width: 768px) {
    width: calc(50% - 20px);
    ${(props) =>
      props.$derecha
        ? css`
            left: calc(50% - 120px);
          `
        : css`
            left: 120px;
          `};
  }
`;

const WrapperAvatar = styled.div`
  position: absolute;
  width: 110px;
  height: 110px;
  border-radius: 50%;
  background-color: ${white};
  top: -75px;
  left: calc(50% - 55px);
  @media screen and (min-width: 768px) {
    width: 150px;
    height: 150px;
    top: 50px;
    ${(props) =>
      props.$$derecha
        ? css`
            left: -135px;
          `
        : css`
            left: calc(100% - 25px);
          `};
  }
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    box-shadow: 1px 4px 20px rgb(0 0 0 / 20%);
  }
`;
const WrapperHeaderTestimonial = styled.header`
  background-color: ${black};
  box-shadow: 1px 4px 20px rgb(0 0 0 / 50%);
  padding: 0 20px;
`;
const TitleTestimonial = styled.h3`
  color: ${white};
`;
const WrapperText = styled.div`
  height: 80px;
  &:hover {
    height: auto;
  }
`;
const Text = styled.p`
  font: small-caption;
  font-size: 0.8rem;
  line-height: 1.2rem;
  height: inherit;
  overflow: hidden;
  margin: 0;
  padding: 10px 0 0;
  cursor: pointer;
`;
const WrapperFooterTestimonial = styled.footer`
  padding: 20px 0 0;
  display: flex;
  justify-content: space-evenly;
`;

const Testimonios = () => {
  return (
    <Center>
      <Title>Testimonios</Title>
      <WrapperTestimonial>
        {testimonials?.length > 0 &&
          testimonials.map(
            ({ id, avatar, name, testimony, socialmedia }, index) => (
              <WrapperArticle key={id} $derecha={index % 2 !== 0 ? 1 : 0}>
                <WrapperAvatar $derecha={index % 2 !== 0 ? 1 : 0}>
                  <Image src={avatar} alt={name} width={100} height={100} />
                </WrapperAvatar>
                <WrapperHeaderTestimonial>
                  <TitleTestimonial>{name}</TitleTestimonial>
                </WrapperHeaderTestimonial>
                <WrapperText>
                  <Text>{testimony}</Text>
                </WrapperText>
                <WrapperFooterTestimonial>
                  {socialmedia?.length > 0 &&
                    socialmedia.map(({ img, name }) => (
                      <Image
                        src={img}
                        key={name}
                        alt={name}
                        width={25}
                        height={25}
                      />
                    ))}
                </WrapperFooterTestimonial>
              </WrapperArticle>
            )
          )}
      </WrapperTestimonial>
    </Center>
  );
};

export default Testimonios;
