import styled from "styled-components";

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin: 20px 0;

  @media screen and (max-width: 640px) {
    text-align: center;
    margin: 10px 0;
    font-size: 1.5rem;
  }
`;

export default Title;
