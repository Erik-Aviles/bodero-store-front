import { blue, primary, secondary, white } from "@/lib/colors";
import Link from "next/link";
import styled, { css } from "styled-components";

const Content = css`
  flex: 1 1 calc(33.333% - 16px);
  border: 1px solid #e9ecef;
  border-radius: 8px 8px 0 0;
  padding: 15px;
  min-width: 280px;
  max-width: 380px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
export const Container = styled.div`
  font-size: 0.8rem;
  display: flex;
  flex-direction: column;
  width: 100%;
  header {
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;
export const TitleH2 = styled.h2`
  color: ${blue};
  margin: 0;
  font-weight: 400;
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;
export const SectionTitle = styled.h3`
  width: 100%;
  font-weight: 500;
  margin: 10px 0;
  color: ${blue};
  border-bottom: 1px solid #e9ecef;
`;

export const Wrapper = styled.section`
  flex-wrap: wrap;
  padding: 10px 0;
  display: flex;
  justify-content: center;
  gap: 20px;
  @media (min-width: 768px) {
    align-items: stretch;
    flex-direction: row;
    padding-left: 3px;
    padding-right: 3px;
  }
`;
export const Form = styled.form`
  ${Content}
`;
export const Article = styled.article`
  ${Content}
  p {
    margin: 0;
    display: flex;
    gap: 15px;
  }
  p span {
    white-space: nowrap;
    font-size: 0.75rem;
    font-weight: 400;
    color: #9199a0;
  }
`;
export const StatusText = styled.strong`
  color: ${(props) => {
    switch (props.$status) {
      case "delivered":
        return "green";
      case "shipped":
        return "purple";
      case "processing":
        return "blue";
      case "pending":
        return "orange";
      case "canceled":
        return "red";
      default:
        return null;
    }
  }};
  font-weight: bold;
`;

export const ScrollContainer = styled.div`
  overflow-x: auto;
  border: 1px solid #e9ecef;
  border-top: none;
`;

export const ContentEmpty = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: capitalize;
`;

export const RequiredText = styled.span`
  color: ${primary};
  font-size: 12px;
  ${(props) =>
    props.$error &&
    css`
      display: block;
    `};
  ${(props) =>
    props.$movil &&
    props.$error &&
    css`
      display: block;
      @media (min-width: 768px) {
        display: none;
      }
    `};
`;

export const Table = styled.table`
  width: 100%;
  font-size: 0.8rem;
  border-collapse: collapse;
  text-transform: capitalize;
  thead {
    background-color: ${blue};
    color: #fff;
    text-align: left;
  }
  th,
  td {
    border: 1px solid #e9ecef;
    padding: 10px;
  }

  th {
    font-weight: bold;
    white-space: nowrap;
  }
  tr:hover {
    background-color: #f1f1f1;
    color: blue;
  }

  tbody tr:nth-child(even) {
    background-color: #f8f9fa;
  }
`;
export const TD = styled.td`
  min-width: 180px;
`;

export const TDnowrap = styled.td`
   white-space: nowrap;
   overflow: hidden, 
   textOverflow: ellipsis 
`;
export const ComponenteLink = styled(Link)`
  white-space: nowrap;
  font-size: 0.8rem;
  width: fit-content;
  color: #2255c2;
  cursor: pointer;
  &:hover {
    text-decoration-line: underline;
  }
`;

export const WrapperButton = styled.div`
  display: flex;
  justify-content: space-evenly;
  gap: 10px;
  padding: 20px 0;
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  margin: 0 auto;
  padding: 10px;
  color: ${white};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  width: 300px;
  ${(props) =>
    props.$red &&
    css`
      background-color: ${primary};
      transition: background-color 0.3s ease;
      &:hover {
        background-color: rgba(247, 3, 1, 0.6);
      }
      &:disabled {
        background-color: rgba(247, 3, 1, 0.4);
        cursor: not-allowed;
      }
    `};
  ${(props) =>
    props.$blue &&
    css`
      background-color: ${blue};
      transition: background-color 0.3s ease;

      &:hover {
        background-color: rgba(0, 91, 181, 0.8);
      }
      &:disabled {
       background-color: rgba(0, 91, 181, 0.3);
        cursor: not-allowed;
      }
    `};
  ${(props) =>
    props.$green &&
    css`
      background-color: ${secondary};
      transition: background-color 0.3s ease;
 
      &:hover {
        background-color: rgba(65, 159, 0, 0.7);
      }
      &:disabled {
        background-color: ${secondary};
        cursor: not-allowed;
      }
    `};
`;
