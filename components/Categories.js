import { black, white, primary } from "@/lib/colors";
import Link from "next/link";
import { styled, css } from "styled-components";

const StyleDiv = css`
  height: 45px;
  max-width: 1000px;
  margin: 0 auto 20px;
  color: ${white};
  background-color: ${black};
`;
const StyleNav = css`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const StaledLink = css`
  text-decoration: none;
  cursor: pointer;
  padding: 10px 0;
  color: ${white};
  &:hover {
    border-bottom: 3px solid ${primary};
    color: ${primary};
  }
`;

const StaledNavLink = styled(Link)`
  ${StaledLink}
`;

const Nav = styled.nav`
  ${StyleNav}
`;

const Wrapper = styled.div`
  ${StyleDiv}
`;

export default function Categories({ categories }) {
  return (
    <Wrapper>
      <Nav>
        {categories?.length > 0 &&
          categories.map((category) => (
            <StaledNavLink href={"/"} title={category.name} key={category._id}>
              {category.name.toUpperCase()}
            </StaledNavLink>
          ))}
      </Nav>
    </Wrapper>
  );
}
