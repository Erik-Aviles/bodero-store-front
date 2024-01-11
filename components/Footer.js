import styled from "styled-components";
import { black, grey, white } from "@/lib/colors";
import Link from "next/link";
import LogoFooter from "./LogoFooter";

const WrapperFooter = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  background-color: ${white};
  padding: 40px 0;
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

export default function Footer() {
  return (
    <WrapperFooter>
      <LogoFooter href={"/"} />
      <section>
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
      </section>
      <section>
        <p>COPYRIGHT B.R.D 2023. TODOS LOS DERECHOS RESERVADOS</p>
      </section>
    </WrapperFooter>
  );
}
