import LayoutForm from "@/components/LayoutForm";
import { FormContextProvider } from "@/components/formsLogin/FormContext";
import useAuthFetch from "@/hooks/useAuthFetch";
import useLoading from "@/hooks/useLoading";
import styled from "styled-components";

const WrapperInputs = styled.div`
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
export default function RegisterPage() {
  const { isLoading, startLoading, finishtLoading } = useLoading();
  const authRouter = useAuthFetch();

  const register = async (formData) => {
    startLoading();
    await authRouter({
      endpoint: "auth/register",
      redirectRoute: "/iniciar-sesion",
      formData,
    });
    finishtLoading();
  };

  return (
    <LayoutForm title="B.R.D | Crear nueva cuenta">
      <FormContextProvider
        title="CREAR UNA CUENTA"
        onSubmit={register}
        description="Solo te llevará 30 segundos"
      >
        <WrapperInputs>
          <FormContextProvider.Input
            label="Nombre"
            name="name"
            type="text"
            placeholder="Escribe tu Nombre"
          />
          <FormContextProvider.Input
            label="Apellido"
            name="lastname"
            type="text"
            placeholder="Escribe tu apellido"
          />
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
          link="/iniciar-sesion"
          textLink="Iniciar sesión"
        />
      </FormContextProvider>
    </LayoutForm>
  );
}
