import styled, { css } from "styled-components";
import useAuthFetch from "@/hooks/useAuthFetch";
import useLoading from "@/hooks/useLoading";
import { black, white } from "@/lib/colors";
import Title from "@/components/stylesComponents/Title";
import { CenterSecction } from "@/components/stylesComponents/CenterSecction";
import { FormContextProvider } from "@/components/formsLogin/FormContext";
import Layout from "@/components/Layout";
import BackButton from "@/components/buttonComponents/BackButton";
import { useRouter } from "next/navigation";
import { FlexStyled } from "@/components/stylesComponents/Flex";
import { Loading } from "@/components/Loading";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "@/context/DataContext";

const CenterDiv = styled.section`
  ${CenterSecction}
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: minmax(1fr, 450px);
  gap: 20px;
  padding: 10px 0;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    justify-content: center;
    padding: 0 60px 60px;
  }
`;
const Box = styled.div`
  padding: 30px 0;
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
    margin: 16px;
    font-size: 1.3rem;
    font-weight: normal;
    background-color: ${white};
    color: ${black};
    @media screen and (min-width: 768px) {
      line-height: 2.4rem;
      font-size: 1.6rem;
    }
  }
  p {
    padding: 15px;
    line-height: 1.3rem;
  }
  h4 {
    padding: 0 15px;
    margin: 0;
  }
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    justify-content: center;
    padding: 20px;
  }
`;
const TextStrong = styled.strong`
  font-size: 1.4rem;
  @media screen and (min-width: 768px) {
    font-size: 2rem;
  }
`;
const WrapperInputs = styled.div`
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
export default function ContactPage() {
  const authRouter = useAuthFetch();
  const router = useRouter();
  const { isLoading, startLoading, finishtLoading } = useLoading();
  const [isUpLoanding, setIsUpLoanding] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsUpLoanding(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  const handleGoBack = (e) => {
    e.preventDefault();
    router.back();
  };

  if (isUpLoanding) {
    return <Loading />;
  }

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
    <Layout title="B.R.D | Contactenos">
      <CenterDiv>
        <FlexStyled>
          <BackButton onClick={handleGoBack} />
          <Title>Contáctenos</Title>
        </FlexStyled>
        <Wrapper>
          <Box $black={1}>
            <h3>
              Podemos asesorarte en <br />
              <TextStrong>todos tus pedidos! </TextStrong>
            </h3>
            <p>
              &ldquo;En Bodero Racing Development, estamos enfocados en ti, el
              apasionado dueño de una moto que busca lo mejor para su vehículo.
              Nuestro equipo está compuesto por expertos en el mundo de las
              motocicletas, listos para llevarte al siguiente nivel en
              rendimiento y satisfacción.
              <br />
              <br />
              Nos enorgullece ofrecer repuestos originales y un servicio de
              reparación y preparación de motos de primer nivel. Sabemos que
              cada moto es única y cada cliente tiene necesidades específicas,
              por eso nos comprometemos a brindarte una atención personalizada.
              <br />
              <br /> ¿Tienes alguna inquietud sobre tu moto? ¿Estás buscando un
              repuesto específico o necesitas ayuda con la reparación? Cuéntanos
              sobre tu moto y tus necesidades, estamos aquí para ayudarte.
              <br />
              <br /> En Bodero Racing Development, tu satisfacción es nuestra
              prioridad. ¡Contáctanos hoy mismo y descubre cómo podemos mejorar
              tu experiencia en el mundo de las dos ruedas!&rdquo;
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
    </Layout>
  );
}
