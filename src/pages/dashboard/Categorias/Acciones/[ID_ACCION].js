import { IconButton, Button } from "@material-tailwind/react";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { Dialog_Error, Loader } from "@/widgets";
import { BarraNavegacion, Navbar_app, Configurator } from "@/components/layout";
//rutas que va a tener la barra lateral
import routes from "@/routes";
import { useMaterialTailwindController, setOpenConfigurator } from "@/context";
import { useEffect, useState } from "react";
import { Lista_Acciones } from "@/components/Pages/Acciones";
import { useRouter } from "next/router";
export default function Acciones() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType, sidenavColor, change_type_bar, borders } = controller;
  //Para obtener la categoria desde el queryURL
  const router = useRouter();
  const { ID_ACCION } = router.query;
  const [idCat, setIDCategoria] = useState();
  useEffect(() => {
    setIDCategoria(ID_ACCION);
  }, [ID_ACCION]);

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
        {/* <Navbar_app user_name={"Nombre User"} titulo={"Inicio"} /> */}

        {process.env.NEXT_PUBLIC_DESARROLLO === "True" ? (
          <>
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
          </>
        ) : (
          ""
        )}
        <div className="mt-2">
          <Lista_Acciones idCategoria={idCat} />
        </div>
      </div>
    </div>
  );
}
///src/layout/dashboard.jsx
//export default Home;
