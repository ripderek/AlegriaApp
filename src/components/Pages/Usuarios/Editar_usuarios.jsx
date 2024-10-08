// Crear_Usuario_Funcion.js
import { useState, useEffect } from "react";
import { Dialog_app } from "@/components/Elements";
import { AiOutlineUpload } from "react-icons/ai";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { Button } from "@material-tailwind/react";
import axios from "axios"; // para realizar las peticiones
import { Loader } from "@/widgets"; //Importar el componente
import { Select, Option } from "@material-tailwind/react";

export function Editar_usuarios({ openDialog, closeDialog, idUserEdit }) {
  //hacer un useefect que cargue los datos del usuario
  const [Usuarios, setUsuarios] = useState([]);
  useEffect(() => {
    ObtenerUsuarios();
  }, []);
  const ObtenerUsuarios = async () => {
    setLoader(true);
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_ACCESLINK + "usuarios/" + idUserEdit,
        {
          method: "GET",
          //headers: { "Content-Type": "application/json" },
          //credentials: "include",
        }
      );
      const data = await response.json();
      console.log(data);
      setUsuarios(data);

      //console.log(result.data);
      setLoader(false);
    } catch (error) {
      setLoader(false);
      //colocar una alerta de error cuando no se pueda inciar sesion
      setError(true);
      //setMensajeError(error.response.data.error);
      console.log(error);
    }
  };
  const [load, setLoader] = useState(false);

  const HandleChange = (e) => {
    setUsuarios({ ...Usuarios, [e.target.name]: e.target.value });
  };

  //enviar a la API a crear la categoria
  /* EJEMPLO DE COMO LA API RECIBE LA DATA
{
        "id_usuario": 28,
        "nombre_usuario": "prueba2",
        "correo": "prueba5@gmail.com",
        "contrasenia": "1234",
        "rol": "USR"
    }
*/
  //endpoint para modificar el usuario: /usuarios/modificar
  const Crear_Usuario_Funcion = async (e) => {
    e.preventDefault();
    setLoader(true);
    //preguntar primero si la wea va vacia skere
    if (
      Usuarios.nombre_usuario.trim() === "" ||
      Usuarios.contrasenia.trim() === "" ||
      Usuarios.correo.trim() === ""
    ) {
      setLoader(false);
      alert("Es obligatorio llenar los campos por favor");
      return false;
    }
    try {
      const result = await axios.put(
        process.env.NEXT_PUBLIC_ACCESLINK + "usuarios/modificar",
        Usuarios,
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
        title="Editar Usuario"
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
                  name="nombre_usuario"
                  maxLength={200}
                  required
                  value={Usuarios.nombre_usuario}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="categoria"
                >
                  correo
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="correo"
                  onChange={HandleChange}
                  name="correo"
                  maxLength={200}
                  required
                  value={Usuarios.correo}
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
                  name="contrasenia"
                  maxLength={200}
                  required
                  value={Usuarios.contrasenia}
                />
              </div>
              <div className="w-72">
                <Select
                  label="Seleccionar tipo usuario"
                  value={Usuarios.rol}
                  onChange={(val) => setUsuarios({ ...Usuarios, rol: val })}
                  //onChange={(val) => alert(val)}
                >
                  <Option //onClick={() => ({ ...Categoria, rol: "ADM" })}
                    value="ADM"
                  >
                    Admin
                  </Option>
                  <Option //onClick={() => ({ ...Categoria, rol: "   " })}
                    value="   "
                  >
                    Usuario Normal
                  </Option>
                </Select>
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
            <span className="capitalize">Guardar</span>
          </Button>
        </div>
      </Dialog_app>
    </>
  );
}

export default Editar_usuarios;
