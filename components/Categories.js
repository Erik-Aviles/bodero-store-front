import { black, white, primary } from "@/lib/colors";
import Link from "next/link";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 45px;
  max-width: 1000px;
  margin: 0 auto 20px;
  color: ${white};
  background-color: ${black};
`;
const StyleNav = styled.nav`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const StaledLink = styled(Link)`
  text-decoration: none;
  cursor: pointer;
  padding: 10px 0;
  color: ${white};
  &:hover {
    border-bottom: 3px solid ${primary};
    color: ${primary};
  }
`;

export default function Categories({ categories }) {
  return (
    <Wrapper>
      <StyleNav>
        {categories?.map((category) => (
          <StaledLink href={"/"} title={category.name} key={category._id}>
            {category.name.toUpperCase()}
          </StaledLink>
        ))}
      </StyleNav>
    </Wrapper>
  );
}
