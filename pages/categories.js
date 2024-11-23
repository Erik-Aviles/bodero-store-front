import { ButtonContainer } from '@/components/buttonComponents/ButtonContainer'
import ButtonDisabled from '@/components/buttonComponents/ButtonDisabled'
import SkeletorCategories from '@/components/skeletor/SkeletorCategories'
import useProductsFilterForCategory from '@/hooks/useProductsFilterForCategory'
import ProductSearchForCategory from '@/components/ProductSearchForCategory'
import BackButton from '@/components/buttonComponents/BackButton'
import Text from '@/components/stylesComponents/HighlightedText'
import Title from '@/components/stylesComponents/Title'
import ItemCard from '@/components/categories/ItemCard'
import Pagination from '@/components/Pagination'
import styled, { css } from 'styled-components'
import filterSearch from '@/utils/filterSearch'
import { grey, secondary } from '@/lib/colors'
import { Loader } from '@/components/Loader'
import { useEffect, useMemo, useState } from 'react'
import { fetcher } from '@/utils/fetcher'
import Layout from '@/components/Layout'
import { useRouter } from 'next/router'
import useSWR from 'swr'

const ContentSection = styled.section`
  height: auto;
  margin: 0 auto;
  background: #f7f7f7;
  padding: 40px 0;
  @media screen and (min-width: 640px) {
    padding: 40px;
  }
`

const Wrapper = styled.div``

const Sorted = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  margin: 0;
  font-size: 0.8rem;
  line-height: 1.25rem;
  @media screen and (max-width: 640px) {
    padding-left: 1.2rem;
  }
`

const BreadCrumb = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
`

const Divider = styled.span`
  color: ${grey};
  padding-left: 0.3rem;
  padding-right: 0.3rem;
`

const ListCategory = styled.ul`
  display: grid;
  grid-template-columns: minmax(100px, 1fr);
  grid-template-rows: minmax(100px, 1fr);
  justify-content: center;
  gap: 15px;
  padding: 0 15px;
  @media screen and (min-width: 641px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-template-rows: 200px;
    padding: 0 80px;
  }
`
const FlexFooter = styled.div`
  width: 100%;
  display: Flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding-bottom: 20px;
`

// tercera solucion
export default function CategoriesPage() {
  const router = useRouter()
  const { query } = router
  const queryCategory = query.category
  const queryPage = parseInt(query.page) || 1
  const pageSize = 20

  const [category, setCategory] = useState(queryCategory || '')
  const [pages, setPages] = useState(queryPage)
  const [pageCat, setPageCat] = useState(queryPage)
  const [nameCategory, setNameCategory] = useState('')

  const apiUrlCategories = `/api/categories?page=${pageCat}`

  const {
    data: categories,
    isLoading: isLoadingCategory,
    mutate: mutateCategories,
  } = useSWR(apiUrlCategories, fetcher)

  const allCategories = categories?.categories

  const categoryNames = useMemo(
    () =>
      allCategories
        ?.slice(0, 7)
        ?.map((cat) => cat.name.charAt(0).toUpperCase() + cat.name.slice(1))
        ?.join(', '),
    [allCategories]
  )

  const {
    products,
    isLoadingProduct,
    isErrorProducts,
    isValidating,
    totalProducts,
    mutateProducts,
  } = useProductsFilterForCategory(category, pages, pageSize)

  useEffect(() => {
    if (queryCategory && allCategories) {
      const matchedCategory = allCategories.find(
        (cat) => cat._id === queryCategory
      )
      setNameCategory(matchedCategory?.name || '')
    } else {
      // Si no hay categoría seleccionada, limpia el estado
      setNameCategory('')
    }
    setPages(queryPage)
    setCategory(queryCategory)
  }, [allCategories, queryPage, queryCategory])

  const handlePageChange = (newPage, setPage, mutate) => {
    setPage(newPage)
    filterSearch({ router, page: newPage })
    mutate()
  }

  const handlePageChangePro = (pagNum) => {
    setPages(pagNum)
    filterSearch({ router, category: category, page: pagNum })
  }

  const handleGoBack = (currentPage, setPage, mutate) => {
    if (query.page > 1) {
      const newPage = parseInt(currentPage - 1)
      setPage(newPage)
      filterSearch({ router, page: newPage })
      mutate()
    }
    router.back()
  }

  const renderCategorySection = () => {
    if (isLoadingCategory) return <SkeletorCategories />

    return (
      <>
        <ListCategory>
          {allCategories?.map((item) => (
            <ItemCard key={item._id} item={item} />
          ))}
        </ListCategory>
        <ButtonContainer>
          <ButtonDisabled
            $black
            onClick={() =>
              handlePageChange(pageCat - 1, setPageCat, mutateCategories)
            }
            disabled={pageCat <= 1}
          >
            Anterior
          </ButtonDisabled>
          <ButtonDisabled
            $white
            onClick={() =>
              handlePageChange(pageCat + 1, setPageCat, mutateCategories)
            }
            disabled={categories?.result !== pageSize}
          >
            Siguiente
          </ButtonDisabled>
        </ButtonContainer>
      </>
    )
  }

  const renderFooter = () => {
    const totalPagesCategory = categories
      ? Math.ceil(categories.totalCategories / pageSize)
      : 1
    const totalPagesProducts = products
      ? Math.ceil(totalProducts / pageSize)
      : 1
    return (
      <FlexFooter>
        <Text>Página</Text>
        <Text $big>{category ? pages : pageCat}</Text>
        <Text>de</Text>
        <Text $big>{category ? totalPagesProducts : totalPagesCategory},</Text>
        <Text>Total de {category ? 'producto/s' : 'categorías'}:</Text>
        <Text $big>
          {category ? totalProducts : categories?.totalCategories}
        </Text>
      </FlexFooter>
    )
  }

  return (
    <Layout
      title={`B.R.D | ${nameCategory?.toUpperCase() || 'Categoría'}`}
      description={`Explora nuestra amplia selección de categorías para motos: ${categoryNames}, entre otras.`}
      sity='/categories'
    >
      <ContentSection>
        <Title>Categorías</Title>
        {queryCategory ? (
          <>
            <Sorted>
              <BackButton
                onClick={() => handleGoBack(pages, setPages, mutateProducts)}
              />
              <BreadCrumb>
                <Text>Categoría</Text>
                <Divider> / </Divider>
                <Text $big>
                  {isLoadingProduct ? <Loader /> : nameCategory?.toUpperCase()}
                </Text>
              </BreadCrumb>
            </Sorted>
            <Wrapper>
              <ProductSearchForCategory
                products={products}
                isLoading={isLoadingProduct}
                totalProducts={totalProducts}
                isValidating={isValidating}
                isError={isErrorProducts}
                nameCategory={nameCategory}
              />
            </Wrapper>
            <Pagination
              currentPage={pages}
              onPageChange={handlePageChangePro}
              totalPages={Math.ceil(totalProducts / pageSize)}
              isLoading={isLoadingProduct || isValidating}
            />
          </>
        ) : (
          <>
            <Sorted>
              <BackButton
                onClick={() =>
                  handleGoBack(pageCat, setPageCat, mutateCategories)
                }
              />
              <BreadCrumb>
                <Text>Total,</Text>
                <Text $big>
                  {isLoadingCategory ? <Loader /> : categories?.totalCategories}
                </Text>
                <Text>Categorías.</Text>
              </BreadCrumb>
            </Sorted>
            <Wrapper>{renderCategorySection()}</Wrapper>
          </>
        )}
        {renderFooter()}
      </ContentSection>
    </Layout>
  )
}
