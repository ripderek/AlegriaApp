// Crear_Categoria.js
import { useState, useEffect } from "react";
import { Dialog_app } from "@/components/Elements";

export function Crear_Categoria({ openDialog, closeDialog }) {
  //estado para almacenar lo del formulario
  const [Categoria, SetCategoria] = useState({ Nombre: "", Descripcion: "" });
  const HandleChange = (e) => {
    SetCategoria({ ...Categoria, [e.target.name]: e.target.value });
    console.log(Categoria);
  };
  return (
    <>
      <Dialog_app
        open={openDialog}
        close={closeDialog}
        title="Crear Categoria"
        size="sm"
      >
        {/* Aquí va el cuerpo del diálogo */}
        <form>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="categoria"
            >
              Categoria
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="categoria"
              type="text"
              placeholder="Nombre de la categoría"
              onChange={HandleChange}
              name="Nombre"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="descripcion"
            >
              Descripción
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="descripcion"
              placeholder="Descripción de la categoría"
              onChange={HandleChange}
              name="Descripcion"
            />
          </div>
        </form>
      </Dialog_app>
    </>
  );
}

export default Crear_Categoria;
