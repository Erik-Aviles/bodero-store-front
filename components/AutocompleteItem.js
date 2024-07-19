import { black, grey, success, warning } from "@/lib/colors";
import awsS3Loader from "./loaderes/awsS3Loader";
import localLoader from "./loaderes/localLoader";
import styled, { css } from "styled-components";
import Image from "next/image";
import Link from "next/link";

const DivAutocomplete = styled.div`
  width: 100%;
  display: flex;
  gap: 0.4rem;
  padding: 0.25rem 0.4rem;
  &:hover {
    background-color: #ebe8e8;
  }
  &:active {
    background-color: #ebe8e8;
  }
  &:focus {
    background-color: #ebe8e8;
  }
`;

const FigureAutocomplete = styled.figure`
  margin: 0;
  img {
    width: 3rem;
    height: 3rem;
    object-fit: contain;
  }
`;

const DivAutocompleteText = styled.div`
  white-space: normal;
  h3 {
    color: ${black};
    margin: 0;
    font-size: 0.7rem;
    font-weight: 500;
    text-transform: uppercase;
  }
  p {
    text-transform: capitalize;
    margin: 0;
    font-size: 0.6rem;
    color: ${grey};
  }
`;

const TextComb = styled.span`
  display: flex;
  align-items: end;
  gap: 10px;
  font-size: 0.6rem;
  color: ${grey};
  small {
    font-size: 0.65rem;
    color: ${warning};
    font-weight: 500;
    text-transform: capitalize;
  }
`;

const SpanItemsAutocomplete = styled.span`
  word-break: break-all;
  font-size: 0.7rem;
  ${(props) =>
    props.$codes &&
    css`
      color: ${success};
    `};
  ${(props) =>
    props.$comp &&
    css`
      color: #365c9b;
    `};
`;

export const AutocompleteItem = ({
  _id,
  title,
  images,
  compatibility,
  quantity,
  brand,
  openPanel,
}) => {
  return (
    <li>
      <DivAutocomplete>
        <FigureAutocomplete>
          <Image
            loader={images?.[0] ? awsS3Loader : localLoader}
            src={images?.[0] ? images?.[0] : "/logo.jpg"}
            alt={title}
            width={70}
            height={70}
          />
        </FigureAutocomplete>
        <Link href={`/products/${_id}`} onClick={openPanel}>
          <DivAutocompleteText>
            <h3>{title} </h3>
            <TextComb>
              {"Marca: "}
              <small> {brand}</small>
              {"Cant: "}
              <small>{quantity}</small>
            </TextComb>
            {compatibility?.map((ctd, index) => (
              <p key={index}>
                {ctd.title} {": "}
                <SpanItemsAutocomplete $comp={1}>
                  {ctd.model}
                </SpanItemsAutocomplete>
              </p>
            ))}
          </DivAutocompleteText>
        </Link>
      </DivAutocomplete>
    </li>
  );
};
