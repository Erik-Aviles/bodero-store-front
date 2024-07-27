import Text from "../stylesComponents/HighlightedText";
import { BsArrowRight } from "react-icons/bs";
import styled from "styled-components";
import { success } from "@/lib/colors";
import Link from "next/link";
import React from "react";

const FlexLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    fill: ${success};
  }
`;

const GoButton = ({ href }) => {
  return (
    <FlexLink href={href}>
      <Text $big={1}>Ver Todos</Text>
      <BsArrowRight />
    </FlexLink>
  );
};

export default GoButton;
