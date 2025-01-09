import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'
import NavMovil from './NavMovil'
import CategoriesComponent from './categories/CategoriesComponent'

export default function Layout({
  children,
  title = 'Bodero Racing Development',
  description,
  sity = '',
}) {
  const urlPath = process.env.NEXT_PUBLIC_URL || 'https://boderoracing.com'

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

      <Header />
      <CategoriesComponent />
      <main>{children}</main>
      <Footer />
      <NavMovil />
    </div>
  )
}
