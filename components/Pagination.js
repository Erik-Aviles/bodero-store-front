import styled from "styled-components";
import { useRouter } from "next/router";
import { greylight, primary, white } from "@/lib/colors";

const PaginationContainer = styled.section`
  width: 100%;
  height: auto;
  padding: 10px 20px 30px;
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
  background: ${(props) => (props.$active ? "#df5414" : white)};
  color: ${(props) => (props.$active ? white : "#df5414")};
  cursor: pointer;

  &:hover {
    background: ${(props) => (props.$active ? primary : "#f0f0f0")};
  }

  @media (max-width: 600px) {
    padding: 8px 16px;
    font-size: 14px;
  }
`;

const Pagination = ({ totalResults, resultsPerPage, currentPage }) => {
  const router = useRouter();
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  const handlePageClick = (page) => {
    const query = { ...router.query, page };
    router.push({
      pathname: router.pathname,
      query,
    });
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

export default Pagination;
