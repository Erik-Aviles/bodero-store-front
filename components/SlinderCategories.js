import React, { useState } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import { black, primary } from "@/lib/colors";
import {
  NextArrowCategory,
  PrevArrowCategory,
} from "./buttonComponents/ArrowCat";
import { useRouter } from "next/router";
import { Loader } from "./Loader";

const CategoryBox = styled.div`
  height: auto;
  background-color: ${black};
  cursor: pointer;
  text-align: center;
  &:hover {
    background: ${primary};
  }
  p {
    margin: 15px 0;
    padding: 0 10px;
    font-size: 12px;
    color: #fff;
  }
`;

const SlinderCategories = ({ categories, isLoading }) => {
  const [category, setCategory] = useState("");

  const router = useRouter();

  const filterSearchCategory = ({ router, category }) => {
    if (category) {
      router.push(`/categories?category=${category}`);
    }
  };

  const handle = (id) => {
    setCategory(id);
    filterSearchCategory({ router, category: id });
  };
  const settings = {
    arrows: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 9,
    slidesToScroll: 3,
    nextArrow: <NextArrowCategory />,
    prevArrow: <PrevArrowCategory />,
  };

  return (
    <Slider {...settings}>
      {categories?.categories &&
        categories.categories.map((item) =>
          isLoading ? (
            <Loader key={item._id} />
          ) : (
            <CategoryBox
              key={item._id}
              title={item.name}
              value={category}
              onClick={() => handle(item._id)}
            >
              <p>{item.name.toUpperCase()}</p>
            </CategoryBox>
          )
        )}
    </Slider>
  );
};

export default SlinderCategories;
