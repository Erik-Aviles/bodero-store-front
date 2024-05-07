import styled, { css } from "styled-components";

const DisplayNoneCpmponente = styled.div`
  display: ${(props) => (props.$display === 1 ? "block" : "none")};
`;

export function DisplayNone({ children, display }) {
  return (
    <DisplayNoneCpmponente $display={display}>{children}</DisplayNoneCpmponente>
  );
}
