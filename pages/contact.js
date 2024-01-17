import { FormContextProvider } from "@/components/formsLogin/FormContext";
import FilterOnlyCategories from "@/components/FilterOnlyCategories";
import { mongooseConnect } from "@/lib/mongoose";
import useAuthFetch from "@/hooks/useAuthFetch";
import styled, { css } from "styled-components";
import { Category } from "@/models/Category";
import useLoading from "@/hooks/useLoading";
import { black, white } from "@/lib/colors";
import Center from "@/components/Center";
import Title from "@/components/Title";
import Head from "next/head";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin: 40px 0 80px;
`;
const Box = styled.div`
  padding: 0 20px;
  height: fit-content;
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
const TextStrong = styled.strong`
  font-size: 2rem;
`;
const WrapperInputs = styled.div`
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
export default function ContactPage({ categories }) {
  const { isLoading, startLoading, finishtLoading } = useLoading();
  const authRouter = useAuthFetch();

  const contactSend = async (formData) => {
    startLoading();
    await authRouter({
      endpoint: "send",
      redirectRoute: "/",
      formData,
    });
    finishtLoading();
  };

  return (
    <>
      <Head>
        <title>B.R.D | Contacto</title>
      </Head>
      <main>
        <FilterOnlyCategories categories={categories} />
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
              <p>
                Con el fin de brindar una atención personalizada, nos gustaría
                que nos cuente sobre su inquietud y cuál es el producto de su
                interés.
              </p>
            </Box>
            <Box white={1}>
              <h4>
                ¡Envíanos un mensaje ahora y nosotros nos contáctamos contigo!
              </h4>
              <FormContextProvider
                onSubmit={contactSend}
                description="Ingresa el correo electrónico y teléfono de uso frecuente"
              >
                <WrapperInputs>
                  <FormContextProvider.Input
                    label="Nombre completo"
                    name="name"
                    type="text"
                    placeholder="Nombre..."
                  />
                  <FormContextProvider.Input
                    label="Correo"
                    name="email"
                    type="email"
                    placeholder="Correo..."
                  />
                  <FormContextProvider.Input
                    label="Teléfono"
                    name="phone"
                    type="text"
                    placeholder="Teléfono..."
                  />
                  <FormContextProvider.Input
                    label="Ciudad"
                    name="city"
                    type="text"
                    placeholder="Ciudad"
                  />
                  <FormContextProvider.Input
                    label="País"
                    name="country"
                    type="text"
                    placeholder="País"
                  />
                  <FormContextProvider.TextArea
                    label="Mensaje"
                    name="message"
                    placeholder="Escribe tu mensaje aquí"
                  />
                </WrapperInputs>
                <FormContextProvider.SubmitButton
                  buttonText="ENVIAR"
                  isLoading={isLoading}
                />
              </FormContextProvider>
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
