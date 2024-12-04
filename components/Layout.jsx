import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'
import CategoriesComponent from './categories/CategoriesComponent'
import NavMovil from './NavMovil'
import DropdownCartComponents from './cart/DropdownCartComponents'
import { useContext, useEffect, useState } from 'react'
import { CartContext } from '@/context/CartContext'
import AuthModal from './auth/AuthModal'
import { useData } from '@/hooks/useData'

export default function Layout({ children, title, description, sity }) {
  const { company } = useData()
  const mainlogo = company?.mainlogo

  const { showCart } = useContext(CartContext)
  const [showAuthModal, setShowAuthModal] = useState(false)

  useEffect(() => {
    if (showAuthModal) {
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = '17px'
    } else {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }

    return () => {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }, [showAuthModal])

  const toggleAuthModal = () => {
    setShowAuthModal(!showAuthModal)
  }

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta
          name='description'
          content={
            description ||
            'Repuestos, accesorios y servicios para vehículos y reparación de motores de moto.'
          }
        />
        <meta name='author' content='Bodero Racing Development' />
        <meta
          name='google-site-verification'
          content='j-w72L50J54GaTEx_tgd-eJTZzi9NGaTrHwDbPKLJTE'
        />
        <link rel='canonical' href={`https://boderoracing.com${sity}`} />
      </Head>
      {showAuthModal && <AuthModal toggleAuthModal={toggleAuthModal} />}
      <Header showAuthModal={showAuthModal} toggleAuthModal={toggleAuthModal} />
      <CategoriesComponent />
      <main>{children}</main>
      <Footer />
      {showCart && <DropdownCartComponents />}
      <NavMovil />
    </div>
  )
}
