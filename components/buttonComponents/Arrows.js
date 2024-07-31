import { LeftArrowIcon, RightArrowIcon } from "../Icons";
import styled from "styled-components";

const ContainerArrow = styled.button`
  position: absolute;
  bottom: -40px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 1px solid ${({ $borderColor }) => $borderColor || "transparent"};
  background-color: ${({ $bgColor }) => $bgColor || "transparent"};
  border-radius: 50%;
  z-index: 2;
  cursor: pointer;

  svg {
    fill: ${({ fill }) => fill || "currentColor"};
    width: 20px;
    height: 20px;
  }
  &:hover,
  &:focus {
    background-color: ${({ $hoverBgColor }) => $hoverBgColor || "transparent"};
    border-color: ${({ $hoverBorderColor }) =>
      $hoverBorderColor || "transparent"};
    svg {
      fill: ${({ $hoverFill }) => $hoverFill || "currentColor"};
      width: 15px;
      height: 15px;
    }
  }

  &.prev {
    left: 8px;
  }

  &.next {
    right: 8px;
  }

  @media screen and (min-width: 640px) {
    top: 50%;
    transform: translateY(-50%);
    &:hover,
    &:focus {
      background-color: ${({ $hoverBgColor }) => $hoverBgColor || "black"};
      border-color: ${({ $hoverBorderColor }) => $hoverBorderColor || "white"};
      svg {
        width: 15px;
        height: 15px;
      }
    }
    &.prev {
      left: 0;
    }

    &.next {
      right: 0;
    }
  }
`;

export const PrevArrow = ({
  fill,
  hoverFill,
  bgColor,
  hoverBgColor,
  borderColor,
  hoverBorderColor,
  onClick,
}) => {
  return (
    <ContainerArrow
      className="prev"
      onClick={onClick}
      fill={fill}
      $hoverFill={hoverFill}
      $bgColor={bgColor}
      $hoverBgColor={hoverBgColor}
      $borderColor={borderColor}
      $hoverBorderColor={hoverBorderColor}
    >
      <LeftArrowIcon />
    </ContainerArrow>
  );
};

export const NextArrow = ({
  fill,
  hoverFill,
  bgColor,
  hoverBgColor,
  borderColor,
  hoverBorderColor,
  onClick,
}) => {
  return (
    <ContainerArrow
      className="next"
      onClick={onClick}
      fill={fill}
      $hoverFill={hoverFill}
      $bgColor={bgColor}
      $hoverBgColor={hoverBgColor}
      $borderColor={borderColor}
      $hoverBorderColor={hoverBorderColor}
    >
      <RightArrowIcon />
    </ContainerArrow>
  );
};
