import {
  ListBulletIcon,
  Squares2X2Icon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import {
  Card,
  Typography,
  CardBody,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { Dialog_Error, Loader, Notification } from "@/widgets"; //Importar el componente
import { useState } from "react";
import { useMaterialTailwindController, setOpenSidenav } from "@/context";

import { Editar_Categoria } from "@/components/Pages/Categorias";
import axios from "axios"; // para realizar las peticiones
import { SimpleDialog } from "@/components/Elements";
//import { colores_fondo } from "@/Data/colores_fondo";
export function Lista_Subcategorias({ ListaSubCategorias }) {
  //Paginacion
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav, borders } = controller;
  const [load, setLoader] = useState(false);

  /*LO QUE ESTOY USANDO NUEVO EN ESTE FORMULARIO */
  //const [Categorias, setCategorias] = useState([]);

  //variable para detectar un error y mostrar el error
  const [error, setError] = useState(false);
  //variable para almacenar el mensaje del error
  const [mensajeError, setMensajeError] = useState("");

  const sidenavTypes = {
    dark: "bg-green-900 ",
    white: "bg-white shadow-sm",
    transparent: "bg-transparent",
  };
  const sidenavColors = {
    white: "border-gray-500",
    dark: "border-gray-600",
    green: "border-lime-600",
    orange: "border-orange-600",
    red: "border-red-600",
    pink: "border-pink-600",
  };
  const shadows = {
    white: "shadow-gray-500",
    dark: "shadow-gray-600",
    green: "shadow-lime-600",
    orange: "shadow-orange-600",
    red: "shadow-red-600",
    pink: "shadow-pink-600",
  };

  //para cambiar entre tablas o tarjetas
  const [ModoTarjeta, SetModoTarjeta] = useState(true);
  const TABLE_HEAD = ["Nombre", "Descripcion", "Fecha de Creacion"];

  //const bgColorClass = "hover:" + colores_fondo[sidenavColor];
  //para abrir el editor de la categoria
  const [Editar, SetEditar] = useState(false);
  //id de la categoria seleccionada
  const [IdCategoriaSeleccionada, setIdCategoriaSeleccionada] = useState(0);
  const AbrirEditorCategoria = (id) => {
    setIdCategoriaSeleccionada(id);
    SetEditar(true);
  };
  //funcion para eliminar la categoria
  const EliminarCategoria = async () => {
    //alert(idCategoriaELiminar);
    setLoader(true);
    try {
      const result = await axios.delete(
        process.env.NEXT_PUBLIC_ACCESLINK +
          "categorias/eliminar/" +
          CategoriaEliminar,

        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: false,
        }
      );
      setLoader(false);
      //ObtenerCategorias();
      SetNoficacion({
        ...Notificacion,
        Abrir: true,
        Mensaje: "Se eliminó la categoria",
        Color: "green",
      });
    } catch (error) {
      alert("Error");
      //colocar una alerta de error
      setLoader(false);
      //setMensajeError(error.response.data.error);
      //setError(true);
      console.log(error);
      SetNoficacion({
        ...Notificacion,
        Abrir: true,
        Mensaje: "No se eliminó la categoria",
        Color: "red",
      });
    }
  };
  //para abrir el dialog para confirmar si se elimina o nou
  const [OpenDelete, SetOpenDelete] = useState(false);
  //para manejar la confirmacion de si eliminar o no la categoria
  const ConfirmarEliminacion = (indicador) => {
    if (indicador) EliminarCategoria();
    SetOpenDelete(false);
  };
  //estado que guarda la categoria seleccionada para eliminar
  const [CategoriaEliminar, SetCategoriaEliminar] = useState(0);
  //para la notificacion
  const [Notificacion, SetNoficacion] = useState({
    Abrir: false,
    Mensaje: "Hola Mundo",
    Color: "red",
  });
  return (
    <>
      <Notification
        abrir={Notificacion.Abrir}
        mensaje={Notificacion.Mensaje}
        color={Notificacion.Color}
        // SetCategoria({ ...Categoria, [e.target.name]: e.target.value });
        cerrar={() => SetNoficacion({ ...Notificacion, Abrir: false })}
      />
      {Editar && (
        <Editar_Categoria
          openDialog={Editar}
          closeDialog={(indicador) => (
            SetEditar(false),
            //ObtenerCategorias(),
            indicador
              ? SetNoficacion({
                  ...Notificacion,
                  Abrir: true,
                  Mensaje: "Se editó una categoria",
                  Color: "green",
                })
              : ""
          )}
          IdCategoriaEditar={IdCategoriaSeleccionada}
        />
      )}
      {load ? <Loader /> : ""}
      {error ? (
        <Dialog_Error
          mensaje={mensajeError}
          titulo="Error en la peticion"
          cerrar={() => setError(false)}
        />
      ) : (
        ""
      )}
      {/* Dialog para confirmar la eliminacion */}
      {OpenDelete ? (
        <SimpleDialog
          title={"Eliminar"}
          body={"¿Está seguro que desea eliminar la categoria?"}
          open={OpenDelete}
          close={ConfirmarEliminacion}
        />
      ) : (
        ""
      )}
      {ListaSubCategorias ? (
        <CardBody className="px-0">
          {ListaSubCategorias === null ? (
            <div className="mx-auto items-center text-center font-bold text-2xl">
              No hay subcategorias
            </div>
          ) : (
            ""
          )}

          <Typography
            variant="small"
            color="blue-gray"
            className="font-normal leading-none opacity-70 ml-5"
          >
            Numero de Subcategorias:
            <span className="font-bold">{ListaSubCategorias.length}</span>
          </Typography>
          <div className="flex flex-row ">
            <div className="p-2 ml-4 gap-9 ">
              <Tooltip content="Tabla">
                <IconButton
                  color={!ModoTarjeta ? sidenavColor : "black"}
                  variant="outlined"
                  onClick={() => SetModoTarjeta(false)}
                >
                  <ListBulletIcon
                    className=" h-8"
                    color={!ModoTarjeta ? sidenavColor : "black"}
                  />
                </IconButton>
              </Tooltip>
              <Tooltip content="Tarjetas">
                <IconButton
                  color={ModoTarjeta ? sidenavColor : "black"}
                  variant="outlined"
                  className="ml-4"
                  onClick={() => SetModoTarjeta(true)}
                >
                  <Squares2X2Icon
                    className="h-8"
                    color={ModoTarjeta ? sidenavColor : "black"}
                  />
                </IconButton>
              </Tooltip>
            </div>
            {/*ModoTarjeta && (
         <div className="w-60 items-center mx-auto mt-2">
           Numero de tarjetas: {TamanoCards}
           <Slider
             defaultValue={TamanoCards}
             min={1}
             step={1}
             max={6}
             onChange={(e) => SetTamanoCards(e.target.value)}
           />
         </div>
       )*/}
          </div>
          {/* AQUI COLOCAR LA CONDICION PARA VERLO EN MODO TARJETA O MODO TABLA */}
          {ModoTarjeta ? (
            <div className={`grid gap-3 p-5 grid-cols-2 md:grid-cols-3`}>
              {ListaSubCategorias.map(
                (
                  {
                    id_categoria,
                    id_categoria_padre,
                    nivel,
                    nombre,
                    ruta_imagen,
                    color,
                    descripcion,
                    activo,
                    fecha_creacion,
                    fecha_modificacion,
                    acciones,
                    subcategorias,
                  },
                  index
                ) => (
                  <Tooltip content="Ver Acciones" key={id_categoria}>
                    <div
                      key={id_categoria}
                      className={`${
                        borders ? "rounded-2xl" : "rounded-none"
                      }  shadow-sm   hover:border-4 ${
                        sidenavColors[sidenavColor]
                      }  ${shadows[sidenavColor]}`}
                      // onClick={() => AbrirPreguntas(r_id_nivel, r_nivel)}
                      style={{ backgroundColor: `#${color}` }}
                    >
                      <div className="bg-zinc-900 rounded-2xl cursor-pointer">
                        <a
                          // target="blank"
                          href={
                            process.env.NEXT_PUBLIC_LINKAPP +
                            "dashboard/Categorias/Acciones/" +
                            id_categoria
                          }
                        >
                          <div className="mx-auto">
                            <div className="w-full p-4 text-center">
                              <input
                                className="w-full font-bold text-xl 	text-blue-gray-800 "
                                style={{ backgroundColor: `#${color}` }}
                                disabled
                                value={nombre}
                              />
                              <img
                                src={
                                  process.env.NEXT_PUBLIC_ACCESLINK +
                                  ruta_imagen
                                }
                                alt={descripcion}
                                className="mt-3 h-52 w-auto mx-auto"
                              />
                            </div>
                          </div>
                        </a>
                        {/* 
                       <div className="flex justify-end items-center h-full">
                         <Tooltip content="Editar">
                           <IconButton
                             color="gray"
                             variant="gradient"
                             onClick={() => AbrirEditorCategoria(id_categoria)}
                           >
                             <PencilIcon className="text-white h-8" />
                           </IconButton>
                         </Tooltip>
                         <Tooltip content="Eliminar">
                           <IconButton
                             color="red"
                             variant="gradient"
                             className="ml-1"
                             //onClick={() => EliminarCategoria(id_categoria)}
                             onClick={() => (
                               SetCategoriaEliminar(id_categoria),
                               SetOpenDelete(true)
                             )}
                           >
                             <TrashIcon className="text-white h-8" />
                           </IconButton>
                         </Tooltip>
                       </div>
 */}
                      </div>
                    </div>
                  </Tooltip>
                )
              )}
            </div>
          ) : (
            <Card
              className={`h-full w-full  p-3 shadow-none ${
                borders ? "rounded-2xl" : "rounded-none"
              }`}
            >
              {/* MODO TABLA */}
              <table
                className={`w-full min-w-max table-auto text-left ${
                  borders ? "rounded-2xl" : "rounded-none"
                }`}
              >
                <thead>
                  <tr>
                    {TABLE_HEAD.map((head) => (
                      <th
                        key={head}
                        className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none opacity-70"
                        >
                          {head}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ListaSubCategorias.map(
                    (
                      {
                        id_categoria,
                        id_categoria_padre,
                        nivel,
                        nombre,
                        ruta_imagen,
                        color,
                        descripcion,
                        activo,
                        fecha_creacion,
                        fecha_modificacion,
                        acciones,
                        subcategorias,
                      },
                      index
                    ) => {
                      const isLast = index === ListaSubCategorias.length - 1;
                      const classes = isLast
                        ? "p-4"
                        : "p-4 border-b border-blue-gray-50";

                      return (
                        <tr
                          key={id_categoria}
                          className={`even:bg-blue-gray-50/50 cursor-pointer ${"hover:bg-gray-400"}`}
                        >
                          <td>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {nombre}
                            </Typography>
                          </td>
                          <td className={`${classes} `}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {descripcion}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {fecha_creacion}
                            </Typography>
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </Card>
          )}
        </CardBody>
      ) : (
        "No hay SubCategorias"
      )}
    </>
  );
}
export default Lista_Subcategorias;
