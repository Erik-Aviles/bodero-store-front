import styled, { css } from "styled-components";
import { grey } from "@/lib/colors";

const StyleTable = styled.table`
  width: 100%;
  th {
    text-align: left;
    text-transform: uppercase;
    color: ${grey};
    font-weight: 600;
    font-size: 0.65rem;
    @media screen and (min-width: 768px) {
      font-size: 0.8rem;
    }
  }
  td {
    font-size: 10px;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    ${(props) =>
      props.$space &&
      css`
        width: 100px;
      `};
    @media screen and (min-width: 768px) {
      font-size: 0.8rem;
    }
  }
`;
export default function Table(props) {
  return <StyleTable {...props} />;
}
