import { useEffect, useState } from 'react'
import Layout from '@/components/Layout'
import { Loading } from '@/components/Loading'
import styled, { css } from 'styled-components'
import Title from '@/components/stylesComponents/Title'
import 'react-datepicker/dist/react-datepicker.css'
import { CenterSecction } from '@/components/stylesComponents/CenterSecction'
import { error, greylight, primary, white } from '@/lib/colors'
import InputGroup from '@/components/Account/forms/InputGroup'

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

const RequiredText = styled.span`
  color: ${primary};
  font-size: 12px;
`
const Box = styled.section`
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding-bottom: 20px;
  letter-spacing: normal;
  height: fit-content;
  padding: 15px;
  strong {
    font-weight: 400;
    color: #0033a0;
  }
  p {
    font-size: 12px;
  }
  fieldset {
    border: none;
    margin: 0;
    padding: 0;
  }
  legend {
    border-bottom: 1px solid #efedef;
    padding-bottom: 10px;
  }

  @media screen and (min-width: 768px) {
    padding: 10px 40px;
    p {
      font-size: 14px;
    }
  }
`
const InnerBox = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%; /* Ajusta según tus necesidades */
`

const DivButton = styled.button`
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
  background-color: #013c92;
  color: ${white};
  border: 1px solid #013c92;
  &:hover {
    background-color: transparent;
    color: #013c92;
    border: 1px solid #013c92;
  }
`

export default function RecoverPasswordPage() {
  const [isUpLoanding, setIsUpLoanding] = useState(true)
  const [formData, setFormData] = useState({
    email: '',
  })

  const fieldLabels = {
    email: 'Correo electrónico registrado',
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormData({
      ...formData,
    })

    // Lógica para enviar los datos del formulario
    console.log('Formulario enviado', formData)
    alert('Formulario enviado')
  }

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
    <Layout title='B.R.D | Recuperar Contraseña'>
      <CenterDiv>
        <DivTitle>
          <Title>Recuperar Contraseña</Title>
          <RequiredText>(*) Datos Obligatorios</RequiredText>
        </DivTitle>
        <Box>
          <legend>
            <strong>¿Olvidaste tu contraseña?</strong>
          </legend>
          <p>
            Por favor ingrese su dirección de correo electrónico. Recibirá un
            enlace para restablecer su contraseña.
          </p>
          <InnerBox onSubmit={handleSubmit}>
            <Container>
              <InputGroup
                required
                name='email'
                label={fieldLabels.email}
                type='email'
                value={formData?.email}
                onChange={handleChange}
                placeholder='Ingresa tu correo'
              />
            </Container>
            <DivButton type='submit' title='Recuperar Contraseña'>
              ENVIAR
            </DivButton>
          </InnerBox>
        </Box>
      </CenterDiv>
    </Layout>
  )
}
