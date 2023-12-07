import Categories from "@/components/Categories";
import MainLayout from "@/components/MainLayout";
import { FormContextProvider } from "@/components/formsLogin/FormContext";
import useAuthFetch from "@/hooks/useAuthFetch";
import useLoading from "@/hooks/useLoading";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import Head from "next/head";
import styled from "styled-components";

const WrapperInputs = styled.div`
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export default function ForgetPasswordPage({ categories }) {
  const { isLoading, startLoading, finishtLoading } = useLoading();
  const authRouter = useAuthFetch();

  const forgetPassword = async (formData) => {
    startLoading();
    await authRouter({
      endpoint: "forget-password",
      formData,
    });
    finishtLoading();
  };

  return (
    <>
      <Head>
        <title>B.R.D | Recuperar contraseña</title>
      </Head>
      <Categories categories={categories} />
      <MainLayout>
        <FormContextProvider
          title="RECUPERAR CONTRASEÑA"
          onSubmit={forgetPassword}
          description="Ingresa un correo registrado para recibir un link de recuperación"
        >
          <WrapperInputs>
            <FormContextProvider.Input
              label="Correo"
              name="email"
              type="email"
              placeholder="Ingresa tu correo"
            />
          </WrapperInputs>
          <FormContextProvider.SubmitButton
            buttonText="ENVIAR"
            isLoading={isLoading}
          />
          <FormContextProvider.Footer
            description="Ir al"
            link="/login"
            textLink="Inicio de sesión"
          />
        </FormContextProvider>
      </MainLayout>
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
