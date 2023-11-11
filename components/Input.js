import { grey } from "@/lib/colors";
import { styled } from "styled-components";

const StylesInput = styled.input`
  width: 100%;
  padding: 5px;
  margin-bottom: 5px;
  border: 1px solid ${grey};
  border-radius: 5px;
  box-sizing: border-box;
`;

export default function Input(props) {
  return <StylesInput {...props} />;
}
