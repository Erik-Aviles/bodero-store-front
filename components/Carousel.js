import { dataCarousel } from "@/resource/carouselData";
import { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import Image from "next/image";

const SliderContainer = styled.div`
  width: 100%;
  position: relative;

  @media screen and (min-width: 780px) {
    margin-bottom: 80px;
  }
`;
const ContainerImages = styled.div`
  overflow: hidden;
`;

const List = styled.ul`
  margin: 0;
  transition: transform 0.8s ease;
`;

const DotsContainer = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: center;
  @media screen and (max-width: 768px) {
    position: relative;
    transform: translate(0%, -30%);
  }
`;
const DotContainerItem = styled.div`
  margin: 8px 3px;
  cursor: pointer;
  font-size: 20px;
  text-align: center;
  ${(props) =>
    props.$active &&
    css`
      background: #ccc;
      width: 20px;
      height: 20px;
      border-radius: 50%;
    `};
`;
const Img = styled(Image)`
  width: 100%;
  height: auto;
  object-fit: contain;
`;

const Carousel = () => {
  const [index, setIndex] = useState(0);
  const dataCarouselLengthRef = useRef(dataCarousel.length);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % dataCarouselLengthRef.current);
    }, 4000);

    return () => clearInterval(intervalId);
  }, []);

  const goToSlide = (slideIndex) => {
    setIndex(slideIndex);
  };

  return (
    <SliderContainer>
      <ContainerImages>
        <List style={{ transform: `translateX(-${index * 100}%)` }}>
          {dataCarousel.map((item, index) => (
            <li key={item.id}>
              {index === 0 ? (
                <Img
                  width={960}
                  height={314}
                  alt={`Promo ${item.id}`}
                  src={item.imgUrl}
                  priority
                />
              ) : (
                <Img
                  width={960}
                  height={314}
                  alt={`Promo ${item.id}`}
                  src={item.imgUrl}
                />
              )}
            </li>
          ))}
        </List>
      </ContainerImages>
      <DotsContainer>
        {dataCarousel.map((_, idx) =>
          idx === index ? (
            <DotContainerItem
              key={idx}
              $active={1}
              onClick={() => goToSlide(idx)}
            >
              &#9865;
            </DotContainerItem>
          ) : (
            <DotContainerItem key={idx} onClick={() => goToSlide(idx)}>
              &#9865;
            </DotContainerItem>
          )
        )}
      </DotsContainer>
    </SliderContainer>
  );
};

export default Carousel;
