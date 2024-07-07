import { useState } from "react";
import {
  NavbarWithSearch,
  BarraNavegacion,
} from "@/components/EditorPlantillas";
//importar las plantillas de los formularios
import { FormSen1 } from "@/components/Plantillas/Formularios";

//aqui deben de salir la lista de plantillas para crear
export default function ListaPlantillas() {
  //Estado para almacenar lo que devuelve la barra de navegacion
  const [tabs, setTabs] = useState({
    FormSen1: false,
  });
  const cambiarPestañas = (nuevaPestaña) => {
    //alert(nuevaPestaña);
    setTabs((prevTabs) => ({
      ...Object.fromEntries(
        Object.entries(prevTabs).map(([key]) => [key, false])
      ),
      [nuevaPestaña]: true,
    }));
  };
  const renderComponent = () => {
    switch (true) {
      case tabs.FormSen1:
        // return <Lista AbrirNiveles={AbrirNiveles} />;
        return <FormSen1 />;
      default:
        return null; // Otra opción por defecto si ninguna condición es verdadera
    }
  };
  return (
    <>
      <div className=" min-h-screen bg-blue-gray-50/50">
        <NavbarWithSearch />
        <BarraNavegacion cambiarPestañas={cambiarPestañas} />
        <div className={`xl:ml-32 `}>{renderComponent()}</div>
      </div>
    </>
  );
}
