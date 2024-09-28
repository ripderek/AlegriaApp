import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
  IconButton,
} from "@material-tailwind/react";
import axios from "axios"; // para realizar las peticiones
import { Loader, Notification } from "@/widgets"; //Importar el componente
import Head from "next/head";
import Cookies from "universal-cookie";
import Router from "next/router";
import { useMaterialTailwindController, setTypeUser } from "@/context";
import Image from "next/image";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
export default function Login() {
  const [controller, dispatch] = useMaterialTailwindController();
  const [VerContra, setVerContra] = useState(false);
  const [load, setLoader] = useState(false);
  const [Notificacion, SetNoficacion] = useState({
    Abrir: false,
    Mensaje: "Hola Mundo",
    Color: "red",
  });
  const [datasesion, SetDataSesion] = useState({
    nombre_usuario: "",
    contrasenia: "",
  });
  const HandleChange = (e) => {
    SetDataSesion({ ...datasesion, [e.target.name]: e.target.value });
    console.log(e.target.name, e.target.value);
  };
  //hacer la funcion para enviarlo los datos para el inicio de sesion
  //enviar a la API a crear la categoria
  const cookies = new Cookies();
  const InicioSesion = async (e) => {
    e.preventDefault();
    setLoader(true);
    console.log(datasesion);
    //preguntar primero si la wea va vacia skere
    if (
      datasesion.nombre_usuario.trim() === "" ||
      datasesion.contrasenia.trim() === ""
    ) {
      setLoader(false);
      alert("Es obligatorio llenar los campos por favor");
      return false;
    }
    try {
      const result = await axios.post(
        process.env.NEXT_PUBLIC_ACCESLINK + "login",
        datasesion,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: false,
        }
      );
      console.log(result.data);
      //setLoader(false);
      //crear un token enviarlo a las cookies y redireccionar a la paguina principal
      await GenerarJWT();
      //obtener los datos del usuario que incio sesion
      let rolUser = result.data.rol;

      //colocar en el contexto si es admin o no el usuario
      setTypeUser(dispatch, rolUser === "ADM" ? true : false);
      //redireccionar
      const nuevaRuta = "/dashboard/Categorias"; //
      cookies.set("Nombres", result.data.nombre_usuario); //enviar cokiee y almacenarla
      cookies.set("Type", rolUser); //enviar cokiee y almacenarla

      Router.push(nuevaRuta);

      //nombre_usuario
    } catch (error) {
      //alert(error.response.data.error);
      //colocar una alerta de error
      setLoader(false);
      //setMensajeError(error.response.data.error);
      //setError(true);
      // console.log(error);
      SetNoficacion({
        ...Notificacion,
        Abrir: true,
        Mensaje: error.response.data.error,
        Color: "red",
      });
    }
  };

  const GenerarJWT = async () => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: datasesion.nombre_usuario.trim(),
          role: "Pruebita",
        }),
      });
      const data = await response.json();
      // console.log(data.token);
      // guardar el token en las cookies
      let token = data.token;

      cookies.set("Token", token, { path: "/" }); //enviar cokiee y almacenarla
    } catch (error) {
      alert("Error");
      setLoader(false);
      console.log(error);
    }
  };

  return (
    <div className="w-full">
      <Head>
        <title>Iniciar sesión</title>
      </Head>
      {load ? <Loader /> : ""}
      <Notification
        abrir={Notificacion.Abrir}
        mensaje={Notificacion.Mensaje}
        color={Notificacion.Color}
        // SetCategoria({ ...Categoria, [e.target.name]: e.target.value });
        cerrar={() => SetNoficacion({ ...Notificacion, Abrir: false })}
      />
      {/* NAVBAR */}
      <nav className="  shadow-none bg-green-900 border-orange-600 border-4  rounded-none">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
          <Image
            src="/img/Home/uteq_logo3.png"
            width={150}
            height={100}
            alt="Flowbite Logo"
          />
          <div>
            <a href="/Acerca">
              <div
                className=" h-auto hover:bg-yellow-400 bg-white  flex items-center justify-center mt-4 cursor-pointer text-center rounded-none mx-auto w-full border-4 border-solid border-orange-500 "
                //onClick={loginG}
              >
                <div className=" font-bold text-black p-3 ">Acerca de</div>
              </div>
            </a>
          </div>
        </div>
      </nav>
      {/* NUEVO LOGIN */}
      <Card className="w-full max-w-[48rem]  flex-row mx-auto mt-20 rounded-none shadow-none border-4 border-orange-600">
        <CardHeader
          shadow={false}
          floated={false}
          className="m-0 w-2/5 shrink-0 rounded-r-none p-10"
        >
          <Image
            src="/img/Home/logo.png"
            alt="card-image"
            width={250}
            height={250}
          />
        </CardHeader>
        <CardBody className="w-full">
          <form
            className="flex flex-col gap-4"
            //onSubmit={Crear_categoria}
            id="formularioInicioSesion"
            onSubmit={InicioSesion}
          >
            <Typography variant="h3" color="black">
              Inicio Sesión
            </Typography>
            <Input
              label="Nombre de usuario"
              size="lg"
              name="nombre_usuario"
              onChange={HandleChange}
            />
            <div className="flex">
              <Input
                label="Contraseña"
                size="lg"
                name="contrasenia"
                type={VerContra ? "text" : "password"}
                //type="password"
                onChange={HandleChange}
              />

              <IconButton
                variant="text"
                color="blue-gray"
                onClick={() => setVerContra(!VerContra)}
              >
                {VerContra ? (
                  <EyeSlashIcon
                    strokeWidth={3}
                    className="h-8 w-8 text-blue-gray-500"
                  />
                ) : (
                  <EyeIcon
                    strokeWidth={3}
                    className="h-8 w-8 text-blue-gray-500"
                  />
                )}
              </IconButton>
            </div>

            <Button
              variant="gradient"
              fullWidth
              type="submit"
              form="formularioInicioSesion"
              color="red"
              //className="w-7/12 mx-auto"
            >
              Continuar
            </Button>
          </form>
        </CardBody>
        <CardFooter className="pt-0">
          {/*
       <Typography variant="small" className="mt-6 flex justify-center">
         ¿No tienes una cuenta?
         <Typography
           as="a"
           href="#signup"
           variant="small"
           color="blue-gray"
           className="ml-1 font-bold"
         >
           crear cuenta
         </Typography>
       </Typography>
*/}
        </CardFooter>
      </Card>
      {/* FOOTER  */}
    </div>
  );
}
