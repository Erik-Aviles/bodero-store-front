import styled from "styled-components";
import AsideInfoAccount from "./AsideInfoAccount";

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 1.5fr;
  gap: 40px;
  margin: 20px 0 80px;
`;
export default function Layout({ children }) {
  return (
    <ColumnsWrapper>
      <AsideInfoAccount />
      {children}
    </ColumnsWrapper>
  );
}
