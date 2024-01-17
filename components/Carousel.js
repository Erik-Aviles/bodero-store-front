import { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import Center from "./Center";

const data = [
  {
    id: 1,
    imgUrl: "/images/slide/slinder1.jpg",
  },
  {
    id: 2,
    imgUrl: "/images/slide/slinder2.jpg",
  },
  {
    id: 3,
    imgUrl: "/images/slide/slinder3.jpg",
  },
  {
    id: 4,
    imgUrl: "/images/slide/slinder4.jpg",
  },
];

const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  max-height: 350px;
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
  z-index: 1;
  transform: translate(0%, -150%);
`;
const DotContainerItem = styled.div`
  margin: 8px 3px;
  cursor: pointer;
  font-size: 20px;
  text-align: center;

  ${(props) =>
    props.active &&
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

const Carousel = () => {
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
                active={1}
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
