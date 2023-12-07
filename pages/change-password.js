import Categories from "@/components/Categories";
import MainLayout from "@/components/MainLayout";
import { FormContextProvider } from "@/components/formsLogin/FormContext";
import useAuthFetch from "@/hooks/useAuthFetch";
import useLoading from "@/hooks/useLoading";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import Head from "next/head";
import { useSearchParams } from "next/navigation";
import styled from "styled-components";

const WrapperInputs = styled.div`
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
export default function ChangePasswordPage({ categories }) {
  const { isLoading, startLoading, finishtLoading } = useLoading();
  const searchParams = useSearchParams();
  const authRouter = useAuthFetch();

  const changePassword = async (formData) => {
    startLoading();

    const token = searchParams.get("token");
    const options = {
      headers: {
        token,
      },
    };

    await authRouter({
      endpoint: "change-password",
      redirectRoute: "/",
      formData,
      options,
    });
    finishtLoading();
  };

  return (
    <>
      <Head>
        <title>B.R.D | Cambiar contraseña</title>
      </Head>
      <Categories categories={categories} />
      <MainLayout>
        <FormContextProvider
          title="CAMBIAR CONTRASEÑA"
          onSubmit={changePassword}
          description="Registra una nueva contraseña"
        >
          <WrapperInputs>
            <FormContextProvider.Input
              label="Nueva Contraseña"
              name="newPassword"
              type="password"
              placeholder="Ingresa nueva contraseña"
            />
            <FormContextProvider.Input
              label="Confirmar Contraseña"
              name="confirmPassword"
              type="password"
              placeholder="Repetir contraseña"
            />
          </WrapperInputs>
          <FormContextProvider.SubmitButton
            buttonText="Cambiar contraseña"
            isLoading={isLoading}
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
