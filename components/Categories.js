import { black, white, primary } from "@/lib/colors";
import Link from "next/link";
import styled, { css } from "styled-components";
import Center from "./Center";
import { SearchIcon } from "./Icons";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import filterSearch from "@/utils/filterSearch";
import { usePathname } from "next/navigation";

const StyleNav = styled.nav`
  background-color: ${black};
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const StaledLink = styled.div`
  text-decoration: none;
  cursor: pointer;
  padding: 0;
  color: ${white};
  svg {
    fill: ${white};
  }
  &:hover {
    border-bottom: 3px solid ${primary};
    color: ${primary};
  }
  ${(props) =>
    props.other &&
    css`
      align-items: end;
      &:hover {
        border-bottom: 0;
        svg {
          fill: ${primary};
        }
      }
    `};
`;

const Categories = ({ categories }) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const router = useRouter();

  const handleCategory = (id) => {
    setCategory(id);
    filterSearch({ router, category: id });
    console.log(id);
  };

  return (
    <Center>
      <StyleNav>
        {categories.map((item) => (
          <StaledLink
            key={item._id}
            value={category}
            onClick={() => handleCategory(item._id)}
          >
            {item.name}
          </StaledLink>
        ))}

        <Link other={1} href={"/products"} title="Ir a búsqueda">
          <SearchIcon />
        </Link>
      </StyleNav>
    </Center>
  );
  // return (
  //   <Center>
  //     <StyleNav onChange={handleCategory}>
  //       {categories?.map((category) => (
  //         <StaledLink
  //           href={`${url}`}
  //           title={category.name}
  //           key={category._id}
  //           value={category}
  //         >
  //           {category.name}
  //         </StaledLink>
  //       ))}
  //       <Link other={1} href={"/products"} title="Ir a búsqueda">
  //         <SearchIcon />
  //       </Link>
  //     </StyleNav>
  //   </Center>
  // );
};
export default Categories;
