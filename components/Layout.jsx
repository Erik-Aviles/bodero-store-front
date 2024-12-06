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

export default function Layout({
  children,
  title = 'Bodero Racing Development',
  description,
  sity = '',
}) {
  const { company } = useData()
  const urlPath = process.env.NEXT_PUBLIC_URL || 'https://boderoracing.com'

  const { showCart } = useContext(CartContext)
  const [showAuthModal, setShowAuthModal] = useState(false)

  useEffect(() => {
    document.body.style.overflow = showAuthModal ? 'hidden' : ''
    document.body.style.paddingRight = showAuthModal ? '17px' : ''
    return () => {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }, [showAuthModal])

  const toggleAuthModal = () => setShowAuthModal((prev) => !prev)

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta
          name='description'
          content={
            description ||
            'Repuestos, accesorios y servicios de mantenimiento y reparación de motores de moto.'
          }
        />
        <meta name='author' content='Bodero Racing Development' />
        <meta
          name='google-site-verification'
          content='j-w72L50J54GaTEx_tgd-eJTZzi9NGaTrHwDbPKLJTE'
        />
        <link rel='canonical' href={`${urlPath}${sity}`} />
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
