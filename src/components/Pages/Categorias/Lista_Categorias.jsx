import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  UsersIcon,
  ArrowLeftOnRectangleIcon,
  PlusCircleIcon,
  Cog6ToothIcon,
  ListBulletIcon,
  Squares2X2Icon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  CardFooter,
  IconButton,
  Tooltip,
  Slider,
} from "@material-tailwind/react";
import { Dialog_Error, Loader, Notification } from "@/widgets"; //Importar el componente
import { useEffect, useState } from "react";
import { useMaterialTailwindController, setOpenSidenav } from "@/context";
import Head from "next/head";
import { Dialog_app } from "@/components/Elements";
import {
  Crear_Categoria,
  Editar_Categoria,
  Buscar_Categoria,
} from "@/components/Pages/Categorias";
import axios from "axios"; // para realizar las peticiones
import { SimpleDialog } from "@/components/Elements";
//import { colores_fondo } from "@/Data/colores_fondo";
export function Lista_Categorias() {
  //Paginacion
  const [currentPage, setCurrentPage] = useState(1);
  const [value, setValue] = useState("4");
  const itemsPorPag = value; // Numero de niveles a mostra por pagina
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav, borders } = controller;
  const [load, setLoader] = useState(false);

  /*LO QUE ESTOY USANDO NUEVO EN ESTE FORMULARIO */
  const [Categorias, setCategorias] = useState([]);
  useEffect(() => {
    ObtenerCategorias();
  }, []);
  //funcion para cargar los niveles que tiene una seccion
  const ObtenerCategorias = async () => {
    setLoader(true);

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_ACCESLINK + "categorias/listar",
        {
          method: "GET",
          //headers: { "Content-Type": "application/json" },
          //credentials: "include",
        }
      );
      const data = await response.json();

      console.log(data);
      setCategorias(data);
      //console.log(result.data);
      setLoader(false);
    } catch (error) {
      //alert("Error");
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

  // Obtener el total de páginas
  const totalNiveles = Categorias.length;
  const totalPages = Math.ceil(totalNiveles / itemsPorPag);

  // Calcular el índice del primer y último formulario en la página actual
  const indexOfLastItem = currentPage * itemsPorPag;
  const indexOfFirstItem = indexOfLastItem - itemsPorPag;
  const currentItems = Categorias.slice(indexOfFirstItem, indexOfLastItem);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  //para modificar el tamano de las cards
  const [TamanoCards, SetTamanoCards] = useState(3);
  //para cambiar entre tablas o tarjetas
  const [ModoTarjeta, SetModoTarjeta] = useState(true);
  const TABLE_HEAD = ["Nombre", "Descripción", "Fecha de Creación"];
  const colores_fondo = {
    dark: "bg-gray-900",
    //white: "bg-pink-100 shadow-sm",
    white: "bg-white",
    transparent: "bg-transparent",
    green: "bg-lime-400",
    orange: "bg-orange-400",
    red: "bg-red-400",
    pink: "bg-pink-400",
    purple: "bg-purple-500",
  };
  //const bgColorClass = "hover:" + colores_fondo[sidenavColor];

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
      ObtenerCategorias();
      SetNoficacion({
        ...Notificacion,
        Abrir: true,
        Mensaje: "Se eliminó la categoria",
        Color: "green",
      });
    } catch (error) {
      //alert("Error");
      //colocar una alerta de error
      setLoader(false);
      //setMensajeError(error.response.data.error);
      //setError(true);
      console.log(error);
      SetNoficacion({
        ...Notificacion,
        Abrir: true,
        Mensaje: error.response.data.error,
        Color: "red",
      });
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
      setCategorias(result.data);
      setLoader(false);
      SetNoficacion({
        ...Notificacion,
        Abrir: true,
        Mensaje: "Resultados de Busqueda",
        Color: "blue",
      });
      //ObtenerCategorias();
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
    <Card
      className={`h-full w-full rounded-none ${
        borders ? "rounded-2xl" : "rounded-none"
      }`}
    >
      <Head>
        <title>Categorias</title>
      </Head>
      <Notification
        abrir={Notificacion.Abrir}
        mensaje={Notificacion.Mensaje}
        color={Notificacion.Color}
        // SetCategoria({ ...Categoria, [e.target.name]: e.target.value });
        cerrar={() => SetNoficacion({ ...Notificacion, Abrir: false })}
      />

      {Crear && (
        <Crear_Categoria
          openDialog={Crear}
          closeDialog={(indicador) => (
            SetCrear(false),
            ObtenerCategorias(),
            indicador
              ? SetNoficacion({
                  ...Notificacion,
                  Abrir: true,
                  Mensaje: "Se creó una categoria",
                  Color: "green",
                })
              : ""
          )}
        />
      )}
      {Editar && (
        <Editar_Categoria
          openDialog={Editar}
          closeDialog={(indicador) => (
            SetEditar(false),
            ObtenerCategorias(),
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
        <Buscar_Categoria
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
          body={"¿Está seguro que desea eliminar la categoria?"}
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
              Lista de categorias
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Las siguientes categorias se encuentran disponibles
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            {/* 
            <Tooltip content="Regresar">
              <Button
                variant="outlined"
                size="sm"
                color="orange"
                //onClick={AbrirSecciones}
              >
                <ArrowLeftOnRectangleIcon strokeWidth={2} className="h-6 w-6" />
              </Button>
            </Tooltip>
            */}
            <Tooltip content="Crear Categoria">
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
            <Tooltip content="Buscar Categoria">
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
            {/* 
            <Tooltip content="Editar">
              <Button
                className="flex items-center gap-3"
                size="sm"
                color="cyan"
                //onClick={() => OpenEditar(true)}
              >
                <PencilIcon strokeWidth={2} className="h-4 w-4" />
              </Button>
            </Tooltip>

            <Tooltip content="Participantes">
              <Button
                className="flex items-center gap-3"
                size="sm"
                color="blue-gray"
                // onClick={() => setAbrirListaParticipantes(true)}
              >
                <UsersIcon strokeWidth={2} className="h-4 w-4" />
              </Button>
            </Tooltip>
            <Tooltip content="Configuracion">
              <Button
                className="flex items-center gap-3"
                size="sm"
                color="red"
                //onClick={() => setAbrirConfig(true)}
                //onClick={() => (handleOpen(), ObtenerTiposPReguntas())}
                //onClick={() => AbrirPlantilla(1, "", id_nivel)}
              >
                <Cog6ToothIcon strokeWidth={2} className="h-4 w-4" />
              </Button>
            </Tooltip>
            */}
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          {/* 
          <Tabs value="all" className="w-full md:w-max">
            <TabsHeader>
              {TABS.map(({ label, value }) => (
                <Tab key={value} value={value}>
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
          <div className="w-full md:w-72">
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
          </div>
          */}
        </div>
      </CardHeader>
      <CardBody className="px-0">
        {Categorias.length == 0 ? (
          <div className="mx-auto items-center text-center font-bold text-2xl">
            No hay categorias
          </div>
        ) : (
          ""
        )}
        <Typography
          variant="small"
          color="blue-gray"
          className="font-normal leading-none opacity-70 ml-5"
        >
          Número de categorias:
          <span className="font-bold">{Categorias.length}</span>
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
            {Categorias.map(
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
                                process.env.NEXT_PUBLIC_ACCESLINK + ruta_imagen
                              }
                              alt={descripcion}
                              className="mt-3 h-52 w-auto mx-auto"
                            />
                          </div>
                        </div>
                      </a>
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
                {Categorias.map(
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
                    const isLast = index === Categorias.length - 1;
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
      {/* 
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Pagina {currentPage} de {totalPages}
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm" onClick={handlePreviousPage}>
            Anterior
          </Button>
          <Button variant="outlined" size="sm" onClick={handleNextPage}>
            Siguiente
          </Button>
        </div>
      </CardFooter>
      */}
    </Card>
  );
}
export default Lista_Categorias;
