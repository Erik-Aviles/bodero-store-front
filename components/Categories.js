import { black, white, primary } from "@/lib/colors";
import Link from "next/link";
import styled from "styled-components";
import Center from "./Center";

const StyleNav = styled.nav`
  background-color: ${black};
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const StaledLink = styled(Link)`
  text-decoration: none;
  cursor: pointer;
  padding: 0;
  color: ${white};
  &:hover {
    border-bottom: 3px solid ${primary};
    color: ${primary};
  }
`;

export default function Categories({ categories }) {
  return (
    <Center>
      <StyleNav>
        {categories?.map((category) => (
          <StaledLink href={"/"} title={category.name} key={category._id}>
            {category.name.toUpperCase()}
          </StaledLink>
        ))}
      </StyleNav>
    </Center>
  );
}
