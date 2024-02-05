import React from "react";
import Slider from "react-slick";
import styled from "styled-components";

const HorizontalSliderContainer = styled.div`
  width: 100%;
  position: relative;
`;

const SliderContainer = styled.div`
  position: relative;
`;

const slinderCategorie = ({ categories }) => {
  const settings = {
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <SliderContainer>
      <Slider {...settings}>
        {categories.map((slide, index) => (
          <div key={index}>
            <Link href={slide.link}>
              <a>
                <img src={slide.image} alt={`Slide ${index + 1}`} />
              </a>
            </Link>
          </div>
        ))}
      </Slider>
    </SliderContainer>
  );
};

export default slinderCategorie;
