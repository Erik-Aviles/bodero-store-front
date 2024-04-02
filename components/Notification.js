import styled from "styled-components";
import { SuccessIcon, WarningIcon } from "./Icons";
import { error, success } from "@/lib/colors";

const NotificationContainer = styled.div`
  position: fixed;
  min-width: 260px;
  border: 1px solid #ccc;
  border-radius: 12px;
  background-color: #fff;
  padding: 16px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 50;
  transition-duration: 2000ms;
`;

const IconWrapper = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

const NotificationMessage = styled.strong`
  display: block;
  text-align: center;
  font-weight: medium;
  color: #333;
  font-size: 0.8rem;

  @media (min-width: 768px) {
    font-size: 1rem;
  }
`;
const CenterNotification = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2px;
`;

export function Notification({ status, msj }) {
  return (
    <NotificationContainer role="alert">
      <CenterNotification>
        <IconWrapper>
          {status === "success" ? (
            <SuccessIcon fill={success} />
          ) : (
            <WarningIcon fill={error} />
          )}
        </IconWrapper>
        <NotificationMessage>{msj}</NotificationMessage>
      </CenterNotification>
    </NotificationContainer>
  );
}
