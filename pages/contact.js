import { CenterSecction } from "@/components/StylesComponents/CenterSecction";
import { FormContextProvider } from "@/components/FormsLogin/FormContext";
import CategoriesComponent from "@/components/CategoriesComponent";
import { mongooseConnect } from "@/lib/mongoose";
import useAuthFetch from "@/hooks/useAuthFetch";
import styled, { css } from "styled-components";
import { Category } from "@/models/Category";
import useLoading from "@/hooks/useLoading";
import { black, white } from "@/lib/colors";
import Title from "@/components/Title";
import Head from "next/head";

const CenterDiv = styled.section`
  ${CenterSecction}
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin: 40px 0 80px;
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    place-items: center;
  }
`;
const Box = styled.div`
  padding: 0 20px;
  max-width: 450px;
  height: fit-content;
  box-shadow: 1px 4px 20px rgb(0 0 0 / 20%);
  ${(props) =>
    props.$black &&
    css`
      background-color: ${black};
      color: ${white};
    `};
  ${(props) =>
    props.$white &&
    css`
      background-color: ${white};
    `};
  h3 {
    padding: 15px;
    margin-top: 16px;
    font-size: 1.6rem;
    line-height: 2.4rem;
    font-weight: normal;
    background-color: ${white};
    color: ${black};
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
        <CategoriesComponent categories={categories} />
        <CenterDiv>
          <Title>Contáctenos</Title>
          <Wrapper>
            <Box $black={1}>
              <h3>
                Podemos asesorarte en <br />
                <TextStrong>todos tus pedidos! </TextStrong>
              </h3>
              <p>
                "En Bodero Racing Development, estamos enfocados en ti, el
                apasionado dueño de una moto que busca lo mejor para su
                vehículo. Nuestro equipo está compuesto por expertos en el mundo
                de las motocicletas, listos para llevarte al siguiente nivel en
                rendimiento y satisfacción.
                <br />
                <br />
                Nos enorgullece ofrecer repuestos originales y un servicio de
                reparación y preparación de motos de primer nivel. Sabemos que
                cada moto es única y cada cliente tiene necesidades específicas,
                por eso nos comprometemos a brindarte una atención
                personalizada.
                <br />
                <br /> ¿Tienes alguna inquietud sobre tu moto? ¿Estás buscando
                un repuesto específico o necesitas ayuda con la reparación?
                Cuéntanos sobre tu moto y tus necesidades, estamos aquí para
                ayudarte.
                <br />
                <br /> En Bodero Racing Development, tu satisfacción es nuestra
                prioridad. ¡Contáctanos hoy mismo y descubre cómo podemos
                mejorar tu experiencia en el mundo de las dos ruedas!"
              </p>
            </Box>
            <Box $white={1}>
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
        </CenterDiv>
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
