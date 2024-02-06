import React from "react";
import { white, grey, primary, greylight, white2 } from "@/lib/colors";
import { InfoData } from "@/access/data";
import styled from "styled-components";
import Link from "next/link";
import Center from "./Center";

const Wrapper = styled.div`
  background-color: ${white2};
  padding-top: 20px;
  padding-bottom: 20px;
  @media screen and (max-width: 640px) {
    padding-left: 20px;
    padding-right: 20px;
  }
`;

const ListInformation = styled.ul`
  height: auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  justify-content: center;

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
  }
  @media screen and (min-width: 1024px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
`;

const ItemInformation = styled.li`
  padding: 10px 20px;
  white-space: break-spaces;
  overflow: hidden;
  @media screen and (max-width: 768px) {
    border: 1px solid ${greylight};
    border-radius: 5px;
  }
`;

const StaledLink = styled(Link)`
  h3 {
    margin: 13px 0 0;
    font-weight: 700;
    color: #343332;
    @media screen and (max-width: 640px) {
      margin: 0;
    }
  }
  p {
    width: 100%;
    margin: 3px 0 0;
    color: ${grey};
  }
  &:hover {
    color: ${white};
    cursor: pointer;
  }
`;

const ImagesInformationContainer = styled.div`
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: ${primary};
  color: ${white};
  font-weight: 700;
  margin-right: 10px;

  @media screen and (max-width: 640px) {
    float: left;
    width: 60px;
    height: 60px;
  }
  @media screen and (min-width: 1024px) {
    float: left;
  }
`;
const InformationFooter = () => {
  return (
    <Wrapper>
      <Center>
        <ListInformation>
          {InfoData.map((item, index) => (
            <ItemInformation key={`id${index}${item.name}`} title={item.name}>
              <StaledLink href={item.href}>
                <ImagesInformationContainer>
                  {item.icon}
                </ImagesInformationContainer>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </StaledLink>
            </ItemInformation>
          ))}
        </ListInformation>
      </Center>
    </Wrapper>
  );
};

export default InformationFooter;
