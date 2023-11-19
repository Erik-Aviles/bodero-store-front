import styled from "styled-components";
import Logo from "./Logo";
import { black, grey, white } from "@/lib/colors";
import Link from "next/link";

const WrapperFooter = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  background-color: ${black};
  padding: 40px 0;
  color: ${grey};
  p {
    margin: 0;
  }
  a {
    text-decoration: none;
    color: ${grey};
    padding: 0 10px;
    &:hover {
      color: ${white};
    }
  }
`;

export default function Footer() {
  return (
    <WrapperFooter>
      <Logo href={"/"} />
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
