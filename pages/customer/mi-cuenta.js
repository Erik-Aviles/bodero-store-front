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
  }
`

const AsideBar = styled.aside`
  width: 250px;
  background-color: ${black};
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 20px;

  @media (max-width: 768px) {
    width: 100%;
  }
`

const AsideList = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 0;
  margin: 0;
  @media (max-width: 768px) {
    justify-content: space-between;
  }
`

const AsideItem = styled.li`
  margin-bottom: 15px;

  a {
    cursor: pointer;
    text-decoration: none;
    color: ${white2};
    font-weight: 500;
    transition: color 0.3s;

    &:hover {
      color: ${primary};
    }
  }
`

const MainContent = styled.main`
  flex-grow: 1;
  background-color: #ffffff;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 20px;
  width: 100%;
  min-height: 400px;

  @media (max-width: 768px) {
    padding: 15px;
  }
`

const AccountPage = () => {
  const [selectedOption, setSelectedOption] = useState('myPanel')

  const renderContent = () => {
    switch (selectedOption) {
      case 'myPanel':
        return <MyPanel />
      case 'myDatas':
        return <MyDatas />
      case 'myOrders':
        return <MyOrders />
      case 'myAddress':
        return <MyAddress />
      default:
        return null
    }
  }

  return (
    <Layout title='B.R.D | Mi Cuenta'>
      <CenterDiv>
        <AsideBar>
          <AsideList>
            <AsideItem>
              <a onClick={() => setSelectedOption('myPanel')}>General</a>
            </AsideItem>
            <AsideItem>
              <a onClick={() => setSelectedOption('myDatas')}>Mis Datos</a>
            </AsideItem>
            <AsideItem>
              <a onClick={() => setSelectedOption('myOrders')}>Mis Pedidos</a>
            </AsideItem>
            <AsideItem>
              <a onClick={() => setSelectedOption('myAddress')}>
                Mis Direcciones
              </a>
            </AsideItem>
            <AsideItem>
              <Link href={'/'}>Salir</Link>
            </AsideItem>
          </AsideList>
        </AsideBar>
        <MainContent>{renderContent()}</MainContent>
      </CenterDiv>
    </Layout>
  )
}

export default AccountPage
