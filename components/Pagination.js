import styled from "styled-components";
import { greylight, success, white } from "@/lib/colors";

const PaginationContainer = styled.section`
  width: 100%;
  height: auto;
  padding: 10px 20px;
  display: flex;
  justify-content: center;
`;
const PaginationWrapper = styled.div`
  max-width: 800px;
  position: relative;
  display: flex;
  padding: 20px 0;
  overflow-x: auto;
  white-space: nowrap;
`;

const PageButton = styled.button`
  margin: 0 5px;
  padding: 10px 20px;
  border: 0;
  outline: 1px solid ${greylight};
  border-radius: 3px;
  background: ${(props) => (props.$active ? success : white)};
  color: ${(props) => (props.$active ? white : success)};
  cursor: pointer;

  &:hover {
    background: ${(props) => (props.$active ? "green" : "#f0f0f0")};
  }

  @media (max-width: 600px) {
    padding: 8px 16px;
    font-size: 14px;
  }
`;

const Pagination = ({ currentPage, onPageChange, totalPages, isLoading }) => {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  const handlePageClick = (page) => {
    if (!isLoading) {
      onPageChange(page);
    }
  };

  return (
    <PaginationContainer>
      <PaginationWrapper>
        {pages.map((page) => (
          <PageButton
            key={page}
            onClick={() => handlePageClick(page)}
            $active={page === currentPage}
            disabled={isLoading}
          >
            {page}
          </PageButton>
        ))}
      </PaginationWrapper>
    </PaginationContainer>
  );
};

export default Pagination;

/* const Pagination = ({ totalResults, resultsPerPage, currentPage }) => {
  const router = useRouter();
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  const handlePageClick = (page) => {
    const query = { ...router.query, page };
    router.push(
      {
        pathname: router.pathname,
        query,
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <PaginationContainer>
      <PaginationWrapper>
        {[...Array(totalPages)].map((_, index) => {
          const page = index + 1;
          return (
            <PageButton
              key={page}
              $active={page === currentPage}
              onClick={() => handlePageClick(page)}
            >
              {page}
            </PageButton>
          );
        })}
      </PaginationWrapper>
    </PaginationContainer>
  );
};

export default Pagination; */
