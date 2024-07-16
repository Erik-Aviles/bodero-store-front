import SlinderCategories from "../SlinderCategories";
import { fetcher } from "@/utils/fetcher";
import styled from "styled-components";
import { black } from "@/lib/colors";
import useSWR from "swr";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  padding: 0 25px;
  background-color: ${black};
  box-shadow: none;
  white-space: nowrap;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const DivContainert = styled.div`
  width: 100%;
  height: auto;
  position: relative;

  @media screen and (min-width: 767px) {
    font-size: 16px;
    box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.25);
  }
  @media screen and (max-width: 640px) {
    position: fixed;
    z-index: 1;
    margin-top: 75.63px;
  }
`;

const CategoriesComponent = () => {
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    `/api/categories`,
    fetcher
  );

  return (
    <Wrapper>
      <DivContainert>
        <SlinderCategories categories={data} isLoading={isLoading} />
      </DivContainert>
    </Wrapper>
  );
};
export default CategoriesComponent;
