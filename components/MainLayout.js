import styled from "styled-components";

const StyledDiv = styled.main`
  min-height: calc(100vh - 244px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainLayout = ({ children }) => {
  return <StyledDiv>{children}</StyledDiv>;
};

export default MainLayout;
