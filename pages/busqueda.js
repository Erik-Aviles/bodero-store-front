import React, { useContext, useEffect, useMemo, useState } from 'react'
import { useData } from '@/hooks/useData'
import BackButton from '@/components/buttonComponents/BackButton'
import { fetchProductsFilter } from '@/utils/FetchProductsFilter'
import NotificationContext from '@/context/NotificationContext'
import SearchProducts from '@/components/SearchProducts'
import Title from '@/components/stylesComponents/Title'
import ProductSearch from '@/components/ProductSearch'
import useProductsAll from '@/hooks/useProductsAll'
import Pagination from '@/components/Pagination'
import filterSearch from '@/utils/filterSearch'
import styled, { css } from 'styled-components'
import { grey, secondary } from '@/lib/colors'
import { useDebounce } from 'use-debounce'
import Layout from '@/components/Layout'
import { useRouter } from 'next/router'
import { useHandleGoBack } from '@/hooks/useHandleGoBack'

const CenterDiv = styled.section`
  margin: 0 auto;
  background: #f7f7f7;
  padding: 0 0 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media screen and (min-width: 640px) {
    padding: 0 40px 40px;
  }
`
const Wrapper = styled.section``

const Descriptionresults = styled.div`
  display: Flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 5px;
  padding: 10px;
  @media screen and (min-width: 640px) {
    flex-direction: row;
    align-items: center;
  }
`

const GroupedItems = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`

const Text = styled.span`
  font-size: 0.8rem;
  white-space: break-spaces;
  color: ${grey};
  ${(props) =>
    props.$highlighted &&
    css`
      color: ${secondary};
      font-weight: 500;
    `};
`
const WrapperProductFilter = styled.div`
  flex-basis: 70%;
  @media screen and (min-width: 768px) {
    padding: 0;
    flex-basis: 50%;
  }
`

const TextMsg = styled.p`
  font-size: 1.3rem;
  color: ${grey};
  font-weight: 500;
  padding: 0 20px;
  margin: 0 0 8px;
  ${(props) =>
    props.$small &&
    css`
      font-size: 0.8rem;
      font-weight: 400;
    `};
`
const Divider = styled.span`
  color: ${grey};
  padding-left: 0.3rem;
  padding-right: 0.3rem;
`

const ResultsSession = styled.section`
  min-height: 250px;
`

const SearchPage = () => {
  const handleGoBack = useHandleGoBack()
  const { company } = useData()
  const brands = company?.brands

  const { showNotification } = useContext(NotificationContext)
  const pageSize = 20
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [debouncedSearch] = useDebounce(search, 500)
  const [allProducts, setAllProducts] = useState([])
  const [pag, setPag] = useState(1)
  const minLength = 3

  const { products, isError, isLoading, mutate } = useProductsAll()

  useEffect(() => {
    setAllProducts(products)
  }, [products])

  useEffect(() => {
    const query = router.query.q
    if (query) {
      setSearch(query)
      setPag(parseInt(router.query.page) || 1)
    }
  }, [router.query.q, router.query.page])

  const filteredAndPaginatedProducts = useMemo(() => {
    return fetchProductsFilter(
      allProducts,
      debouncedSearch,
      minLength,
      pag,
      pageSize
    )
  }, [allProducts, debouncedSearch, minLength, pag, pageSize])

  const pages = Math.ceil(filteredAndPaginatedProducts.length / pageSize)

  const items = useMemo(() => {
    const start = (pag - 1) * pageSize
    const end = start + pageSize

    return filteredAndPaginatedProducts.slice(start, end)
  }, [pag, filteredAndPaginatedProducts, pageSize])

  const handleSearch = (event) => {
    event.preventDefault()
    if (search) {
      const formData = new FormData(event.target)
      const searchQuery = formData.get('search')
      setSearch(searchQuery.toLowerCase())
      filterSearch({ router, q: searchQuery.toLowerCase(), page: 1 })
    } else {
      showNotification({
        open: true,
        msj: 'Debe de escribir al menos 3 caracteres',
        status: 'error',
      })
    }
  }

  const handlePageChange = (pagNum) => {
    setPag(pagNum)
    filterSearch({ router, q: search, page: pagNum })
  }

  const brandNames = brands?.map((brand) => brand.name)
  const brandNamesCapitalized = brandNames?.map((name) =>
    name
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  )
  const brandNamesString = brandNamesCapitalized?.join(', ')

  return (
    <Layout
      title='B.R.D | Busqueda de productos'
      description={`Encuentra fácilmente repuestos, accesorios. Usa nuestra búsqueda para hallar justo lo que necesitas en las marcas: ${brandNamesString}.`}
    >
      <CenterDiv>
        <Wrapper>
          <Descriptionresults aria-label='breadcrumb'>
            <GroupedItems>
              <BackButton onClick={handleGoBack} />
              <Title>Búsqueda de productos </Title>
            </GroupedItems>
            {search && (
              <GroupedItems>
                <Text>Producto</Text>
                <Divider> / </Divider>
                <Text $highlighted={1}>
                  {search ? search.toUpperCase() : 'Todos los productos'}
                </Text>
              </GroupedItems>
            )}
          </Descriptionresults>
          <Descriptionresults aria-label='breadcrumb'>
            {!search ? (
              <Text>Resultados de la búsqueda</Text>
            ) : (
              <Text>
                Hay (
                <Text $highlighted={1}>
                  {filteredAndPaginatedProducts.length}
                </Text>
                ) Productos.
              </Text>
            )}
            <WrapperProductFilter>
              <SearchProducts
                name='search'
                search={search}
                onSubmit={handleSearch}
                setSearch={setSearch}
              />
            </WrapperProductFilter>
          </Descriptionresults>
        </Wrapper>

        <ResultsSession>
          {items.length > 0 ? (
            <>
              <ProductSearch
                products={items}
                isLoading={isLoading}
                isError={isError}
              />
              <Pagination
                currentPage={pag}
                onPageChange={handlePageChange}
                totalPages={pages}
                isLoading={isLoading}
              />
            </>
          ) : (
            <>
              <TextMsg>
                No se han encontrado coincidencias con tu búsqueda.
              </TextMsg>
              <TextMsg $small={1}>
                Usa otras palabras para describir lo que necesitas.
              </TextMsg>
            </>
          )}
        </ResultsSession>
      </CenterDiv>
    </Layout>
  )
}
export default SearchPage
