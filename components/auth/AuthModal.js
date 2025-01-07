import React, { useCallback, useMemo } from "react";
import styled, { css } from "styled-components";
import ButtonClose from "../buttonComponents/ButtonClose";
import { LoginIcon, LogoutIcon, UserAddIcon } from "../Icons";
import Link from "next/link";
import avatarLocal from "../../public/images/avatarUser.png";
import { primary } from "@/lib/colors";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import useActions from "@/hooks/useActions";
import { menuItems } from "@/resource/linkRouterAccount";
import Image from "next/image";
import cloudinaryLoader from "../loaderes/cloudinaryLoader";
import localLoader from "../loaderes/localLoader";

const styledLink = css`
  color: "inherit";
  transition: color 0.3s;
  font-size: 1rem;
  cursor: pointer;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 15px;
  &:hover {
    color: ${primary};
    background-color: #f8f9fa;
  }

  svg {
    width: 25px;
    height: 25px;
  }
`;

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 10;
  visibility: ${({ $isOpen }) => ($isOpen ? "visible" : "hidden")};
  opacity: ${({ $isOpen }) => ($isOpen ? "1" : "0")};
  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
`;

const ModalContainer = styled.div`
  position: fixed;
  padding: 20px;
  top: 0;
  right: 0;
  width: 300px;
  height: 100%;
  background-color: #ffffff;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.2);
  transform: translateX(100%);
  transition: transform 0.3s ease-in-out;

  ${({ $isOpen }) =>
    $isOpen &&
    css`
      transform: translateX(0);
    `}
`;
const AuthHeader = styled.header`
  position: relative;
  border-bottom: 1px solid red;
`;

const InfoUser = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  p {
    margin: 0;
    font-weight: 600;
    font-size: 1.1em;
    text-transform: uppercase;
  }
  span {
    margin: 0;
    font-size: 0.8em;
    letter-spacing: 5px;
  }
  img {
    border-radius: 50%;
  }
`;

const AuthTitle = styled.h4`
  font-size: 1.2em;
  font-weight: bold;
  margin: 10px 0;
`;
const AuthBody = styled.ul`
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  list-style: none;
  margin: 0;
  @media (min-width: 768px) {
    flex-direction: column;
    align-items: inherit;
    padding: 20px 0 0;
  }
  button {
    border: none;
    background-color: transparent;
    ${styledLink}}
  }
`;

const Authtem = styled.li`
  a {
    ${styledLink}
  }
`;

const AuthModal = ({ isOpen, toggleModal }) => {
  const router = useRouter();
  const { section } = router.query;
  const { data: session, status, update } = useSession();
  const { cerrar } = useActions();
  const customer = session?.user;

  const isActive = useCallback(
    (querySection) =>
      (!section && querySection === "general") || section === querySection,
    [section]
  );

  const renderMenuItems = () =>
    menuItems.map(({ label, href, icon, section: itemSection }) => (
      <Authtem
        key={label}
        $isSelected={isActive(itemSection)}
        onClick={toggleModal}
      >
        <Link href={href}>
          {icon}
          <p>{label}</p>
        </Link>
      </Authtem>
    ));

  return (
    <Wrapper $isOpen={isOpen} onClick={toggleModal}>
      <ModalContainer $isOpen={isOpen} onClick={(e) => e.stopPropagation()}>
        <AuthHeader>
          <ButtonClose onClick={toggleModal} />
          <AuthTitle>Mi cuenta</AuthTitle>
          {session && (
            <InfoUser>
              <p>{customer?.name}</p>
              <Image
                className="rounded-full"
                loader={
                  customer?.image === undefined ? cloudinaryLoader : localLoader
                }
                width={30}
                height={30}
                src={
                  customer?.image === undefined ? avatarLocal : customer?.image
                }
                alt="Imagen de perfil del usuario"
              />
              <span>{customer?.email}</span>
            </InfoUser>
          )}
        </AuthHeader>
        <AuthBody>
          {session ? (
            <>
              {renderMenuItems()}
              <button onClick={cerrar}>
                <LogoutIcon />
                <p>Cerrar este perfil</p>
              </button>
            </>
          ) : (
            <>
              <Authtem>
                <Link href={"/auth/inicio-sesion"} onClick={toggleModal}>
                  <LoginIcon />
                  <p>Inicio de sesión</p>
                </Link>
              </Authtem>
              <Authtem>
                <Link href={"/auth/registro"} onClick={toggleModal}>
                  <UserAddIcon />
                  <p>Crear una cuenta</p>
                </Link>
              </Authtem>
            </>
          )}
        </AuthBody>
      </ModalContainer>
    </Wrapper>
  );
};

export default AuthModal;
