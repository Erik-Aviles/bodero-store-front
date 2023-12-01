import { black, white } from "@/lib/colors";
import { Loader } from "../Loader";
import styled from "styled-components";

const SubButton = styled.button`
  margin-top: 1rem;
  width: 100%;
  background-color: ${black};
  color: ${white};
  text-align: center;
  border-radius: 6px;
  padding: 0.4rem 0;
  border: 1px solid transparent;
  trasition-duration: 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    background-color: ${white};
    color: ${black};
    border: 1px solid ${black};
  }
`;

export function SubmitButton({ buttonText, isLoading }) {
  return (
    <SubButton type="submit" disabled={isLoading}>
      {isLoading ? <Loader /> : buttonText}
    </SubButton>
  );
}
