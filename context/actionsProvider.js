import { useState, useEffect, createContext } from 'react'
// import { generarId } from "@/helpers";
import { signOut } from 'next-auth/react'
// import Swal from "sweetalert2";

export const ActionsContext = createContext()

export const ActionsProvider = ({ children }) => {
  const [modalOpenAuth, setModalOpenAuth] = useState(false)
  const [modalOpenMenu, setModalOpenMenu] = useState(false)
  const [modalOpenCart, setModalOpenCart] = useState(false)

  const toggleAuthModal = () => setModalOpenAuth((prev) => !prev)
  const toggleModalOpenMenu = () => setModalOpenMenu((prev) => !prev)
  const toggleModalOpenCart = () => setModalOpenCart((prev) => !prev)

  const [navbar, setNavbar] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      const isLaptopSize = window.innerWidth >= 992

      if (isLaptopSize && modalOpenCart) {
        document.body.style.overflow = 'hidden'
        document.body.style.paddingRight = '17px'
      } else {
        document.body.style.overflow = ''
        document.body.style.paddingRight = ''
      }
    }

    handleResize() // Ejecutar al cargar para aplicar si ya está en laptop

    window.addEventListener('resize', handleResize)
    return () => {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
      window.removeEventListener('resize', handleResize)
    }
  }, [modalOpenAuth, modalOpenCart])

  const changeNavbar = () => {
    setNavbar(!navbar)
    localStorage.setItem('navbar', !navbar)
  }
  const cerrar = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <ActionsContext.Provider
      value={{
        modalOpenCart,
        modalOpenAuth,
        modalOpenMenu,
        toggleAuthModal,
        toggleModalOpenMenu,
        toggleModalOpenCart,
        cerrar,
      }}
    >
      {children}
    </ActionsContext.Provider>
  )
}
