import React from "react";
import styled from "styled-components";

const StyledSection = styled.section`
  padding-top: 6rem;
`;

const StyledContainer = styled.div`
  margin: 0 auto;
`;

const StyledHeading = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
`;

const Loading = () => {
  return (
    <StyledSection>
      <StyledContainer>
        <StyledHeading>Loading...</StyledHeading>
      </StyledContainer>
    </StyledSection>
  );
};

export default Loading;
