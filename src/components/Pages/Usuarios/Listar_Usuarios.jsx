import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  PlusCircleIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Tooltip,
} from "@material-tailwind/react";
import { Dialog_Error, Loader, Notification } from "@/widgets"; //Importar el componente
import { useEffect, useState } from "react";
import { useMaterialTailwindController, setOpenSidenav } from "@/context";
import Head from "next/head";
import { Dialog_app } from "@/components/Elements";
import {
  Crear_usuarios,
  Editar_usuarios,
  Buscar_Usuario,
} from "@/components/Pages/Usuarios";
import axios from "axios"; // para realizar las peticiones
import { SimpleDialog } from "@/components/Elements";
//import { colores_fondo } from "@/Data/colores_fondo";
export function Listar_Usuarios() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav, borders } = controller;
  const [load, setLoader] = useState(false);

  /*LO QUE ESTOY USANDO NUEVO EN ESTE FORMULARIO */
  const [Usuarios, setUsuarios] = useState([]);
  useEffect(() => {
    ObtenerUsuarios();
  }, []);
  //funcion para cargar los niveles que tiene una seccion
  const ObtenerUsuarios = async () => {
    setLoader(true);
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_ACCESLINK + "usuarios/listar",
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
  //variable para detectar un error y mostrar el error
  const [error, setError] = useState(false);
  //variable para almacenar el mensaje del error
  const [mensajeError, setMensajeError] = useState("");

  const TABLE_HEAD = ["", "Usuario", "Correo", "Fecha de Creación", ""];

  //para abrir y cerrar el dialog
  const [Crear, SetCrear] = useState(false);
  //para abrir el editor de la categoria
  const [Editar, SetEditar] = useState(false);
  //id de la categoria seleccionada
  const [IdCategoriaSeleccionada, setIdCategoriaSeleccionada] = useState(0);
  const AbrirEditorCategoria = (id) => {
    setIdCategoriaSeleccionada(id);
    SetEditar(true);
  };
  //funcion para eliminar la categoria
  const EliminarUsuario = async () => {
    //alert(idCategoriaELiminar);
    setLoader(true);
    //usuarios/eliminar/{id_usuario}
    try {
      const result = await axios.delete(
        process.env.NEXT_PUBLIC_ACCESLINK +
          "usuarios/eliminar/" +
          UsuariosELiminar,

        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: false,
        }
      );
      SetNoficacion({
        ...Notificacion,
        Abrir: true,
        Mensaje: "Se eliminó el usuario",
        Color: "green",
      });
      setLoader(false);
      ObtenerUsuarios();
    } catch (error) {
      console.log(error);
    }
  };
  //para el buscador
  const [OpenBuscador, setOpenBuscador] = useState(false);
  //funcion que activa la busqueda
  const RealizarBusqueda = async (CuerpoBusqueda) => {
    // alert("Realizando Busqueda");
    //console.log(CuerpoBusqueda);
    //alert(idCategoriaELiminar);
    setOpenBuscador(false);
    setLoader(true);
    try {
      const result = await axios.post(
        process.env.NEXT_PUBLIC_ACCESLINK + "categorias/buscar",
        CuerpoBusqueda,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: false,
        }
      );
      // const data = await result;
      // console.log("Resultado Busqueda");
      /// console.log(result.data);
      setUsuarios(result.data);
      setLoader(false);
      SetNoficacion({
        ...Notificacion,
        Abrir: true,
        Mensaje: "Resultados de Busqueda",
        Color: "blue",
      });
      //ObtenerUsuarios();
    } catch (error) {
      alert("Error");
      //colocar una alerta de error
      setLoader(false);
      //setMensajeError(error.response.data.error);
      //setError(true);
      console.log(error);
    }
  };
  //para abrir el dialog para confirmar si se elimina o nou
  const [OpenDelete, SetOpenDelete] = useState(false);
  //para manejar la confirmacion de si eliminar o no la categoria
  const ConfirmarEliminacion = (indicador) => {
    if (indicador) EliminarUsuario();
    SetOpenDelete(false);
  };
  //estado que guarda la categoria seleccionada para eliminar
  const [UsuariosELiminar, setUsuarioEliminar] = useState(0);
  //para la notificacion
  const [Notificacion, SetNoficacion] = useState({
    Abrir: false,
    Mensaje: "Hola Mundo",
    Color: "red",
  });
  /* para la modificacion de un usuario*/
  const [OpenEditUser, setOpenEditUser] = useState(false);
  const [IdUserEdit, setIdUserEdit] = useState(0);
  const HandleEditUser = (id) => {
    setIdUserEdit(id);
    setOpenEditUser(true);
  };

  return (
    <Card
      className={`h-full w-full rounded-none ${
        borders ? "rounded-2xl" : "rounded-none"
      }`}
    >
      <Head>
        <title>Usuarios</title>
      </Head>
      <Notification
        abrir={Notificacion.Abrir}
        mensaje={Notificacion.Mensaje}
        color={Notificacion.Color}
        // SetCategoria({ ...Categoria, [e.target.name]: e.target.value });
        cerrar={() => SetNoficacion({ ...Notificacion, Abrir: false })}
      />
      {/* EDITAR USUARIO */}
      {OpenEditUser && (
        <Editar_usuarios
          closeDialog={() => (setOpenEditUser(false), ObtenerUsuarios())}
          openDialog={OpenEditUser}
          idUserEdit={IdUserEdit}
        />
      )}
      {Crear && (
        <Crear_usuarios
          openDialog={Crear}
          closeDialog={(indicador) => (
            SetCrear(false),
            ObtenerUsuarios(),
            indicador
              ? SetNoficacion({
                  ...Notificacion,
                  Abrir: true,
                  Mensaje: "Se creó un usuario",
                  Color: "green",
                })
              : ""
          )}
        />
      )}
      {Editar && (
        <Editar_usuarios
          openDialog={Editar}
          closeDialog={(indicador) => (
            SetEditar(false),
            ObtenerUsuarios(),
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
      {OpenBuscador ? (
        <Buscar_Usuario
          closeBuscador={() => setOpenBuscador(false)}
          Titulo={"Buscar Categoria"}
          RealizarBusqueda={RealizarBusqueda}
        />
      ) : (
        ""
      )}
      {/* Dialog para confirmar la eliminacion */}
      {OpenDelete ? (
        <SimpleDialog
          title={"Eliminar"}
          body={"¿Está seguro que desea eliminar el usuario?"}
          open={OpenDelete}
          close={ConfirmarEliminacion}
        />
      ) : (
        ""
      )}
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Lista de Usuarios
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Tooltip content="Crear Usuario">
              <Button
                className="flex items-center gap-3"
                size="sm"
                color="green"
                onClick={() => SetCrear(true)}
              >
                <PlusCircleIcon strokeWidth={2} className="h-4 w-4" />
                <span className="capitalize">Crear</span>
              </Button>
            </Tooltip>
            {/*
            <Tooltip content="Buscar Usuarios">
              <Button
                className="flex items-center gap-3"
                size="sm"
                color="amber"
                onClick={() => setOpenBuscador(true)}
              >
                <MagnifyingGlassIcon strokeWidth={2} className="h-4 w-4" />
                <span className="capitalize">Buscar</span>
              </Button>
            </Tooltip>
 */}
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row"></div>
      </CardHeader>
      <CardBody className="px-0">
        {Usuarios.length == 0 ? (
          <div className="mx-auto items-center text-center font-bold text-2xl">
            No hay Usuarios
          </div>
        ) : (
          ""
        )}
        <Typography
          variant="small"
          color="blue-gray"
          className="font-normal leading-none opacity-70 ml-5"
        >
          Número de usuarios:
          <span className="font-bold">{Usuarios.length}</span>
        </Typography>

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
              {Usuarios.map(
                (
                  { id_usuario, nombre_usuario, correo, fecha_creacion },
                  index
                ) => {
                  const isLast = index === Usuarios.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr
                      key={id_usuario}
                      className={`even:bg-blue-gray-50/50 cursor-pointer ${"hover:bg-gray-400"}`}
                    >
                      <td>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {index + 1}
                        </Typography>
                      </td>
                      <td>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {nombre_usuario}
                        </Typography>
                      </td>
                      <td className={`${classes} `}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {correo}
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
                      <td className={classes}>
                        <div className="flex gap-5">
                          <Tooltip content="Editar Usuario">
                            <Button
                              className="flex items-center gap-3"
                              size="sm"
                              color="yellow"
                              onClick={() => HandleEditUser(id_usuario)}
                            >
                              <PencilSquareIcon
                                strokeWidth={2}
                                className="h-4 w-4"
                              />
                              <span className="capitalize">Editar</span>
                            </Button>
                          </Tooltip>
                          <Tooltip content="Eliminar Usuario">
                            <Button
                              className="flex items-center gap-3"
                              size="sm"
                              color="red"
                              onClick={() => (
                                setUsuarioEliminar(id_usuario),
                                SetOpenDelete(true)
                              )}
                            >
                              <TrashIcon strokeWidth={2} className="h-4 w-4" />
                              <span className="capitalize">Eliminar</span>
                            </Button>
                          </Tooltip>
                        </div>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </Card>
      </CardBody>
    </Card>
  );
}
export default Listar_Usuarios;
