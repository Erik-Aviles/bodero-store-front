import { black, grey, primary, success, warning, white } from "@/lib/colors";
import React, { useState } from "react";
import styled, { css } from "styled-components";
import { AllDeleteIcon, HamburguerIcon } from "../Icons";
import { linksUp } from "@/resource/linkRouterData";
import Link from "next/link";
import { useRouter } from "next/router";

const StyledDiv = styled.div`
  display: block;

  @media screen and (min-width: 769px) {
    display: none;
  }
`;

const ModalBackground = styled.div`
  position: fixed;
  inset: 0;
  z-index: 10;
  background-color: rgba(37, 37, 37, 0.5);
  filter: blur(12px);
`;

const ModalContainer = styled.div`
  position: fixed;
  inset: 0;
  z-index: 30;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const ModalContent = styled.div`
  overflow: hidden;
  border-radius: 0.2rem;
  background-color: rgb(27 27 27 / 0.8);
  width: 25rem;
`;

const ModalBody = styled.div`
  position: relative;
  padding: 1rem;
  font-size: 1.2rem;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  background-color: #f7fafc;
  padding: 0.4rem 1rem;
`;
const SectionButton = styled.section`
  cursor: pointer;
`;

const WrapperIcon = styled.i`
  display: block;
  color: ${black};
  cursor: pointer;
`;
const NavbarToogle = styled.nav`
  margin: 0 auto;
  width: 220px;
  overflow: hidden;
  position: relative;
`;
const ListInformation = styled.ul`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

const ItemInformation = styled.li`
  display: table-cell;
  cursor: pointer;
`;

const StaledLink = styled(Link)`
  color: ${white};
  display: block;
  padding: 12px;
  position: relative;
  text-align: center;
  text-decoration: none;
  -webkit-transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  -ms-transition: all 0.5s ease;
  -o-transition: all 0.5s ease;
  transition: all 0.5s ease;
  &:hover {
    span {
      left: 0;
    }
  }
`;

const Spans = styled.span`
  display: block;
  width: 100%;
  height: 100%;
  top: 0;
  position: absolute;
  left: -210px;
  -webkit-transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  -ms-transition: all 0.5s ease;
  -o-transition: all 0.5s ease;
  transition: all 0.5s ease;
  ${(props) =>
    props.$isActive &&
    css`
      left: 0;
    `};
  ${(props) =>
    props.$one &&
    css`
      background: ${primary};
    `};
  ${(props) =>
    props.$two &&
    css`
      background: ${success};
    `};
  ${(props) =>
    props.$three &&
    css`
      background: #f2ae0d; /*amarillo*/
    `};
  ${(props) =>
    props.$four &&
    css`
      background: #013c92; /* azul */
    `};
  ${(props) =>
    props.$five &&
    css`
      background: ${warning};
    `};
`;

const Icons = styled.i`
  display: block;
  line-height: 45px;
`;

const ToogleNavBar = ({ toggleModal, showModal }) => {
  const router = useRouter();
  const pathname = router.pathname;

  return (
    <StyledDiv>
      <div>
        <SectionButton onClick={toggleModal}>
          <HamburguerIcon fill={grey} />
        </SectionButton>
        {showModal && (
          <>
            <ModalBackground onClick={toggleModal} />
            <ModalContainer>
              <ModalContent>
                <ModalFooter>
                  <WrapperIcon onClick={toggleModal}>
                    <AllDeleteIcon width={40} height={40} />
                  </WrapperIcon>
                </ModalFooter>
                <ModalBody>
                  {
                    <NavbarToogle>
                      <ListInformation>
                        {linksUp.map((link, index) => (
                          <ItemInformation
                            key={`id${index}1`}
                            title={link.name}
                          >
                            <StaledLink href={link.href}>
                              <Spans
                                $one={index === 0}
                                $two={index === 1}
                                $three={index === 2}
                                $four={index === 3}
                                $five={index === 4}
                                $isActive={pathname === link.href}
                              >
                                <Icons>{link.icon}</Icons>
                              </Spans>
                              {link.name}
                            </StaledLink>
                          </ItemInformation>
                        ))}
                      </ListInformation>
                    </NavbarToogle>
                  }
                </ModalBody>
              </ModalContent>
            </ModalContainer>
          </>
        )}
      </div>
    </StyledDiv>
  );
};

export default ToogleNavBar;
