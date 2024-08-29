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
import { Loader } from "@/widgets"; //Importar el componente

export default function login() {
  const [load, setLoader] = useState(false);

  const [datasesion, SetDataSesion] = useState({
    Nombre_usuario: "",
    Contrasenia: "",
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
      datasesion.Nombre_usuario.trim() === "" ||
      datasesion.Contrasenia.trim() === ""
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
      alert("No error");
      console.log(result);
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
    <Card className="w-96 mt-16 mx-auto">
      {load ? <Loader /> : ""}
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
            name="Nombre_usuario"
            onChange={HandleChange}
          />
          <Input
            label="Contraseña"
            size="lg"
            name="Contrasenia"
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
