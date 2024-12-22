import Layout from '@/components/Layout'
import { CenterSecction } from '@/components/stylesComponents/CenterSecction'
import { black, blue, primary, white2 } from '@/lib/colors'
import React, { useState } from 'react'
import styled from 'styled-components'
import MyDatas from '@/components/Account/MyDatas'
import MyOrders from '@/components/Account/MyOrders'
import MyAddress from '@/components/Account/MyAddress'
import MyPanel from '@/components/Account/MyPanel'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Authentication from '@/components/Account/Authentication'

const CenterDiv = styled.section`
  ${CenterSecction}
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 10px;
  font-size: 0.9rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
    padding: 40px 0;
  }
`

const AsideBar = styled.aside`
  width: 250px;
  background-color: ${black};
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 20px;
  color: ${white2};
  @media (max-width: 768px) {
    width: 100%;
    background-color: inherit;
    color: ${black};
  }
`

const AsideList = styled.ul`
  display: flex;
  justify-content: space-between;
  list-style: none;
  padding: 0;
  margin: 0;
  @media (min-width: 768px) {
    flex-direction: column;
  }
`

const AsideItem = styled.li`
  margin-bottom: 15px;

  a {
    cursor: pointer;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s;

    &:hover {
      color: ${primary};
    }

    /* Estilo dinámico si está seleccionado */
    ${({ $isSelected }) =>
      $isSelected &&
      `
        color: ${primary};
        font-weight: bold;
      `}
  }
`

const MainContent = styled.main`
  flex-grow: 1;
  background-color: #ffffff;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 15px;
  width: 100%;
  min-height: 400px;

  @media (max-width: 768px) {
    padding: 20px;
    min-height: fit-content;
  }
`

const AccountPage = () => {
  const router = useRouter()
  const { section } = router.query

  const isActive = (querySection) =>
    (!section && querySection === 'general') || section === querySection

  const renderContent = () => {
    switch (section) {
      case 'perfil':
        return <MyDatas />
      case 'pedidos':
        return <MyOrders />
      case 'direcciones':
        return <MyAddress />
      case 'cambiar-contrasena':
        return <Authentication />
      default:
        return <MyPanel />
    }
  }

  return (
    <Layout title='B.R.D | Mi Cuenta'>
      <CenterDiv>
        <AsideBar>
          <AsideList>
            <AsideList>
              <AsideItem $isSelected={isActive('general')}>
                <Link href='/customer/mi-cuenta'>General</Link>
              </AsideItem>
              <AsideItem $isSelected={isActive('perfil')}>
                <Link href='/customer/mi-cuenta?section=perfil'>Perfil</Link>
              </AsideItem>
              <AsideItem $isSelected={isActive('pedidos')}>
                <Link href='/customer/mi-cuenta?section=pedidos'>Pedidos</Link>
              </AsideItem>
              <AsideItem $isSelected={isActive('direcciones')}>
                <Link href='/customer/mi-cuenta?section=direcciones'>
                  Direcciones
                </Link>
              </AsideItem>
              <AsideItem $isSelected={isActive('cambiar-contrasena')}>
                <Link href='/customer/mi-cuenta?section=cambiar-contrasena'>
                  Autenticación
                </Link>
              </AsideItem>
              <AsideItem>
                <Link href='/'>Salir</Link>
              </AsideItem>
            </AsideList>
          </AsideList>
        </AsideBar>
        <MainContent>{renderContent()}</MainContent>
      </CenterDiv>
    </Layout>
  )
}

export default AccountPage
