import InformationFooter from "./InformationFooter";
import { black, grey, white } from "@/lib/colors";
import styled from "styled-components";
import { LogoLetters } from "./Logo";
import Link from "next/link";

const WrapperFooter = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  background-color: ${white};
  padding: 40px 20px;
  color: ${grey};
  p {
    margin: 0;
  }
  a {
    text-decoration: none;
    color: ${black};
    padding: 0 10px;
    &:hover {
      color: ${grey};
    }
  }
`;
const WrapperFooterSpan = styled.footer`
  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    place-items: center;
  }
  @media screen and (max-width: 320px) {
    font-size: 14px;
  }
`;

export default function Footer() {
  return (
    <>
      <InformationFooter />
      <WrapperFooter>
        <LogoLetters href={"/"} />
        <div>
          <Link
            href={"/"}
            target="_blank"
            rel="noopener noreferrer"
            title={"Whatsapp"}
          >
            Whatsapp
          </Link>
          <Link
            href={"/"}
            target="_blank"
            rel="noopener noreferrer"
            title={"Instagram"}
          >
            Instagram
          </Link>
          <Link
            href={"/"}
            target="_blank"
            rel="noopener noreferrer"
            title={"FaceBook"}
          >
            FaceBook
          </Link>
        </div>
        <WrapperFooterSpan>
          <span>COPYRIGHT B.R.D 2023.</span>
          <span>TODOS LOS DERECHOS RESERVADOS</span>
        </WrapperFooterSpan>
      </WrapperFooter>
    </>
  );
}
