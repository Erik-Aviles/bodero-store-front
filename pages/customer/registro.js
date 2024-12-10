import { useEffect, useState } from 'react'
import Layout from '@/components/Layout'
import { Loading } from '@/components/Loading'
import styled, { css } from 'styled-components'
import Title from '@/components/stylesComponents/Title'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { es } from 'date-fns/locale/es'
import { CenterSecction } from '@/components/stylesComponents/CenterSecction'
import { error, greylight, primary, secondary, white } from '@/lib/colors'
import Link from 'next/link'
import {
  ArrowDownIcon,
  CalendarIcon,
  EyeFilledIcon,
  EyeSlashFilledIcon,
} from '@/components/Icons'

const CenterDiv = styled.section`
  padding-bottom: 20px;
  ${CenterSecction}
`

const DivTitle = styled.div`
  margin-bottom: 10px;
  padding: 0 20px 20px;
  border-bottom: 1px solid ${greylight};
  @media screen and (min-width: 768px) {
    padding: 0;
  }
  @media screen and (min-width: 1024px) {
    text-align: center;
  }
`

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;

  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (min-width: 1024px) {
    margin: 0 120px;
  }
`
const RequiredText = styled.span`
  color: ${primary};
  font-size: 12px;
`
const Box = styled.section`
  display: flex;
  flex-direction: column;
  gap: 15px;
  border-bottom: 1px solid #efedef;
  margin-bottom: 20px;
  padding-bottom: 20px;
  letter-spacing: normal;
  height: fit-content;
  padding: 15px;
  strong {
    font-weight: 400;
    color: #0033a0;
  }

  &:nth-child(2) {
    padding-top: 0;
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  fieldset {
    border: none;
    margin: 0;
    padding: 0;
  }
  legend {
    padding-bottom: 10px;
    border-bottom: 1px solid #efedef;
  }
  label {
    font-weight: 400;
  }
  select,
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

  @media screen and (min-width: 768px) {
    border-bottom: none;
    margin-bottom: none;
    padding: 10px 40px;
    &:first-child {
      border-right: 1px solid ${greylight};
    }
    &:nth-child(2) {
      padding-top: 10px;
    }
  }
`
const InnerBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%; /* Ajusta según tus necesidades */
`

const Select = styled.select`
  appearance: none;
  -webkit-appearance: none; /* Para Safari */
  -moz-appearance: none; /* Para Firefox */
  padding: 10px 40px 10px 10px !import;
  color: #333;
  cursor: pointer;

  /* Asegura que el texto no se superponga con el ícono */
  &::-ms-expand {
    display: none; /* Oculta el ícono en IE/Edge */
  }
`

const DivButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  margin: 0 auto;
  padding: 8px;
  width: 300px;
  font-size: 1rem;
  font-weight: 500;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${primary};
  color: ${white};
  border: 1px solid ${primary};
  &:hover {
    background-color: transparent;
    color: ${primary};
    border: 1px solid ${primary};
  }
`

const StyledDatePicker = styled(DatePicker)`
  padding: 10px 40px 10px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;
  cursor: pointer;
`

const iconStyles = css`
  position: absolute;
  right: 25px;
  top: 32px;
  color: blue;
`

const ArrowDown = styled(ArrowDownIcon)`
  width: 15px;
  height: 15px;
  pointer-events: none;
  ${iconStyles}
`

const Calendar = styled(CalendarIcon)`
  position: absolute;
  width: 25px;
  height: 25px;
  right: 20px;
  top: 28px;
  pointer-events: none;
`
const Eye = styled(EyeFilledIcon)`
  width: 18px;
  height: 18px;
  cursor: pointer;
  ${iconStyles}
`

const EyeSlash = styled(EyeSlashFilledIcon)`
  width: 18px;
  height: 18px;
  cursor: pointer;
  ${iconStyles}
`

export default function RegisterPage() {
  const [isUpLoanding, setIsUpLoanding] = useState(true)
  const [isVisiblepass, setIsVisiblePass] = useState(false)
  const [isVisiblePassConfirm, setIsVisiblePassConfirm] = useState(false)

  const toggleVisibilityPass = () => setIsVisiblePass(!isVisiblepass)
  const toggleVisibilityPassConfirm = () =>
    setIsVisiblePassConfirm(!isVisiblePassConfirm)
  const [selectedDate, setSelectedDate] = useState(new Date())

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsUpLoanding(false)
    }, 2000)
    return () => clearTimeout(timeout)
  }, [])

  if (isUpLoanding) {
    return <Loading />
  }

  return (
    <Layout title='B.R.D | Nueva Cuenta'>
      <CenterDiv>
        <DivTitle>
          <Title>Crear una nueva cuenta</Title>
          <RequiredText>(*) Datos Obligatorios</RequiredText>
        </DivTitle>
        <ColumnsWrapper>
          <Box>
            <legend>
              <strong>Información Personal</strong>
            </legend>
            <InnerBox>
              <Container>
                <label>
                  Nombres <RequiredText> *</RequiredText>
                </label>
                <input type='text' title='Nombres' required />
              </Container>
              <Container>
                <label>
                  Apellidos <RequiredText> *</RequiredText>
                </label>
                <input type='text' title='Apellidos' required />
              </Container>
              <Container>
                <label>Fecha de nacimiento</label>
                <StyledDatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  placeholderText='Selecciona una fecha'
                  dateFormat='dd/MM/yyyy'
                  closeOnScroll={(e) => e.target === document}
                  locale={es}
                />
                <Calendar />
              </Container>
              <Container>
                <label>
                  Documento de identidad <RequiredText> *</RequiredText>
                </label>
                <input type='text' title='Documento de identidad' required />
              </Container>
              <Container>
                <label>Sexo</label>
                <Select>
                  <option value='1'>Masculino</option>
                  <option value='2'>Femenino</option>
                  <option value='3'>No especificado</option>
                </Select>
                <ArrowDown />
              </Container>
            </InnerBox>
          </Box>
          <Box>
            <legend>
              <strong>Información de inicio de sesión</strong>
            </legend>
            <InnerBox>
              <Container>
                <label>
                  Correo electrónico <RequiredText> *</RequiredText>
                </label>
                <input type='email' title='Correo electrónico' required />
              </Container>

              <Container>
                <label>
                  Contraseña <RequiredText> *</RequiredText>
                </label>
                <input
                  type={isVisiblepass ? 'text' : 'password'}
                  title='Contraseña'
                  required
                />
                {isVisiblepass ? (
                  <EyeSlash onClick={toggleVisibilityPass} />
                ) : (
                  <Eye onClick={toggleVisibilityPass} />
                )}
              </Container>

              <Container>
                <label>
                  Confirma Contraseña <RequiredText> *</RequiredText>
                </label>
                <input
                  type={isVisiblePassConfirm ? 'text' : 'password'}
                  title='Confirma Contraseña'
                  required
                />

                {isVisiblePassConfirm ? (
                  <EyeSlash onClick={toggleVisibilityPassConfirm} />
                ) : (
                  <Eye onClick={toggleVisibilityPassConfirm} />
                )}
              </Container>
            </InnerBox>
          </Box>
          <div></div>
          <DivButton $primary href={'/registro'} title='Iniciar Sesión'>
            ENVIAR
          </DivButton>
        </ColumnsWrapper>
      </CenterDiv>
    </Layout>
  )
}
