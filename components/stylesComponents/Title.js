import styled from "styled-components";

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin: 20px 0;
  @media screen and (max-width: 320px) {
    font-size: 1.8rem;
  }
  @media screen and (max-width: 640px) {
    text-align: center;
    margin-bottom: 0px;
  }
`;

export default Title;
