import { grey } from "@/lib/colors";
import styled from "styled-components";

const StyleTable = styled.table`
  width: 100%;
  th {
    text-align: left;
    text-transform: uppercase;
    color: ${grey};
    font-weight: 600;
    font-size: 0.7rem;
  }
  td {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }
`;
export default function Table(props) {
  return <StyleTable {...props} />;
}
