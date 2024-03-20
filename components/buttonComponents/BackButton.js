import { BackIcon } from "../Icons";
import styled from "styled-components";
import { greylight, primary, white } from "@/lib/colors";

const WrapperBackButtom = styled.div`
  margin: 8px 0;
  display: block;
  background-color: ${white};
`;

const StyledBackButton = styled.button`
  border: none;
  background-color: #f2f0f0;
  cursor: pointer;
  color: ${primary};
  &:hover {
    background-color: ${greylight};
  }
  &:focus {
    background-color: ${greylight};
  }
`;

const BackButton = ({ onClick }) => {
  return (
    <WrapperBackButtom>
      <StyledBackButton onClick={onClick}>
        <BackIcon />
      </StyledBackButton>
    </WrapperBackButtom>
  );
};

export default BackButton;
