import Head from "next/head";
import styled from "styled-components";

const WrapperMain = styled.main`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Layout({ children, title, description }) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <WrapperMain>{children}</WrapperMain>
    </div>
  );
}
