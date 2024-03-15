import { error, grey, success } from "@/lib/colors";
import styled from "styled-components";

const StylesInput = styled.input`
  width: 100%;
  padding: 5px;
  margin-bottom: 5px;
  border: 1px solid ${grey};
  border-radius: 5px;
  box-sizing: border-box;
  &:focus {
    border-color: ${success};
    box-shadow: 0 1px 1px rgba(229, 103, 23, 0.075) inset,
      0 0 8px rgba(0, 128, 0, 0.6);
    outline: 0 none;
  }
`;

export default function Input(props) {
  return <StylesInput {...props} />;
}
