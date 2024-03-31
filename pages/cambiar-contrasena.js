import LayoutForm from "@/components/LayoutForm";
import { FormContextProvider } from "@/components/formsLogin/FormContext";
import useAuthFetch from "@/hooks/useAuthFetch";
import useLoading from "@/hooks/useLoading";
import { useSearchParams } from "next/navigation";
import styled from "styled-components";

const WrapperInputs = styled.div`
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
export default function ChangePasswordPage() {
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
      endpoint: "auth/change-password",
      redirectRoute: "/",
      formData,
      options,
    });
    finishtLoading();
  };

  return (
    <LayoutForm title="B.R.D | Cambiar contraseña">
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
    </LayoutForm>
  );
}
