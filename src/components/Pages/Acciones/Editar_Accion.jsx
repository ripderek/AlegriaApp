import { useState, useRef, useEffect } from "react";
import { Dialog_app } from "@/components/Elements";
import { AiOutlineUpload } from "react-icons/ai";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { Button, Checkbox } from "@material-tailwind/react";
import axios from "axios"; // para realizar las peticiones
import { Loader } from "@/widgets"; //Importar el componente
import Lottie from "lottie-react";
import anim from "../../../../public/anim/picture.json";
/* PARA EL SELECTOR DE COLORES */
import ColorPicker from "@rc-component/color-picker";
import "@rc-component/color-picker/assets/index.css";

export function Editar_Accion({
  openDialog,
  closeDialog,
  IdAccionEditar,
  IDCategoria,
}) {
  const [load, setLoader] = useState(false);
  //imagen
  const fileInputRef = useRef(null);
  //img preview
  const [fileP, setFileP] = useState();
  const [base64Image, setBase64Image] = useState("");
  const [color, setColor] = useState("#ffffff");
  //estado para almacenar lo del formulario
  const [Categoria, SetCategoria] = useState({ accion: "", Descripcion: "" });
  const [Estado, SetEstado] = useState(true);
  //hacer un useEffect para poder obtener los datos de la categoria a editar
  useEffect(() => {
    //alert(IdAccionEditar);
    ObtenerDatosAcciones();
  }, []);
  const ObtenerDatosAcciones = async () => {
    //alert(IdAccionEditar);
    setLoader(true);
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_ACCESLINK + "acciones/" + IdAccionEditar,
        {
          method: "GET",
          //headers: { "Content-Type": "application/json" },
          //credentials: "include",
        }
      );
      const data = await response.json();
      console.log(data);
      SetCategoria(data);
      setColor(`#${data.color}`);
      SetEstado(data.activo);
      //console.log(result.data);
      setLoader(false);
    } catch (error) {
      alert("Error");
      setLoader(false);
      //colocar una alerta de error cuando no se pueda inciar sesion
      //setError(true);
      //setMensajeError(error.response.data.error);
      console.log(error);
    }
  };
  const HandleChange = (e) => {
    SetCategoria({ ...Categoria, [e.target.name]: e.target.value });
    //console.log(Categoria);
  };

  const ImagePreview = (e) => {
    try {
      setFileP(URL.createObjectURL(e.target.files[0]));

      const selectedFile = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onloadend = () => {
        const base64String = reader.result.replace(
          /^data:image\/[a-z]+;base64,/,
          ""
        );
        setBase64Image(base64String);
      };
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
  const EditarCategoria = async (e) => {
    e.preventDefault();
    //verifcar que los inputs tengan datos
    if (Categoria.accion.trim() === "" || Categoria.Descripcion.trim() === "") {
      setLoader(false);
      alert(
        "Llene los campos obligatorios como Nombre y descripcion por favor"
      );

      return false;
    }
    setLoader(true);
    try {
      const result = await axios.put(
        process.env.NEXT_PUBLIC_ACCESLINK + "acciones/modificar",
        {
          accion: Categoria.accion,
          descripcion: Categoria.Descripcion,
          color: color.substring(1), //aqui se elimina el # porque la api esta recibiendo el color sin ese simbolo
          imagen: base64Image,
          //imagen: "",
          //imagen: "pinche Maholy",
          id_accion: IdAccionEditar,
          //id_categoria_padre: Categoria.id_categoria_padre,
          // nivel: Categoria.nivel,
          activo: Estado,
          //acciones: Categoria.acciones,
          //subcategorias: Categoria.subcategorias,
          id_categoria: parseInt(IDCategoria),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: false,
        }
      );
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
  const handleColor = (value, type) => {
    //console.log(value.toHexString());
    setColor(value.toHexString());
    //console.log(type);
  };
  const handleChecked = (event) => {
    SetEstado(event.target.checked);
  };
  return (
    <>
      {load ? <Loader /> : ""}
      <Dialog_app
        open={openDialog}
        close={() => closeDialog(false)}
        title={`Editar Accion`}
        size="lg"
      >
        {/* Aquí va el cuerpo del diálogo */}
        {/* Crear un contenedor con dos div en forma de columas */}
        <div className={`grid grid-cols-2`}>
          <div key={1}>
            <form
              className="flex flex-col gap-4 h-96 overflow-y-auto mb-4"
              onSubmit={EditarCategoria}
              id="FormularioCrearCategoria"
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
                  id="accion"
                  type="text"
                  placeholder="Nombre de la accion"
                  onChange={HandleChange}
                  name="accion"
                  value={Categoria.accion}
                  required
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
                  id="Descripcion"
                  placeholder="Descripción de la categoría"
                  onChange={HandleChange}
                  name="Descripcion"
                  value={Categoria.Descripcion}
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="categoria"
                >
                  Color
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  //id="categoria"
                  type="text"
                  placeholder="Codigo del color"
                  //onChange={HandleChange}
                  name="Nombre"
                  value={color}
                />
              </div>
              <div className="mx-auto mb-5">
                <ColorPicker
                  onChange={handleColor}
                  defaultValue={color}
                  value={color}
                />
              </div>
              <Checkbox
                label="Activo"
                checked={Estado}
                onChange={handleChecked}
              />
            </form>
          </div>
          {/* DIV DERECHO PARA LA FOTO */}
          <div key={2}>
            <label className="text-black font-bold ">Subir Foto:</label>
            <div className="mx-auto bg-yellow-800 p-2 rounded-xl mb-2 w-2/5 text-center items-center">
              <input
                type="file"
                id="fileInput"
                onChange={ImagePreview}
                accept="image/png, .jpeg"
                className="hidden"
                ref={fileInputRef}
              />
              <Button
                className="rounded-xl mx-auto bg-white h-11"
                onClick={handleButtonClick}
              >
                <AiOutlineUpload size="25px" color="black" />
              </Button>
            </div>
            {/*   <Lottie animationData={anim} className="w-32 mx-auto" /> */}
            {fileP ? (
              <img
                src={fileP}
                alt="Imagen"
                className="mt-3 h-64 w-64  mx-auto"
              />
            ) : (
              <img
                src={process.env.NEXT_PUBLIC_ACCESLINK + Categoria.ruta_imagen}
                alt="Imagen"
                className="mt-3 h-64 w-64  mx-auto"
              />
            )}
            {/*  <img
              src={!fileP ? "/img/Home/Extintor_logo.png" : fileP}
              alt="Imagen"
              className="mt-3 h-64 w-auto mx-auto"
            />*/}
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

export default Editar_Accion;
