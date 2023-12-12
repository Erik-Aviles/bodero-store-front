import { error, success, white } from "@/lib/colors";
import styled, { css } from "styled-components";

const NotifContainer = styled.div`
  position: fixed;
  bottom: 100px;
  right: 0;
  margin-bottom: 1rem;
  z-index: 9;

  display: flex;
  align-items: center;
  color: ${white};
  animation: start 0.5s forwards;

  height: 30px;
  width: fit-content;
  padding: 0.2rem 1rem;
  transition: 0.3s;

  border-radius: 3px;

  ${(props) =>
    props.success &&
    css`
      background-color: ${success};
    `};
  ${(props) =>
    props.showError &&
    css`
      background-color: ${error};
    `};
  @keyframes start {
    from {
      left: -100%;
    }
    to {
      left: 5%;
    }
  }
`;

export function Notification({ status, msj }) {
  return (
    <>
      {status === "success" ? (
        <NotifContainer success={1}>
          <p>{msj}</p>
        </NotifContainer>
      ) : (
        <NotifContainer showError={1}>
          <p>{msj}</p>
        </NotifContainer>
      )}
    </>
  );
}
