// Crear_Categoria.js
import { useState, useEffect, useRef } from "react";
import { Dialog_app } from "@/components/Elements";
import { AiOutlineUpload } from "react-icons/ai";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { Button } from "@material-tailwind/react";
import axios from "axios"; // para realizar las peticiones
import { Dialog_Error, Loader, Notification } from "@/widgets"; //Importar el componente

export function Crear_Categoria({ openDialog, closeDialog }) {
  const [load, setLoader] = useState(false);

  //estado para almacenar lo del formulario
  const [Categoria, SetCategoria] = useState({ Nombre: "", Descripcion: "" });
  const HandleChange = (e) => {
    SetCategoria({ ...Categoria, [e.target.name]: e.target.value });
    console.log(Categoria);
  };
  //imagen
  const fileInputRef = useRef(null);
  //img preview
  const [file, setFile] = useState(null);
  const [fileP, setFileP] = useState();
  const ImagePreview = (e) => {
    try {
      setFile(e.target.files[0]);
      setFileP(URL.createObjectURL(e.target.files[0]));
    } catch (error) {
      console.log(error);
    }
  };
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Activa el input de tipo "file"
    }
  };
  //enviar a la API a crear la categoria
  const Crear_categoria = async (e) => {
    e.preventDefault();

    console.log(file);
    const byteFile = await getAsByteArray(file);

    console.log(byteFile);
    setLoader(true);
    try {
      const result = await axios.post(
        process.env.NEXT_PUBLIC_ACCESLINK + "categorias/insertar",
        {
          Nombre: Categoria.Nombre,
          Descripcion: Categoria.Descripcion,
          Color: "FFFF",
          Imagen: byteFile,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: false,
        }
        /*
        {
          withCredentials: false,
        }
          */
      );
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
  async function getAsByteArray(file) {
    return new Uint8Array(await readFile(file));
  }
  function readFile(file) {
    return new Promise((resolve, reject) => {
      // Create file reader
      let reader = new FileReader();

      // Register event listeners
      reader.addEventListener("loadend", (e) => resolve(e.target.result));
      reader.addEventListener("error", reject);

      // Read file
      reader.readAsArrayBuffer(file);
    });
  }
  return (
    <>
      {load ? <Loader /> : ""}
      <Dialog_app
        open={openDialog}
        close={closeDialog}
        title="Crear Categoria"
        size="sm"
      >
        {/* Aquí va el cuerpo del diálogo */}
        <form
          className="flex flex-col gap-4 h-96 overflow-y-auto mb-4"
          onSubmit={Crear_categoria}
        >
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
          <img
            src={!fileP ? "/img/Home/Extintor_logo.png" : fileP}
            alt="Imagen"
            className="mt-3 h-64 w-auto mx-auto"
          />
          <div className="mx-auto bg-yellow-800 p-2 rounded-xl mb-2">
            <label htmlFor="fileInput" className="text-white font-bold ">
              Subir Foto:
            </label>
            <input
              type="file"
              id="fileInput"
              onChange={ImagePreview}
              accept="image/png, .jpeg"
              className="hidden"
              ref={fileInputRef}
            />
            <Button
              className="ml-3  rounded-xl  bg-white h-11"
              onClick={handleButtonClick}
            >
              <AiOutlineUpload size="25px" color="black" />
            </Button>
          </div>
          <Button
            className="flex mx-auto  gap-3 w-28 mb-5"
            size="sm"
            color="green"
            //onClick={() => SetCrear(true)}
            type="submit"
          >
            <PlusCircleIcon className="h-4 w-4" />
            <span className="capitalize">Crear</span>
          </Button>
        </form>
      </Dialog_app>
    </>
  );
}

export default Crear_Categoria;
