import styled, { css } from "styled-components";
import { black, primary, white } from "@/lib/colors";

// Estilos con Styled Components
const StyledButton = styled.button`
  /* Estilos comunes */
  padding: 8px 16px;
  font-size: 1.2rem;
  cursor: pointer;
  border-radius: 4px;

  /* Estilos específicos según las propiedades */
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
  ${(props) =>
    props.$white &&
    css`
      background-color: ${black};
      color: ${white};
      border: 1px solid ${black};
      &:hover {
        background-color: ${white};
        color: ${black};
        border: 1px solid ${black};
      }
    `};
  ${(props) =>
    props.$black &&
    css`
      background-color: ${white};
      color: ${black};
      border: 1px solid ${black};
      &:hover {
        background-color: ${black};
        color: ${white};
        border: 1px solid ${black};
      }
    `};
`;

const ButtonDisabled = ({ onClick, disabled, children, ...rest }) => {
  return (
    <StyledButton {...rest} onClick={onClick} disabled={disabled}>
      {children}
    </StyledButton>
  );
};

export default ButtonDisabled;
