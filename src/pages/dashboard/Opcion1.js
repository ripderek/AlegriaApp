import { IconButton, Button } from "@material-tailwind/react";
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

  //Prueba de la funcion para crear un archivo JS
  const createFile = async () => {
    const response = await fetch("/api/ExampleCreateFile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fileName: "Opcion2",
        ruta_archivo: "/src/pages/dashboard",
        ruta_plantilla: "/src/Data/Plantillas/Plantilla_1.js",
        Titulo: "TituloPersonalizado",
        Subtitulo: "SubtituloPersonalizado",
      }),
    });

    const result = await response.json();
    if (response.ok) {
      alert(result.message);
    } else {
      alert("Error: " + result.message);
    }
  };
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
        <Navbar_app user_name={"Nombre User"} titulo={"Inicio"} />
        <Configurator />
        <IconButton
          size="lg"
          className={`fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900 shadow-2xl`}
          ripple={false}
          onClick={() => setOpenConfigurator(dispatch, true)}
          color={sidenavColor == "dark" ? "black" : sidenavColor}
        >
          <Cog6ToothIcon className="h-5 w-5" />
        </IconButton>
        <div>
          Ejemplo de crear el archivo JS{" "}
          <Button variant="outlined" size="sm" onClick={createFile}>
            Crear archivo js
          </Button>
        </div>
      </div>
    </div>
  );
}
Home.displayName = "/src/layout/dashboard.jsx";
///src/layout/dashboard.jsx
//export default Home;
