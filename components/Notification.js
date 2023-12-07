import { error, success } from "@/lib/colors";
import styled, { css } from "styled-components";

const NotifContainer = styled.div`
  position: fixed;
  bottom: 100px;
  right: 0;
  margin-bottom: 1rem;
  z-index: 5;

  display: flex;
  align-items: center;
  animation: start 0.5s forwards;

  height: 50px;
  width: fit-content;
  padding: 0.6rem 1rem;
  transition: 0.3s;

  border: 0.5px solid #878787;
  border-radius: 10px;
  outline: 0.5px solid transparent;

  ${(props) =>
    props.success &&
    css`
      outline: 1.5px solid ${success};
    `};
  ${(props) =>
    props.isError &&
    css`
      outline: 1.5px solid ${error};
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
        <NotifContainer isError={1}>
          <p>{msj}</p>
        </NotifContainer>
      )}
    </>
  );
}
