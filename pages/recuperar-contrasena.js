import styled from "styled-components";
import { FormContextProvider } from "@/components/formsLogin/FormContext";
import useAuthFetch from "@/hooks/useAuthFetch";
import useLoading from "@/hooks/useLoading";
import LayoutForm from "@/components/LayoutForm";

const WrapperInputs = styled.div`
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
export default function ForgetPasswordPage() {
  const { isLoading, startLoading, finishtLoading } = useLoading();
  const authRouter = useAuthFetch();

  const forgetPassword = async (formData) => {
    startLoading();
    await authRouter({
      endpoint: "auth/forget-password",
      formData,
    });
    finishtLoading();
  };

  return (
    <LayoutForm title="B.R.D | Recuperar contraseña">
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
          description="Aun no tienes cuenta?"
          link="/registrarse"
          textLink="Regístrate"
        />
        <FormContextProvider.Footer
          description="Ir al"
          link="/iniciar-sesion"
          textLink="Inicio de sesión"
        />
      </FormContextProvider>
    </LayoutForm>
  );
}
