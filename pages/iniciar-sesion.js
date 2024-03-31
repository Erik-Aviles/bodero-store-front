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

export default function LoginPage() {
  const { isLoading, startLoading, finishtLoading } = useLoading();
  const authRouter = useAuthFetch();

  const login = async (formData) => {
    startLoading();
    await authRouter({
      endpoint: "auth/login",
      redirectRoute: "/",
      formData,
    });
    finishtLoading();
  };

  return (
    <LayoutForm title="B.R.D | Inicio de sesión">
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
          link="/recuperar-contrasena"
          textLink="Recuperar contraseña"
        />
        <FormContextProvider.Footer
          description="Aun no tienes cuenta?"
          link="/registrarse"
          textLink="Regístrate"
        />
      </FormContextProvider>
    </LayoutForm>
  );
}
