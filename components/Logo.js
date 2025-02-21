import cloudinaryLoader from './loaderes/cloudinaryLoader'
import logoLetras from '../public/logoLetras.jpg'
import localLoader from './loaderes/localLoader'
import { useData } from '@/hooks/useData'
import styled from 'styled-components'
import logo from '../public/logo.jpg'
import Image from 'next/image'
import Link from 'next/link'

const Figure = styled.figure`
  width: auto;
  height: auto;
  margin: 0;
  img {
    width: 150px;
    padding: 5px;
    object-fit: unset;
  }

  @media screen and (min-width: 640px) {
    img {
      width: 200px;
    }
  }
`

export const LogoFull = ({ href }) => {
  const { company } = useData()
  const mainlogo = company?.mainlogo

  return (
    <Link href={href}>
      <Figure>
        <Image
          loader={mainlogo ? cloudinaryLoader : localLoader}
          alt='Logo B.D.R'
          src={mainlogo ? mainlogo : logo}
          width={200}
          height={110}
          priority={true}
        />
      </Figure>
    </Link>
  )
}

export const LogoLetters = ({ href }) => {
  const { company } = useData()
  const secondarylogo = company?.secondarylogo

  return (
    <Link href={href}>
      <Figure>
        <Image
          loader={secondarylogo ? cloudinaryLoader : localLoader}
          priority={true}
          alt='Logo B.D.R'
          src={secondarylogo ? secondarylogo : logoLetras}
          width={300}
          height={140}
        />
      </Figure>
    </Link>
  )
}
