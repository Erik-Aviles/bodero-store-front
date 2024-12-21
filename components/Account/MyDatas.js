import { blue, primary } from '@/lib/colors'
import { customerInfo, genersData } from '@/resource/curtomerData'
import React, { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import InputGroup from './forms/InputGroup'
import DateInputGroup from './forms/DateInputGroup'

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

const MyDatas = () => {
  const fieldLabels = {
    name: 'Nombres',
    lastname: 'Apellidos',
    email: 'Correo',
    idDocument: 'Documento de identidad',
    phone: 'Teléfono',
    dateOfBirth: 'Fecha de nacimiento',
    gender: 'Genero',
  }
  const initialData = {
    name: customerInfo?.name || '--',
    lastname: customerInfo?.lastname || '--',
    email: customerInfo?.email || '--',
    idDocument: customerInfo?.idDocument || '--',
    phone: customerInfo?.phone || '--',
    dateOfBirth: customerInfo?.dateOfBirth || '--',
    gender: customerInfo?.gender || '--',
  }
  const [selectedDate, setSelectedDate] = useState(new Date())

  const [customerData, setCustomerData] = useState(initialData)
  const [originalCustomerData, setOriginalCustomerData] = useState(initialData)

  const handleChange = (e) => {
    const { name, value } = e.target
    setCustomerData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCustomerSave = () => {
    alert('Datos del cliente guardados correctamente.')
    setOriginalCustomerData(customerData)
  }

  const handleCustomerCancel = () => {
    setCustomerData(originalCustomerData)
    alert('Cambios revertidos a su estado inicial.')
  }

  const hasCustomerChanges = () => {
    return JSON.stringify(customerData) !== JSON.stringify(originalCustomerData)
  }

  return (
    <Container>
      <h2>Editar Mis Datos</h2>
      <form>
        <div className={'profile-body'}>
          <fieldset className='profile-box'>
            <InputGroup
              required
              label={fieldLabels.name}
              name='name'
              value={customerData?.name}
              onChange={handleChange}
              placeholder='Ingresa tu nombre'
            />

            <InputGroup
              required
              label={fieldLabels.lastname}
              name='lastname'
              value={customerData?.lastname}
              onChange={handleChange}
            />
            <InputGroup
              required
              type='email'
              name='email'
              label={fieldLabels.email}
              value={customerData.email}
              onChange={handleChange}
            />
            <InputGroup
              required
              name='idDocument'
              label={fieldLabels.idDocument}
              value={customerData?.idDocument}
              onChange={handleChange}
            />
          </fieldset>
          <fieldset className='profile-box'>
            <InputGroup
              type='tel'
              name='phone'
              label={fieldLabels.phone}
              value={customerData.phone}
              onChange={handleChange}
            />

            <DateInputGroup
              label={fieldLabels.dateOfBirth}
              name='dateOfBirth'
              selectedDate={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              placeholder='DD/MM/AAAA'
            />
            <InputGroup
              as='select'
              name='gender'
              label={fieldLabels.gender}
              value={customerData?.gender}
              onChange={handleChange}
              options={genersData.map((gener) => ({
                value: gener.name,
                name: gener.name,
              }))}
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

export default MyDatas
