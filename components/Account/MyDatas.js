import { customerInfo, genersData } from '@/resource/curtomerData'
import React, { useState } from 'react'
import InputGroup from './forms/InputGroup'
import DateInputGroup from './forms/DateInputGroup'
import {
  Button,
  Container,
  Form,
  TitleH2,
  Wrapper,
  WrapperButton,
} from '../stylesComponents/ComponentAccount'
import BackButton from '../buttonComponents/BackButton'
import { handleGoBack } from '@/utils/handleGoBack'

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
      <header>
        <BackButton onClick={handleGoBack} />
        <TitleH2>Editar Mis Datos</TitleH2>
      </header>
      <Wrapper>
        <Form>
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
          <WrapperButton>
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
          </WrapperButton>
        </Form>
      </Wrapper>
    </Container>
  )
}

export default MyDatas
