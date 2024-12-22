import { blue, primary } from '@/lib/colors'
import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import InputGroup from './forms/InputGroup'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  h2 {
    color: ${blue};
    margin: 0;
    font-weight: 400;
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 15px;

    .profile-body {
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      gap: 15px;
      @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
      }
      .profile-box {
        border: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 15px;
        width: 100%;
        max-width: 400px;
        min-width: 200px;
        border: 1px solid #e9ecef;
        padding: 15px;
        border-radius: 8px;
        background-color: #f8f9fa;
      }
    }

    .botton-box {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
      padding: 20px 0;
    }
  }
`

const Button = styled.button`
  padding: 10px;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  ${(props) =>
    props.$canceled &&
    css`
      background-color: ${primary};
      transition: background-color 0.3s ease;
      &:hover {
        background-color: rgba(247, 3, 1, 0.6);
      }
      &:disabled {
        background-color: rgba(247, 3, 1, 0.4);
        cursor: not-allowed;
      }
    `};
  ${(props) =>
    props.$save &&
    css`
      background-color: ${blue};
      transition: background-color 0.3s ease;

      &:hover {
        background-color: rgba(0, 91, 181, 0.8);
      }
      &:disabled {
        background-color: rgba(0, 91, 181, 0.5);
        cursor: not-allowed;
      }
    `};
`

const Authentication = () => {
  const fieldLabels = {
    newpassword: 'Contraseña nueva',
    confirmpassword: 'Repetir contraseña',
  }
  const initialData = {
    newpassword: '',
    confirmpassword: '',
  }
  const [authData, setAuthData] = useState(initialData)

  const handleChange = (e) => {
    const { name, value } = e.target
    setAuthData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCustomerSave = () => {
    alert('Datos del cliente guardados correctamente.')
    console.log(authData)
  }

  const handleCustomerCancel = () => {
    setAuthData(initialData)
    alert('Cambios revertidos a su estado inicial.')
  }

  const hasCustomerChanges = () => {
    return JSON.stringify(authData) !== JSON.stringify(initialData)
  }

  return (
    <Container>
      <h2>Cambiar Contraseña</h2>
      <form>
        <div className={'profile-body'}>
          <fieldset className='profile-box'>
            <InputGroup
              required
              label={fieldLabels.newpassword}
              name='newpassword'
              value={authData?.newpassword}
              onChange={handleChange}
              placeholder='Ingresa una nueva contraseña'
            />

            <InputGroup
              required
              label={fieldLabels.confirmpassword}
              name='confirmpassword'
              value={authData?.confirmpassword}
              onChange={handleChange}
              placeholder='Repatir la una nueva contraseña'
            />
          </fieldset>
        </div>
        <div className='botton-box'>
          <Button
            type='button'
            title='Cancelar Cambios'
            onClick={handleCustomerCancel}
            disabled={!hasCustomerChanges()}
            $canceled
          >
            Cancelar
          </Button>
          <Button
            type='button'
            title='Gurdar Cambios'
            onClick={handleCustomerSave}
            disabled={!hasCustomerChanges()}
            $save
          >
            Guardar
          </Button>
        </div>
      </form>
    </Container>
  )
}

export default Authentication
