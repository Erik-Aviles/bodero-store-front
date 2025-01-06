import {
  AddressIcon,
  AuthIcon,
  GeneralIcon,
  ProfileEditIcon,
  ShowAllOrdersIcon,
} from "@/components/Icons";

export const menuItems = [
  {
    label: "General",
    href: "/customer/mi-cuenta/general",
    icon: <GeneralIcon />,
    section: "general",
  },
  {
    label: "Perfil",
    href: "/customer/mi-cuenta/perfil",
    icon: <ProfileEditIcon />,
    section: "perfil",
  },
  {
    label: "Pedidos",
    href: "/customer/mi-cuenta/pedidos",
    icon: <ShowAllOrdersIcon />,
    section: "pedidos",
  },
  {
    label: "Direcciones",
    href: "/customer/mi-cuenta/direcciones",
    icon: <AddressIcon />,
    section: "direcciones",
  },
  {
    label: "Autenticación",
    href: "/customer/mi-cuenta/cambiar-contrasena",
    icon: <AuthIcon />,
    section: "cambiar-contrasena",
  },
];
