import {
  Navbar,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useMaterialTailwindController } from "@/context";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { colores_fondo } from "../../Data/colores_fondo";
import Router from "next/router";

export function Navbar_app({ user_name, titulo }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const {
    fixedNavbar,
    openSidenav,
    sidenavColor,
    effect_panel,
    sidenavType,
    panelSuperioColor,
    borders,
    contorno_borders,
    border_color,
    tamano_border,
  } = controller;
  const cookies = new Cookies();

  const [nombresS, setNombreS] = useState("SIN NOMBRE");

  useEffect(() => {
    setNombreS(decodeURIComponent(cookies.get("Nombres")).substring(0, 15));
  }, []);
  //funcion para cerrar sesion que borre todas las cookies y regrese al index
  const CerrarSesion = () => {
    //alert("Cerrando");
    cookies.remove("Nombres", { path: "/" });
    cookies.remove("Type", { path: "/" });
    cookies.remove("Token", { path: "/" });

    //redirigir al inicio
    Router.push("/");
  };
  return (
    <Navbar
      color={!fixedNavbar && "transparent"}
      className={` transition-all 
        ${contorno_borders ? "border-2" : "border-none"}
        ${
          fixedNavbar
            ? `sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5 ${
                colores_fondo[panelSuperioColor]
              } ${
                contorno_borders
                  ? `${tamano_border} ${border_color}`
                  : "border-none"
              }`
            : "px-0 py-1"
        } ${borders ? "rounded-xl" : "rounded-none"} 
                
`}
      fullWidth
      blurred={fixedNavbar}
    >
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        <div className="capitalize"></div>
        <div className="flex items-center">
          <Menu>
            <MenuHandler>
              <Button
                variant="text"
                color="blue-gray"
                className="hidden items-center gap-1 px-4 xl:flex normal-case"
              >
                <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
                {nombresS}
              </Button>
            </MenuHandler>
            <MenuList className="w-max border-0">
              <MenuItem
                className="flex items-center gap-4"
                onClick={() => CerrarSesion()}
              >
                {/*
                <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-tr from-blue-gray-800 to-blue-gray-900">
                  <CreditCardIcon className="h-4 w-4 text-white" />
                </div> */}
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-1 font-normal"
                  >
                    Cerrar sesión
                  </Typography>
                </div>
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>
    </Navbar>
  );
}
Navbar_app.displayName = "/src/widgets/layout/dashboard-navbar.jsx";
export default Navbar_app;
