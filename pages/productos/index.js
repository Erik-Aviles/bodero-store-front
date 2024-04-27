import React, { Suspense } from "react";
import { v4 as uuid } from "uuid";
import Link from "next/link";
import clsx from "clsx";
import { products } from "@/lib/products";
import styled from "styled-components";

import Skeleton from "@/components/Skeleton";
import Search from "@/components/Search";
import { useRouter } from "next/router";
import Movies from "@/components/Movies";
import Await from "@/components/Await";

const StyledSection = styled.section`
  padding-top: 6rem; /* Equivalente a py-24 */
`;

const StyledContainer = styled.div`
  margin-bottom: 3rem; /* Equivalente a mb-12 */
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4rem;
`;

const StyledH1 = styled.h1`
  font-size: 1.875rem; /* Equivalente a text-3xl */
  font-weight: bold; /* Equivalente a font-bold */
`;

const StyledLink = styled.a`
  border-radius: 0.375rem; /* Equivalente a rounded */
  border: 1px solid #d1d5db; /* Equivalente a border */
  background-color: #f3f4f6; /* Equivalente a bg-gray-100 */
  padding: 0.25rem 0.75rem; /* Equivalente a px-3 py-1 */
  font-size: 0.875rem; /* Equivalente a text-sm */
  color: #4b5563; /* Equivalente a text-gray-800 */

  &.disabled {
    pointer-events: none;
    opacity: 0.5;
  }
`;

const Page = () => {
  const router = useRouter();
  const { query } = router;
  console.log(query);
  console.log(router);
  const page = (query.page = 1);
  const limit = (query.limit = 10);
  const search = query.search === "string" ? query.search : undefined;

  const promise = getMovies({ page, limit, query: search });

  return (
    <StyledSection key={uuid()}>
      <StyledContainer>
        <StyledH1>Productos</StyledH1>

        <div>
          <Search search={search} />
        </div>

        <div className="flex space-x-6">
          <Link
            href={{
              pathname: "/productos",
              query: {
                ...(search ? { search } : {}),
                page: page > 1 ? page - 1 : 1,
              },
            }}
          >
            <StyledLink className={clsx(page <= 1 && "disabled")}>
              Anterior
            </StyledLink>
          </Link>
          <Link
            href={{
              pathname: "/productos",
              query: {
                ...(search ? { search } : {}),
                page: page + 1,
              },
            }}
          >
            <StyledLink>Siguiente</StyledLink>
          </Link>
        </div>
      </StyledContainer>

      <Suspense fallback={<Skeleton />}>
        <Await promise={promise}>
          {({ products }) => <Movies products={products} />}
        </Await>
      </Suspense>
    </StyledSection>
  );
};

export default Page;
