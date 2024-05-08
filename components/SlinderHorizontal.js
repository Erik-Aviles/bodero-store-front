import { useEffect, useState } from "react";
import { greylight, primary } from "@/lib/colors";
import { NextArrow, PrevArrow } from "./buttonComponents/Arrows";
import styled from "styled-components";
import Slider from "react-slick";
import { ProductBox } from "./ProductBox";

const HorizontalSliderContainer = styled.div`
  width: 100%;
  margin: 30px 0 60px;
  z-index: 10px;
`;

const SliderContainer = styled.div`
  position: relative;
`;
const ProgressContainer = styled.div`
  background-color: ${greylight};
  height: 2px;
  width: 250px;
  position: absolute;
  top: 0px;
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

export default function SlinderHorizontal({ products }) {
  const [progress, setProgress] = useState(0);
  const [slideToShow, serSlideToShow] = useState(5);

  const setSlides = () => {
    if (window.innerWidth <= 1280 && window.innerWidth > 1000) {
      serSlideToShow(5);
    } else if (window.innerWidth <= 1000 && window.innerWidth > 600) {
      serSlideToShow(3);
    } else if (window.innerWidth <= 650) {
      serSlideToShow(2);
    }
  };

  useEffect(() => {
    setSlides();
    setProgress(100 / (products.length - slideToShow + 1));
    window.addEventListener("resize", () => {
      setSlides();
    });
  }, [products.length]);

  const settings = {
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 540,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 280,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
    afterChange: (current) => {
      setProgress((100 / (products.length - slideToShow + 1)) * (current + 1));
    },
  };

  return (
    <HorizontalSliderContainer>
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
