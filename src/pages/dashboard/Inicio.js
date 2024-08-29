import { IconButton } from "@material-tailwind/react";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { Dialog_Error, Loader } from "@/widgets";
import { BarraNavegacion, Navbar_app, Configurator } from "@/components/layout";
//rutas que va a tener la barra lateral
import routes from "@/routes";
import {
  useMaterialTailwindController,
  setOpenConfigurator,
  setSidenavColor,
  setFixedNavbar,
} from "@/context";
import React from "react";
//welcome.json
//import Lottie from "lottie-react";
//import anim from "../../../public/anim/welcome.json";
//export function BarraNavegacion
export default function Home() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType, sidenavColor, change_type_bar } = controller;

  return (
    <div className=" min-h-screen bg-blue-gray-50/50">
      <BarraNavegacion
        routes={routes}
        brandImg={
          sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
        }
      />
      {/* 
      SI LA BARRA DE NAVEGACION ESTA COMPLETA 
      <div className="p-4 xl:ml-80 ">
      <div className="p-4 xl:ml-56">
      */}
      <div className={`p-4  ${change_type_bar ? "xl:ml-32" : "xl:ml-56"}`}>
        {/*     <Navbar_app user_name={"Nombre User"} titulo={"Inicio"} /> */}

        <Configurator />
        <IconButton
          size="lg"
          color="white"
          className={`fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900 shadow-2xl border-x-4 border-y-4 border-purple-700`}
          ripple={false}
          onClick={() => setOpenConfigurator(dispatch, true)}
        >
          <Cog6ToothIcon className="h-5 w-5" />
        </IconButton>
        <div></div>
      </div>
    </div>
  );
}
Home.displayName = "/src/layout/dashboard.jsx";
///src/layout/dashboard.jsx
//export default Home;
