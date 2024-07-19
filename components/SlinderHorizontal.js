import { NextArrow, PrevArrow } from "./buttonComponents/Arrows";
import Text from "./stylesComponents/HighlightedText";
import { greylight, primary } from "@/lib/colors";
import { useEffect, useState } from "react";
import { ProductBox } from "./ProductBox";
import styled from "styled-components";
import { Loader } from "./Loader";
import Slider from "react-slick";

const HorizontalSliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
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

const BreadCrumb = styled.span`
  padding-left: 10px;
  display: flex;
  align-items: center;
  gap: 4px;
  @media screen and (min-width: 640px) {
    padding: 0;
  }
`;

export default function SlinderHorizontal({ products, isLoading }) {
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
    setProgress(100 / (products?.length - slideToShow + 1));
    setSlideCounter(slideToShow);
  }, [products?.length, slideToShow]);

  const settings = {
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: slideToShow,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slideToShow: 5,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slideToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slideToShow: 3,
        },
      },
      {
        breakpoint: 540,
        settings: {
          slideToShow: 2,
        },
      },
      {
        breakpoint: 280,
        settings: {
          slideToShow: 1,
        },
      },
    ],
    afterChange: (current) => {
      setProgress((100 / (products?.length - slideToShow + 1)) * (current + 1));
      setSlideCounter(slideToShow + current);
    },
  };

  return (
    <HorizontalSliderContainer>
      <BreadCrumb>
        <Text>Utimos productos incluidos: </Text>
        <Text $big>{slideCounter}</Text>
        <Text>de</Text>
        <Text $big>{isLoading ? <Loader /> : products.length}</Text>
        <Text>Productos.</Text>
      </BreadCrumb>{" "}
      <SliderContainer>
        <Slider {...settings}>
          {products?.length > 0 &&
            products.map((product) => (
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
