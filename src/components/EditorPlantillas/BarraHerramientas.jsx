import React, { useEffect } from "react";
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

import { routes } from "../../Data/ListaPlantillas";

export function BarraHerramientas({ guardar }) {
  useEffect(() => {
    const aside = document.getElementById("resizable-aside");
    const handle = document.getElementById("resize-handle");

    let isResizing = false;

    const startResizing = (e) => {
      isResizing = true;
      document.addEventListener("mousemove", resize);
      document.addEventListener("mouseup", stopResizing);
    };

    const resize = (e) => {
      if (isResizing) {
        const newWidth = window.innerWidth - e.clientX;
        aside.style.width = `${newWidth}px`;
      }
    };

    const stopResizing = () => {
      isResizing = false;
      document.removeEventListener("mousemove", resize);
      document.removeEventListener("mouseup", stopResizing);
    };

    handle.addEventListener("mousedown", startResizing);

    return () => {
      handle.removeEventListener("mousedown", startResizing);
    };
  }, []);

  return (
    <aside
      id="resizable-aside"
      className={`
           fixed top-0 right-0 h-full  bg-white shadow-lg z-10
             `}
      style={{ width: "300px" }} // Establece el ancho inicial
    >
      <div
        id="resize-handle"
        className="w-2 bg-gray-300 cursor-ew-resize border-l-8 border-blue-gray-500"
        style={{ position: "absolute", left: "-2px", top: "0", bottom: "0" }}
      />
      <div className="h-full flex-1 overflow-auto">
        Aqui van las opciones para modificar los parametros del disenio xd
      </div>
    </aside>
  );
}

export default BarraHerramientas;
