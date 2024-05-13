import styled, { css } from "styled-components";

export const FlexStyled = styled.section`
  display: Flex;
  align-items: center;
  gap: 10px;
  padding: 10px 0;
  ${(props) =>
    props.$center &&
    css`
      justify-content: center;
    `};
  ${(props) =>
    props.$cart &&
    css`
      align-items: start;
    `};
  ${(props) =>
    props.$between &&
    css`
      justify-content: space-between;
    `};
`;
