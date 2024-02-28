import { white } from "@/lib/colors";
import styled from "styled-components";

const WhiteBox = styled.div`
  heigth: 500px;
  background-color: ${white};
  border-radius: 10px;
  padding: 0 20px;
  @media screen and (min-width: 768px) {
    padding: 0 20px 20px 0;
  }
`;

export default WhiteBox;
