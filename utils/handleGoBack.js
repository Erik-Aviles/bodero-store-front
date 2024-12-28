import { useRouter } from 'next/router'

export const handleGoBack = (e) => {
  const router = useRouter()
  e.preventDefault()
  router.back()
}
