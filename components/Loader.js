import { white } from "@/lib/colors";
import styled from "styled-components";

const LoaderContainert = styled.div`
  border: 2px solid rgba(38, 337, 37, 0.5);
  border-radius: 50%;
  border-left-color: ${white};
  animation: spin 0.8s ease infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const Loader = ({ size = 15 }) => {
  return <LoaderContainert style={{ width: size, height: size }} />;
};
