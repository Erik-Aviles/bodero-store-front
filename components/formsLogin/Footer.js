import { black, grey } from "@/lib/colors";
import Link from "next/link";
import styled from "styled-components";

const FooterContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 5px;
  span {
    font-size: 0.8rem;
    color: ${grey};
  }
  a {
    font-weight: bold;
    text-decoration: none;
    cursor: pointer;
    color: ${black};
    padding-left: 5px;
  }
`;

export function Footer({ description, link, textLink }) {
  return (
    <FooterContainer>
      <span>
        {description}
        <Link href={link}>{textLink}</Link>
      </span>
    </FooterContainer>
  );
}
