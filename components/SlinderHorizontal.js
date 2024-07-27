import { NextArrow, PrevArrow } from "./buttonComponents/Arrows";
import { grey, greylight, primary, success } from "@/lib/colors";
import GoButton from "./buttonComponents/GoButton";
import styled, { css } from "styled-components";
import { useEffect, useState } from "react";
import { ProductBox } from "./ProductBox";
import { Loader } from "./Loader";
import Slider from "react-slick";

const HorizontalSliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

const SliderContainer = styled.div`
  position: relative;
  margin-bottom: 30px;
`;
const ProgressContainer = styled.div`
  background-color: ${greylight};
  height: 2px;
  width: 250px;
  position: absolute;
  top: -3px;
  right: 0;
`;
const Progress = styled.div`
  background-color: ${primary};
  position: absolute;
  height: 100%;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
`;

const BreadCrumb = styled.div`
  padding-left: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 4px;
  @media screen and (min-width: 640px) {
    padding: 0;
  }
`;

const Text = styled.span`
  font-size: 0.8rem;
  color: ${grey};
  ${(props) =>
    props.$success &&
    css`
      color: ${success};
    `};

  @media screen and (min-width: 768px) {
    font-size: 1.1rem;
  }
`;

export default function SlinderHorizontal({ products, isLoading }) {
  const items = products?.products;
  const itemsSize = products?.result;
  const [progress, setProgress] = useState(1);
  const [slideToShow, setSlideToShow] = useState(5);
  const [slideCounter, setSlideCounter] = useState();

  const setSlides = () => {
    if (window.innerWidth <= 1280 && window.innerWidth > 1000) {
      setSlideToShow(5);
    } else if (window.innerWidth <= 1000 && window.innerWidth > 650) {
      setSlideToShow(4);
    } else if (window.innerWidth <= 650 && window.innerWidth > 540) {
      setSlideToShow(3);
    } else if (window.innerWidth <= 540 && window.innerWidth > 280) {
      setSlideToShow(2);
    } else if (window.innerWidth <= 280) {
      setSlideToShow(1);
    }
  };

  useEffect(() => {
    setSlides();
    window.addEventListener("resize", setSlides);

    return () => {
      window.removeEventListener("resize", setSlides);
    };
  }, []);

  useEffect(() => {
    setProgress(100 / (itemsSize - slideToShow + 1));
    setSlideCounter(slideToShow);
  }, [itemsSize, slideToShow]);

  const settings = {
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: slideToShow,
    slidesToScroll: 1,
    initialSlide: slideToShow,
    nextArrow: (
      <NextArrow
        fill={success}
        hoverFill="white"
        hoverBgColor="black"
        borderColor={success}
        hoverBorderColor="white"
      />
    ),
    prevArrow: (
      <PrevArrow
        fill={success}
        hoverFill="white"
        hoverBgColor="black"
        borderColor={success}
        hoverBorderColor="white"
      />
    ),
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slideToShow: 5,
          initialSlide: slideToShow,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slideToShow: 4,
          initialSlide: slideToShow,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slideToShow: 3,
          initialSlide: slideToShow,
        },
      },
      {
        breakpoint: 540,
        settings: {
          slideToShow: 2,
          initialSlide: slideToShow,
        },
      },
      {
        breakpoint: 280,
        settings: {
          slideToShow: 1,
          initialSlide: slideToShow,
        },
      },
    ],
    afterChange: (current) => {
      setProgress((100 / (itemsSize - slideToShow + 1)) * (current + 1));
      setSlideCounter(slideToShow + current);
    },
  };

  return (
    <HorizontalSliderContainer>
      <BreadCrumb>
        <Text>
          Articulo <Text $success={1}>{slideCounter}</Text> de{" "}
          <Text $success={1}>{isLoading ? <Loader /> : itemsSize}</Text>.
          Productos nuevos.
        </Text>
        <GoButton href="/products" />
      </BreadCrumb>
      <SliderContainer>
        <Slider {...settings}>
          {itemsSize > 0 &&
            items.map((product) => (
              <ProductBox key={product._id} {...product} />
            ))}
        </Slider>
        <ProgressContainer>
          <Progress style={{ width: `${progress}%` }}></Progress>
        </ProgressContainer>
      </SliderContainer>
    </HorizontalSliderContainer>
  );
}
