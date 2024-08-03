import React from "react";
import styled from "styled-components";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { greylight, primary, white } from "@/lib/colors";

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
  gap: 5px;
  padding: 20px 0;
  overflow-x: auto;
  white-space: nowrap;
`;

const PageButton = styled.button`
  width: 36px;
  height: 36px;
  border: 0;
  outline: 1px solid ${greylight};
  background: ${(props) => (props.$active ? primary : white)};
  color: ${(props) => (props.$active ? white : primary)};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;

  &:hover {
    background: ${(props) => (props.disabled ? "" : "#f0f0f0")};
  }
`;
const NavigationButton = styled.button`
  width: 36px;
  height: 36px;
  border: 0;
  background: ${white};
  color: ${(props) => (props.disabled ? greylight : primary)};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;

  &:hover {
    background: ${(props) => (props.disabled ? "" : "#f0f0f0")};
  }
`;

const Dots = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 26px;
  height: 36px;
  border: 0;
  background: ${white};
  color: ${greylight};
  cursor: default;
`;

const Pagination = ({ currentPage, onPageChange, totalPages, isLoading }) => {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  const handlePageClick = (page) => {
    if (!isLoading) {
      onPageChange(page);
    }
  };

  const getPageButtons = () => {
    let buttons = [];

    if (totalPages <= 5) {
      buttons = pages;
    } else {
      if (currentPage <= 4) {
        buttons = [1, 2, 3, 4, 5, "...", totalPages];
      } else if (currentPage >= totalPages - 3) {
        buttons = [
          1,
          "...",
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        ];
      } else {
        buttons = [
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages,
        ];
      }
    }

    return buttons;
  };

  const pageButtons = getPageButtons();

  return (
    <PaginationContainer>
      <PaginationWrapper>
        <NavigationButton
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={isLoading || currentPage === 1}
        >
          <FaChevronLeft />
        </NavigationButton>
        {pageButtons.map((page, index) => (
          <React.Fragment key={index}>
            {page === "..." ? (
              <Dots>...</Dots>
            ) : (
              <PageButton
                onClick={() => handlePageClick(page)}
                $active={page === currentPage}
                disabled={isLoading}
              >
                {page}
              </PageButton>
            )}
          </React.Fragment>
        ))}
        <NavigationButton
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={isLoading || currentPage === totalPages || totalPages === 1}
        >
          <FaChevronRight />
        </NavigationButton>
      </PaginationWrapper>
    </PaginationContainer>
  );
};

export default Pagination;
