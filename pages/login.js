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

export default function LoginPage({ categories }) {
  const { isLoading, startLoading, finishtLoading } = useLoading();
  const authRouter = useAuthFetch();

  const login = async (formData) => {
    startLoading();
    await authRouter({
      endpoint: "login",
      redirectRoute: "/account/user-info",
      formData,
    });
    finishtLoading();
  };

  return (
    <>
      <Head>
        <title>B.R.D | Inicio de sesión</title>
      </Head>
      <Categories categories={categories} />
      <MainLayout>
        <FormContextProvider
          title="INICIAR SESIÓN"
          onSubmit={login}
          description="Introduce tus datos de usuario y continúa con tu búsqueda"
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
          </WrapperInputs>
          <FormContextProvider.SubmitButton
            buttonText="ENTRAR"
            isLoading={isLoading}
          />
          <FormContextProvider.Footer
            description="Te olvidaste tu contraseña?"
            link="/forget-password"
            textLink="Recuperar contraseña"
          />
          <FormContextProvider.Footer
            description="Aun no tienes cuenta?"
            link="/register"
            textLink="Regístrate"
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
