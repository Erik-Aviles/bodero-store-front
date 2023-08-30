import Link from "next/link";
import React from "react";
import { styled } from "styled-components";

const NavLink = styled(Link)`
  color: #aaa;
  text-decoration: none;
`;

const CustomLink = ({ title, href, icon }) => {
  // const router = useRouter();
  return <NavLink href={href}>{title}</NavLink>;
};

export default CustomLink;
