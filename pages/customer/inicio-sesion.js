import { useEffect, useState } from 'react'
import Layout from '@/components/Layout'
import { Loading } from '@/components/Loading'
import styled, { css } from 'styled-components'
import Title from '@/components/stylesComponents/Title'
import { CenterSecction } from '@/components/stylesComponents/CenterSecction'
import { error, greylight, primary, secondary, white } from '@/lib/colors'
import Link from 'next/link'
import InputGroup from '@/components/Account/forms/InputGroup'

const CenterDiv = styled.section`
  ${CenterSecction}
`

const DivTitle = styled.div`
  margin-bottom: 10px;
  padding: 0 20px 20px;
  border-bottom: 1px solid ${greylight};

  span {
    color: ${primary};
    font-size: 12px;
  }

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

const Box = styled.section`
  display: flex;
  flex-direction: column;
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
  ${(props) =>
    props.$primary &&
    css`
      background-color: ${primary};
      color: ${white};
      border: 1px solid ${primary};
      &:hover {
        background-color: transparent;
        color: ${primary};
        border: 1px solid ${primary};
      }
    `};
  ${(props) =>
    props.$secondary &&
    css`
      background-color: ${secondary};
      color: ${white};
      border: 1px solid ${secondary};
      &:hover {
        background-color: transparent;
        color: ${secondary};
      }
    `};
`
const TextLink = styled(Link)`
  width: fit-content;
  font-size: 0.8rem;
  color: #2255c2;
  cursor: pointer;
  &:hover {
    text-decoration-line: underline;
  }
`

export default function LoginPage() {
  const [isUpLoanding, setIsUpLoanding] = useState(true)
  const [isVisiblePass, setIsVisiblePass] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const fieldLabels = {
    email: 'Correo electrónico',
    password: 'Contraseña',
  }

  const toggleVisibilityPassword = () => setIsVisiblePass((prev) => !prev)

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
    <Layout title='B.R.D | Iniciar Sesión'>
      <CenterDiv>
        <DivTitle>
          <Title>Iniciar sesión o crear una cuenta</Title>
          <span>(*) Datos Obligatorios</span>
        </DivTitle>
        <ColumnsWrapper>
          <Box>
            <strong>¿Estás registrado?</strong>
            <p>Por favor completa tus datos para iniciar sesión.</p>
            <form onSubmit={handleSubmit}>
              <fieldset>
                <InputGroup
                  required
                  name='email'
                  label={fieldLabels.email}
                  type='email'
                  value={formData?.email}
                  onChange={handleChange}
                  placeholder='Ingresa tu correo'
                />
              </fieldset>
              <fieldset>
                <InputGroup
                  required
                  name='password'
                  label={fieldLabels.password}
                  isPassword
                  isVisiblePass={isVisiblePass}
                  type={isVisiblePass ? 'text' : 'password'}
                  value={formData?.password}
                  onChange={handleChange}
                  toggleVisibility={toggleVisibilityPassword}
                  placeholder='Ingresa tu contraseña'
                />
              </fieldset>
              <div>
                <TextLink
                  href={'/customer/recuperar-contrasena'}
                  title='¿Olvidó su contraseña?'
                >
                  ¿Olvidó su contraseña?
                </TextLink>
              </div>
              <DivButton $primary title='Iniciar Sesión' type='submit'>
                INICIAR SESIÓN
              </DivButton>
            </form>
          </Box>
          <Box>
            <strong>¿Aún no tienes cuenta?</strong>
            <p>
              Al crear una cuenta en nuestra tienda, podrás ver e informarte
              sobre los pedidos de tu cuenta y su estado.
            </p>
            <DivButton $secondary title='Crear Contraseña'>
              <Link href={'/customer/registro'}>CREAR UNA CUENTA</Link>
            </DivButton>
          </Box>
        </ColumnsWrapper>
      </CenterDiv>
    </Layout>
  )
}
