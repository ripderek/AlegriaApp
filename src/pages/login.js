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

export default function login() {
  const [datasesion, SetDataSesion] = useState({
    usuario: "",
    contrasenia: "",
  });
  const HandleChange = (e) => {
    SetDataSesion({ ...datasesion, [e.target.name]: e.target.value });
    console.log(e.target.name, e.target.value);
  };
  //hacer la funcion para enviarlo los datos para el inicio de sesion
  return (
    <Card className="w-96 mt-16 mx-auto">
      <CardHeader
        variant="gradient"
        color="blue-gray"
        className="mb-4 grid h-28 place-items-center"
      >
        <Typography variant="h3" color="white">
          Inicio Sesión
        </Typography>
      </CardHeader>
      <CardBody className="flex flex-col gap-4">
        <form
          className="flex flex-col gap-4"
          //onSubmit={Crear_categoria}
          id="formularioInicioSesion"
        >
          <Input
            label="usuario"
            size="lg"
            name="usuario"
            onChange={HandleChange}
          />
          <Input
            label="contraseña"
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
        >
          Continuar
        </Button>
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
      </CardFooter>
    </Card>
  );
}
