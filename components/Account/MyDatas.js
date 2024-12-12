import { blue, primary } from '@/lib/colors'
import { customerInfo } from '@/resource/curtomerData'
import React, { useState } from 'react'
import styled, { css } from 'styled-components'

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
      justify-content: end;
      gap: 10px;
      padding-right: 80px;
      @media (max-width: 1000px) {
        padding-right: 0;
        justify-content: center;
      }
    }
  }
`

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  label {
    font-size: 0.75rem;
    font-weight: 400;
    color: #9199a0;
  }
  input {
    outline: none;
    background: none;
    width: 100%;
    font-size: 14px;
    border-radius: 5px;
    height: 35px;
    padding: 5px 10px 4px;
    border: 1px solid #ccc;
    background-clip: padding-box;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Sombra sutil */
    transition: box-shadow 0.3s ease;
    &:focus {
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15); /* Sombra un poco más destacada en foco */
      outline: none;
    }
  }
`

const Button = styled.button`
  padding: 10px 15px;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  ${(props) =>
    props.$canceled &&
    css`
      background-color: ${primary};
      transition: background-color 0.3s ease;
      &:hover {
        background-color: rgba(247, 3, 1, 0.6);
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
    `};
`

const MyDatas = () => {
  const [customerData, setCustomerData] = useState({
    name: customerInfo?.name || '--',
    lastname: customerInfo?.lastname || '--',
    email: customerInfo?.email || '--',
    idDocument: customerInfo?.idDocument || '--',
    phone: customerInfo?.phone || '--',
    dateOfBirth: customerInfo?.dateOfBirth || '--',
    gender: customerInfo?.gender || '--',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setCustomerData({ ...customerData, [name]: value })
  }

  const handleSave = () => {
    // Simulate API call
    console.log('Data saved:', customerData)
    alert('Datos guardados correctamente.')
  }

  return (
    <Container>
      <h2>Editar Mis Datos</h2>
      <form>
        <div className={'profile-body'}>
          <fieldset className='profile-box'>
            <InputGroup>
              <label htmlFor='name'>Nombres</label>
              <input
                type='text'
                id='name'
                name='name'
                value={customerData?.name}
                onChange={handleChange}
              />
            </InputGroup>
            <InputGroup>
              <label htmlFor='lastname'>Apellidos</label>
              <input
                type='text'
                id='lastname'
                name='lastname'
                value={customerData.lastname}
                onChange={handleChange}
              />
            </InputGroup>
            <InputGroup>
              <label htmlFor='email'>Correo Electrónico</label>
              <input
                type='email'
                id='email'
                name='email'
                value={customerData.email}
                onChange={handleChange}
              />
            </InputGroup>
            <InputGroup>
              <label htmlFor='idDocument'>Documento de Identidad</label>
              <input
                type='text'
                id='idDocument'
                name='idDocument'
                value={customerData?.idDocument}
                onChange={handleChange}
              />
            </InputGroup>
          </fieldset>
          <fieldset className='profile-box'>
            <InputGroup>
              <label htmlFor='phone'>Teléfono</label>
              <input
                type='tel'
                id='phone'
                name='phone'
                value={customerData.phone}
                onChange={handleChange}
              />
            </InputGroup>
            <InputGroup>
              <label htmlFor='dateOfBirth'>Fecha de nacimiento</label>
              <input
                type='date'
                id='dateOfBirth'
                name='dateOfBirth'
                value={customerData?.dateOfBirth}
                onChange={handleChange}
              />
            </InputGroup>
            <InputGroup>
              <label htmlFor='gender'>Genero</label>
              <input
                type='text'
                id='gender'
                name='gender'
                value={customerData?.gender}
                onChange={handleChange}
              />
            </InputGroup>
          </fieldset>
        </div>
        <div className='botton-box'>
          <Button $canceled onClick={handleSave} type='button'>
            Cancelar
          </Button>
          <Button $save onClick={handleSave} type='button'>
            Guardar
          </Button>
        </div>
      </form>
    </Container>
  )
}

export default MyDatas
