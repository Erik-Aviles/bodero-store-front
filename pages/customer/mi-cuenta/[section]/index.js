import { useCallback, useEffect, useMemo } from "react";
import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import { CenterSecction } from "@/components/stylesComponents/CenterSecction";
import { black, blacklight, primary, white2 } from "@/lib/colors";
import MyDatas from "@/components/Account/MyDatas";
import MyOrders from "@/components/Account/MyOrders";
import MyAddress from "@/components/Account/MyAddress";
import MyPanel from "@/components/Account/MyPanel";
import Authentication from "@/components/Account/Authentication";
import { useSession } from "next-auth/react";
import useActions from "@/hooks/useActions";
import { menuItems } from "@/resource/linkRouterAccount";
import Order from "@/components/Account/Order";
import { justFirstWord } from "@/utils/generators/justFirstWord";

const CenterDiv = styled.section`
  ${CenterSecction}
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 0.9rem;
  padding: 40px 5px;
  @media (min-width: 1024px) {
    flex-direction: row;
    gap: 10px;
  }
`;

const AsideBar = styled.aside`
  width: 100%;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 10px 20px;
  background-color: inherit;
  color: ${black};
  display: flex;
  flex-direction: column;
  gap: 5px;
  div {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
    border-bottom: 1px solid #e9ecef;
  }
  div h4 {
    color: ${blacklight};
    margin: 5px 0;
    font-weight: 100;
    font-size: 1rem;
    text-transform: uppercase;
    margin: 0;
  }
  @media (min-width: 1023px) {
    color: ${white2};
    background-color: ${black};
    width: 250px;
    padding: 20px;
    div {
      align-items: stretch;
      flex-direction: column;
      gap: 0;

      overflow: hidden;
    }
    div h4 {
      display: inline-block;
      transform: scaleX(1.5);
      transform-origin: left;
      color: #e9ecef;
      padding-bottom: 10px;
    }
  }
`;

const AsideList = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-between;
  list-style: none;
  margin: 0;
  @media (min-width: 1023px) {
    flex-direction: column;
    align-items: inherit;
    gap: 20px;
    padding: 20px 0 0;
  }
`;

const AsideItem = styled.li`
  a,
  button {
    cursor: pointer;
    text-decoration: none;
    font-weight: ${({ $isSelected }) => ($isSelected ? "bold" : "500")};
    color: ${({ $isSelected }) => ($isSelected ? primary : "inherit")};
    transition: color 0.3s;
    display: flex;
    gap: 5px;
    align-items: center;
    &:hover {
      color: ${primary};
    }

    span {
      display: inline;
    }
    svg {
      display: none;
    }

    /* Mostrar el svg solo en dispositivos móviles */
    @media (max-width: 1023px) {
      svg {
        display: inline;
      }
    }
    @media (max-width: 768px) {
      span {
        display: none;
      }
    }
  }
  button {
    border: none;
    background-color: transparent;
  }
`;

const MainContent = styled.main`
  flex-grow: 1;
  background-color: #ffffff;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 15px;
  width: 100%;
  min-height: 400px;

  @media (max-width: 768px) {
    padding: 20px;
    min-height: fit-content;
  }
`;

const AccountPage = () => {
  const router = useRouter();
  const { section, pedido } = router.query;
  const { data: session, status } = useSession();
  const { cerrar } = useActions();
  const customer = session?.user;

  const isActive = useCallback(
    (querySection) =>
      (!section && querySection === "general") || section === querySection,
    [section]
  );

  const renderMenuItems = () =>
    menuItems.map(({ label, href, icon, section: itemSection }) => (
      <AsideItem key={href} $isSelected={isActive(itemSection)}>
        {label === "Salir" ? (
          <button onClick={cerrar} title={label}>
            <span>{label}</span>
            {icon}
          </button>
        ) : (
          <Link href={href} title={label}>
            <span>{label}</span>
            {icon}
          </Link>
        )}
      </AsideItem>
    ));

  const content = useMemo(() => {
    if (section === "pedidos" && pedido) {
      return <Order pedido={pedido} />;
    }

    switch (section) {
      case "perfil":
        return <MyDatas />;
      case "pedidos":
        return <MyOrders />;
      case "direcciones":
        return <MyAddress />;
      case "cambiar-contrasena":
        return <Authentication />;
      default:
        return <MyPanel />;
    }
  }, [section, pedido]);

  return (
    <Layout title="B.R.D | Mi Cuenta" sity={`/customer/mi-cuenta/${section}`}>
      <CenterDiv>
        <AsideBar>
          <div>
            <span>Hola,</span>
            <h4> {justFirstWord(customer?.name) || "Usuario"}!</h4>
          </div>
          <AsideList>{renderMenuItems()}</AsideList>
        </AsideBar>
        <MainContent>{content}</MainContent>
      </CenterDiv>
    </Layout>
  );
};

export default AccountPage;
