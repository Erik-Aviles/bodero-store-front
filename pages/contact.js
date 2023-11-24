import Categories from "@/components/Categories";
import Center from "@/components/Center";
import FormContact from "@/components/FormContact";
import Title from "@/components/Title";
import { black, white } from "@/lib/colors";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import Head from "next/head";
import styled, { css } from "styled-components";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin: 40px 0 80px;
`;
const Box = styled.div`
  padding: 0 20px;
  ${(props) =>
    props.black &&
    css`
      background-color: ${black};
      color: ${white};
    `};
  ${(props) =>
    props.white &&
    css`
      background-color: ${white};
      box-shadow: 1px 4px 20px rgb(0 0 0 / 20%);
    `};
  h3 {
    margin-top: 16px;
    font-size: 1.6rem;
    line-height: 2.4rem;
    font-weight: normal;
  }
  p {
    line-height: 1.6rem;
  }
  h4 {
    margin-bottom: 0;
  }
`;
const FormBox = styled.div``;
const TextStrong = styled.strong`
  font-size: 2rem;
`;

export default function contact({ categories }) {
  return (
    <>
      <Head>
        <title>B.R.D | Contacto</title>
      </Head>
      <Categories categories={categories} />
      <main>
        <Center>
          <Title>Contáctenos</Title>
          <Wrapper>
            <Box black={1}>
              <h3>
                Podemos asesorarte en <br />
                <TextStrong>todos tus pedidos! </TextStrong>
              </h3>
              <p>
                Somos un equipo de profesionales capacitados para llevar tu
                marca al siguiente nivel. Trabajamos enfocados en nuestros
                clientes, conscientes de que su éxito es nuestro éxito.
              </p>
              <p>
                Contamos con expertos especializados en las diferentes áreas del
                marketing digital, lo que nos permite trabajar de manera
                integral y proponer estrategias 360º.
              </p>
            </Box>
            <Box white={1}>
              <h4>¡Envíanos un mensaje ahora y haz crecer tu negocio!</h4>
              <FormContact />
            </Box>
          </Wrapper>
        </Center>
      </main>
    </>
  );
}
export async function getServerSideProps() {
  await mongooseConnect();
  const categories = await Category.find({}, null, { sort: { _id: -1 } });
  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
}
