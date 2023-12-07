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
export default function RegisterPage({ categories }) {
  const { isLoading, startLoading, finishtLoading } = useLoading();
  const authRouter = useAuthFetch();

  const register = async (formData) => {
    startLoading();
    await authRouter({
      endpoint: "register",
      redirectRoute: "/login",
      formData,
    });
    finishtLoading();
  };

  return (
    <>
      <Head>
        <title>B.R.D | Crear nueva cuenta</title>
      </Head>
      <Categories categories={categories} />
      <MainLayout>
        <FormContextProvider
          title="CREAR UNA CUENTA"
          onSubmit={register}
          description="Solo te llevará 30 segundos"
        >
          <WrapperInputs>
            <FormContextProvider.Input
              label="Correo"
              name="email"
              type="email"
              placeholder="Ingresa tu correo"
            />
            <FormContextProvider.Input
              label="Contraseña"
              name="password"
              type="password"
              placeholder="Ingresa tu contraseña"
            />
            <FormContextProvider.Input
              label="Confirmar Contraseña"
              name="confirmPassword"
              type="password"
              placeholder="Repetir contraseña"
            />
          </WrapperInputs>
          <FormContextProvider.SubmitButton
            buttonText="CREAR CUENTA"
            isLoading={isLoading}
          />
          <FormContextProvider.Footer
            description="Ya tienes cuenta?"
            link="/login"
            textLink="Iniciar sesión"
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
