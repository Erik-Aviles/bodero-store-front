import { black, primary } from "@/lib/colors";
import React, { useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { Loader } from "./Loader";
import Slider from "react-slick";

const CategoryBox = styled.div`
  &:hover {
    background: ${primary};
    cursor: pointer;
  }
  p {
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
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
    className: "center",
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 3,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
    ],
  };

  return (
    <div className="slider-container">
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
    </div>
  );
};

export default SlinderCategories;
