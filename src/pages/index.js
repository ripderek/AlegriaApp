import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
} from "@material-tailwind/react";
import axios from "axios"; // para realizar las peticiones
import { Loader, Notification } from "@/widgets"; //Importar el componente
import Head from "next/head";
import Cookies from "universal-cookie";
import Router from "next/router";

export default function login() {
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
      console.log(result);
      setLoader(false);
      //crear un token enviarlo a las cookies y redireccionar a la paguina principal
      GenerarJWT();
      //redireccionar
      const nuevaRuta = "/dashboard/Categorias"; //
      Router.push(nuevaRuta);
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
      const cookies = new Cookies();
      cookies.set("Token", token, { path: "/" }); //enviar cokiee y almacenarla
    } catch (error) {
      alert("Error");

      console.log(error);
    }
  };

  return (
    <Card className="w-96 mt-16 mx-auto">
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
      <CardHeader
        variant="gradient"
        color="transparent"
        className="mb-4 grid h-18 place-items-center shadow-none  "
      >
        <Typography variant="h3" color=" black">
          Inicio Sesión
        </Typography>
      </CardHeader>
      <CardBody className="flex flex-col gap-4">
        <form
          className="flex flex-col gap-4"
          //onSubmit={Crear_categoria}
          id="formularioInicioSesion"
          onSubmit={InicioSesion}
        >
          <Input
            label="Nombre de usuario"
            size="lg"
            name="nombre_usuario"
            onChange={HandleChange}
          />
          <Input
            label="Contraseña"
            size="lg"
            name="contrasenia"
            onChange={HandleChange}
          />
        </form>
      </CardBody>
      <CardFooter className="pt-0">
        <Button
          variant="gradient"
          fullWidth
          type="submit"
          form="formularioInicioSesion"
          color="blue"
        >
          Continuar
        </Button>
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
  );
}
