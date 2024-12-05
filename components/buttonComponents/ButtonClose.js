import styled, { css } from 'styled-components'
import React from 'react'
import { AllDeleteIcon } from '../Icons'
import { black, primary, white } from '@/lib/colors'

const WrapperButtonClose = styled.button`
  position: absolute;
  padding: 0;
  z-index: 4;
  top: 0px;
  right: 0;
  width: 25px;
  height: 25px;
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  color: ${white};
  background: ${black};
  outline: 0.1px solid ${white};
  border: none;
  border-radius: 5px;
  &:hover {
    background-color: ${primary};
  }
`

const ButtonClose = ({ onClick }) => {
  return (
    <WrapperButtonClose onClick={onClick}>
      <AllDeleteIcon />
    </WrapperButtonClose>
  )
}

export default ButtonClose
