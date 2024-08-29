// Crear_Usuario_Funcion.js
import { useState, useRef } from "react";
import { Dialog_app } from "@/components/Elements";
import { AiOutlineUpload } from "react-icons/ai";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { Button } from "@material-tailwind/react";
import axios from "axios"; // para realizar las peticiones
import { Loader } from "@/widgets"; //Importar el componente
import Lottie from "lottie-react";
import anim from "../../../../public/anim/picture.json";
/* PARA EL SELECTOR DE COLORES */
import ColorPicker from "@rc-component/color-picker";
import "@rc-component/color-picker/assets/index.css";

export function Crear_usuarios({ openDialog, closeDialog }) {
  const [load, setLoader] = useState(false);
  //estado para almacenar lo del formulario
  const [Categoria, SetCategoria] = useState({
    Nombre_usuario: "",
    Correo: "",
    Contrasenia: "",
  });
  const HandleChange = (e) => {
    SetCategoria({ ...Categoria, [e.target.name]: e.target.value });
  };

  //enviar a la API a crear la categoria
  const Crear_Usuario_Funcion = async (e) => {
    e.preventDefault();
    setLoader(true);
    //preguntar primero si la wea va vacia skere
    if (
      Categoria.Nombre_usuario.trim() === "" ||
      Categoria.Contrasenia.trim() === "" ||
      Categoria.Correo.trim() === ""
    ) {
      setLoader(false);
      alert("Es obligatorio llenar los campos por favor");
      return false;
    }
    console.log(Categoria);
    try {
      const result = await axios.post(
        process.env.NEXT_PUBLIC_ACCESLINK + "usuarios/insertar",
        Categoria,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: false,
        }
      );
      console.log(result);
      closeDialog(true);
      setLoader(false);
    } catch (error) {
      alert("Error");
      //colocar una alerta de error
      setLoader(false);
      //setMensajeError(error.response.data.error);
      //setError(true);
      console.log(error);
    }
  };

  return (
    <>
      {load ? <Loader /> : ""}
      <Dialog_app
        open={openDialog}
        close={() => closeDialog(false)}
        title="Crear Usuario"
        size="sm"
      >
        {/* Aquí va el cuerpo del diálogo */}
        {/* Crear un contenedor con dos div en forma de columas */}
        <div>
          <div>
            <form
              className="flex flex-col gap-4  overflow-y-auto mb-4"
              onSubmit={Crear_Usuario_Funcion}
              id="FormularioCrearCategoria"
            >
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="categoria"
                >
                  Usuario
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="Nombre de usuario"
                  onChange={HandleChange}
                  name="Nombre_usuario"
                  maxLength={200}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="categoria"
                >
                  Correo
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="Correo"
                  onChange={HandleChange}
                  name="Correo"
                  maxLength={200}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="categoria"
                >
                  Contraseña
                </label>

                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="Contraseña"
                  onChange={HandleChange}
                  name="Contrasenia"
                  maxLength={200}
                  required
                />
              </div>
            </form>
          </div>
        </div>
        {/* Este boton se encuentra fuera del formulario pero acciona la funcion de crear */}
        <div className="flex justify-end items-center h-full">
          <Button
            className="flex gap-3 w-28 mb-5"
            size="md"
            color="green"
            type="submit"
            form="FormularioCrearCategoria"
          >
            <PlusCircleIcon className="h-4 w-4" />
            <span className="capitalize">Crear</span>
          </Button>
        </div>
      </Dialog_app>
    </>
  );
}

export default Crear_usuarios;
