import styled from "styled-components";
import { useRouter } from "next/router";
import { greylight, primary, white } from "@/lib/colors";

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 0;
  overflow: auto;
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
  );
};

export default Pagination;
