import styled from "styled-components";
import AsideInfoAccount from "./AsideInfoAccount";

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.4fr;
  gap: 40px;
  margin: 40px 0 80px;
`;
export default function Layout({ children }) {
  return (
    <ColumnsWrapper>
      <AsideInfoAccount />
      {children}
    </ColumnsWrapper>
  );
}
