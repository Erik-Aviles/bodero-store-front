import styled from "styled-components";

import Link from "next/link";
import { SlArrowLeft } from "react-icons/sl";
import Head from "next/head";
import { grey, greylight, white } from "@/lib/colors";

const Wrapperform = styled.main`
  width: 100%;
  height: 100vh;
  padding: 0 40px;
  display: flex;
  flex-direction: column;
`;

const LinkStyles = styled.div`
  flex-basis: 10%;
  display: flex;
  align-items: center;
  svg {
    color: ${greylight};
    &:hover {
      color: ${grey};
    }
  }
`;

const FormSection = styled.div`
  flex-basis: 90%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const FormSpan = styled.span`
  color: ${greylight};
  &:hover {
    color: ${grey};
  }
`;

const LayoutForm = ({ children, title, description }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <Wrapperform>
        <LinkStyles>
          <Link href={"/"}>
            <SlArrowLeft /> <FormSpan>Ir a Inicio</FormSpan>
          </Link>
        </LinkStyles>
        <FormSection>{children}</FormSection>
      </Wrapperform>
    </>
  );
};
export default LayoutForm;
