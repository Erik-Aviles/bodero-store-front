import { useEffect, useState } from "react";
import { greylight, primary } from "@/lib/colors";
import { NextArrow, PrevArrow } from "./Arrows";
import styled from "styled-components";
import ProductBox from "./ProductBox";
import Slider from "react-slick";

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
  const [slideToShow, serSlideToShow] = useState(3);

  const setSlides = () => {
    if (window.innerWidth <= 1280 && window.innerWidth > 1000) {
      serSlideToShow(3);
    } else if (window.innerWidth <= 1000 && window.innerWidth > 600) {
      serSlideToShow(2);
    } else if (window.innerWidth <= 650) {
      serSlideToShow(1);
    }
  };

  useEffect(() => {
    setSlides();
    setProgress(100 / (products.length - slideToShow + 1));
    window.addEventListener("resize", () => {
      setSlides();
    });
  }, []);

  const settings = {
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 540,
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
