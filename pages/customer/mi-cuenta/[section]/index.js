import React, { useState } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Layout from '@/components/Layout'
import { CenterSecction } from '@/components/stylesComponents/CenterSecction'
import { black, blue, primary, white2 } from '@/lib/colors'
import MyDatas from '@/components/Account/MyDatas'
import MyOrders from '@/components/Account/MyOrders'
import MyAddress from '@/components/Account/MyAddress'
import MyPanel from '@/components/Account/MyPanel'
import Authentication from '@/components/Account/Authentication'
import {
  AddressIcon,
  AuthIcon,
  GeneralIcon,
  LogoutIcon,
  ProfileEditIcon,
  ShowAllOrdersIcon,
} from '@/components/Icons'
import { customerInfo } from '@/resource/curtomerData'
import Order from '@/components/Account/Order'

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
    padding: 40px 5px;
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
  align-items: center;
  justify-content: space-between;
  list-style: none;
  padding: 0;
  margin: 0;
  @media (min-width: 768px) {
    flex-direction: column;
    align-items: inherit;
    gap: 20px;
  }
`

const AsideItem = styled.li`
  a {
    cursor: pointer;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s;
    display: flex;

    &:hover {
      color: ${primary};
      font-weight: bold;
    }

    /* Estilo dinámico si está seleccionado */
    ${({ $isSelected }) =>
      $isSelected &&
      `
        color: ${primary};
        font-weight: bold;
      `}

    span {
      display: inline;
    }
    svg {
      display: none;
    }

    /* Mostrar el svg solo en dispositivos móviles */
    @media (max-width: 900px) {
      span {
        display: none;
      }

      svg {
        display: inline;
      }
    }
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
  const { section, pedido } = router.query

  const isActive = (querySection) =>
    (!section && querySection === 'general') || section === querySection

  const renderContent = () => {
    if (section === 'pedidos' && pedido) {
      return <Order />
    }

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
            <AsideItem $isSelected={isActive('general')}>
              <Link href='/customer/mi-cuenta/general'>
                <span>General</span>
                <GeneralIcon />
              </Link>
            </AsideItem>
            <AsideItem $isSelected={isActive('perfil')}>
              <Link href='/customer/mi-cuenta/perfil'>
                <span>Perfil</span>
                <ProfileEditIcon />
              </Link>
            </AsideItem>
            <AsideItem $isSelected={isActive('pedidos') || isActive('pedido')}>
              <Link href='/customer/mi-cuenta/pedidos'>
                <span>Pedidos</span>
                <ShowAllOrdersIcon size={32} />
              </Link>
            </AsideItem>
            <AsideItem $isSelected={isActive('direcciones')}>
              <Link href='/customer/mi-cuenta/direcciones'>
                <span>Direcciones</span>
                <AddressIcon />
              </Link>
            </AsideItem>
            <AsideItem $isSelected={isActive('cambiar-contrasena')}>
              <Link href='/customer/mi-cuenta/cambiar-contrasena'>
                <span> Autenticación</span>
                <AuthIcon />
              </Link>
            </AsideItem>
            <AsideItem>
              <Link href='/'>
                <span> Salir</span>
                <LogoutIcon />
              </Link>
            </AsideItem>
          </AsideList>
        </AsideBar>
        <MainContent>{renderContent()}</MainContent>
      </CenterDiv>
    </Layout>
  )
}

export default AccountPage
