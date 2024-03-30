import styled, { css } from "styled-components";
import { black, greylight, primary, white } from "@/lib/colors";

// Estilos con Styled Components
const StyledButton = styled.button`
  /* Estilos comunes */
  padding: 4px 16px;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 4px;

  /* Estilos específicos según las propiedades */
  &:disabled {
    background-color: #e9ebea;
    color: ${greylight};
    border: 1px solid ${greylight};
    cursor: not-allowed;
    &:hover {
      background-color: #e9ebea;
      color: ${greylight};
      border: 1px solid ${greylight};
    }
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
