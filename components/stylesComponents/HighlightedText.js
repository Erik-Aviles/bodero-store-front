import { grey, secondary, white } from "@/lib/colors";
import styled, { css } from "styled-components";

const Text = styled.span`
  font-size: 0.9rem;
  color: ${grey};
  ${(props) =>
    props.$big &&
    css`
      color: ${secondary};
      font-weight: 500;
    `};
  ${(props) =>
    props.$white &&
    css`
      color: ${white};
      font-weight: 500;
      font-size: 1.3rem;
    `};
  ${(props) =>
    props.$size === "l" &&
    css`
      font-size: 1.2rem;
      padding: 10px 15px;
    `};
  ${(props) =>
    props.$size === "m" &&
    css`
      font-size: 1rem;
      padding: 10px 15px;
    `};
  @media screen and (min-width: 768px) {
    font-size: 1.1rem;
  }
`;

export default Text;
