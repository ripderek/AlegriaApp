import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
//imports del sidenav del otro proyecto
import {
  Avatar,
  Button,
  IconButton,
  Typography,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Tooltip,
} from "@material-tailwind/react";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/outline";
import {
  useMaterialTailwindController,
  setOpenSidenav,
  setBarNav,
} from "@/context";
import { useRouter } from "next/router";
import Lottie from "lottie-react";
import anim from "../../../public/anim/icon_app.json";
//importar el archivo Js con los colores
import { colores_fondo } from "../../Data/colores_fondo";
export function BarraNavegacion({ routes, brandImg, brandName }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const {
    sidenavColor,
    sidenavType,
    openSidenav,
    change_type_bar,
    borders,
    shadows,
    iconApp,
    contorno_borders,
    border_color,
    tamano_border,
    tamano_sombras,
    color_sombras,
  } = controller;
  // Define la lógica para determinar si un enlace está activo
  const router = useRouter();
  const isActive = (path) => router.pathname === path;
  return (
    //el aside puede tener w-52 o w-72 para que se haga mas grande
    //pero hay que colocar un boton para que haga pequeno el aside y solo se vea los iconos
    <aside
      className={`${colores_fondo[sidenavType]} ${
        openSidenav ? "translate-x-0" : "-translate-x-80"
      } 
      ${change_type_bar ? "w-24" : "w-52"}
      ${borders ? "rounded-2xl" : "rounded-none"}
      ${shadows ? `${tamano_sombras} ${color_sombras}` : "shadow-none"}
      ${contorno_borders ? `${tamano_border} ${border_color}` : "border-none"}
       fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)]  transition-transform duration-300 xl:translate-x-0 
           `}
    >
      <div className={`relative `}>
        <Card
          className={`w-auto shadow-none  mb-0  ${colores_fondo[sidenavType]}`}
        >
          <CardHeader
            floated={false}
            className={` h-auto mt-11 w-44 mx-auto text-center shadow-none${colores_fondo[sidenavType]}`}
          >
            {!change_type_bar && iconApp && (
              <Lottie animationData={anim} className="h-auto" />
            )}
            {/* 
            <img
              src="https://sga.uteq.edu.ec/media/fotos/2023/11/28/foto_20231128181450.jpg"
              alt="Empresa logo"
              className="w-auto"
            />
            */}
          </CardHeader>
          {!change_type_bar && (
            <CardBody className="text-center">
              <Typography
                variant="h4"
                color={sidenavType === "dark" ? "white" : "blue-gray"}
                className="mb-2"
              >
                {process.env.NEXT_PUBLIC_NOMBREAPP}
              </Typography>
              {/* 
              <Typography
                color={sidenavType === "dark" ? "white" : "blue-gray"}
                className="font-medium"
              >
                Extintor Team
              </Typography>
              */}
            </CardBody>
          )}
        </Card>
        <IconButton
          variant="text"
          color="white"
          size="sm"
          ripple={false}
          className={`absolute grid rounded-br-none rounded-tl-none ${
            change_type_bar ? " left-7 top-2 " : " left-5 top-2 "
          }`}
          onClick={() => setBarNav(dispatch, !change_type_bar)}
        >
          <Bars3Icon
            strokeWidth={3}
            className="h-9 w-9 font-bold"
            color={sidenavColor == "dark" ? "black" : sidenavColor}
          />
        </IconButton>
        <IconButton
          variant="text"
          color="white"
          size="sm"
          ripple={false}
          className="absolute right-2 top-2 grid rounded-br-none rounded-tl-none xl:hidden"
          onClick={() => setOpenSidenav(dispatch, false)}
        >
          <XMarkIcon
            strokeWidth={4}
            className="h-6 w-6 font-bold"
            color={sidenavColor == "dark" ? "black" : sidenavColor}
          />
        </IconButton>
      </div>
      <div>
        {routes.map(({ layout, title, pages }, key) => (
          <ul key={key} className=" flex flex-col gap-1">
            {pages.map(({ icon, name, path }) => (
              <li key={name}>
                <Link href={`/${layout}${path}`} passHref>
                  <Tooltip content={`${!change_type_bar ? "Ir" : name}`}>
                    <Button
                      as="a"
                      variant={
                        isActive(`/${layout}${path}`) ? "gradient" : "text"
                      }
                      color={
                        isActive(`/${layout}${path}`)
                          ? sidenavColor
                          : sidenavType === "dark"
                          ? "white"
                          : "black"
                      }
                      className={`flex items-center capitalize ${
                        change_type_bar ? "mx-auto h-15" : "gap-6 px-4 h-9"
                      }`}
                      fullWidth
                    >
                      {icon(!change_type_bar ? "h-5" : "h-6 w-10")}
                      {!change_type_bar && (
                        <Typography
                          color="inherit"
                          className="font-medium capitalize "
                        >
                          {name}
                        </Typography>
                      )}
                    </Button>
                  </Tooltip>
                </Link>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </aside>
  );
}

BarraNavegacion.defaultProps = {
  brandImg: "/img/logo-ct.png",
  brandName: "Material Tailwind React",
};

BarraNavegacion.propTypes = {
  brandImg: PropTypes.string,
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

BarraNavegacion.displayName = "/src/components/layout/BarraNavegacion.jsx";
export default BarraNavegacion;
