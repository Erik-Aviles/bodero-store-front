import SlinderCategories from "../SlinderCategories";
import { fetcher } from "@/utils/fetcher";
import styled from "styled-components";
import { black } from "@/lib/colors";
import useSWR from "swr";

const Wrapper = styled.div`
  width: 100%;
  height: 45px;
  display: flex;
  padding: 0 25px;
  background-color: ${black};
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.25);
`;

const DivContainert = styled.div`
  width: 100%;
  position: relative;
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
