import { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import Center from "./Center";

const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  max-height: 350px;
  @media screen and (max-width: 480px) {
    margin-bottom: 0;
  }
  @media screen and (max-width: 640px) {
    padding-top: 150.43px;
    margin-bottom: 60px;
  }
`;
const ContainerImages = styled.div`
  width: 100%;
  border-radius: 2px;
  overflow: hidden;
`;

const List = styled.ul`
  transition: transform 0.5s ease;
`;

const DotsContainer = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: center;
  transform: translate(0%, -150%);
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
const Img = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain;
`;

const Carousel = ({ data }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % data.length);
    }, 4000);

    return () => clearInterval(intervalId);
  }, []);

  const goToSlide = (slideIndex) => {
    setIndex(slideIndex);
  };

  return (
    <Center>
      <SliderContainer>
        <ContainerImages>
          <List style={{ transform: `translateX(-${index * 100}%)` }}>
            {data.map((item) => (
              <li key={item.id}>
                <Img src={item.imgUrl} />
              </li>
            ))}
          </List>
        </ContainerImages>
        <DotsContainer>
          {data.map((_, idx) =>
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
    </Center>
  );
};

export default Carousel;
