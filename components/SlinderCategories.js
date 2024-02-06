import React, { useState } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import Center from "./Center";
import { black, primary, white } from "@/lib/colors";
import { NextArrowCategory, PrevArrowCategory } from "./ArrowCat";
import { useRouter } from "next/router";

const HorizontalSliderContainer = styled.div`
  width: 85%;
  position: relative;
  @media screen and (max-width: 767px) {
    display: none;
  }
`;

const SliderContainer = styled.div`
  width: 100%;
  position: relative;
`;
const CategoryBox = styled.div`
  background-color: ${black};
  text-align: center;
  cursor: pointer;
  P {
    color: ${white};
    margin: 14px 0;
    font-size: 14px;
    &:hover {
      color: ${primary};
    }
  }
`;

const SlinderCategories = ({ categories }) => {
  const [category, setCategory] = useState("");

  const router = useRouter();

  const filterSearchCategory = ({ router, category }) => {
    const query = router.query;
    if (category) {
      query.category = category;
      router.push({
        pathname: "/categories",
        query: query,
      });
    }
  };

  const handle = (id) => {
    setCategory(id);
    filterSearchCategory({ router, category: id });
  };
  const settings = {
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <NextArrowCategory />,
    prevArrow: <PrevArrowCategory />,
  };

  return (
    <Center>
      <HorizontalSliderContainer>
        <SliderContainer>
          <Slider {...settings}>
            {categories?.length > 0 &&
              categories.map((item, index) => (
                <CategoryBox
                  key={index}
                  text={item.name}
                  value={category}
                  onClick={() => handle(item._id)}
                >
                  <p>{item.name.toUpperCase()}</p>
                </CategoryBox>
              ))}
          </Slider>
        </SliderContainer>
      </HorizontalSliderContainer>
    </Center>
  );
};

export default SlinderCategories;
