export const Plantilla_1 = {
  Code: `import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
 import { Fragment, useState, useEffect } from "react";
 import { Loader,Dialog_Error,Notification  } from "@/widgets";
 import axios from "axios"; // para realizar las peticiones
export default function  SimpleRegistrationForm() {
 const [load, setLoader] = useState(false);
 const [error, setError] = useState(false);
  const [mensajeError, setMensajeError] = useState("");
  ${FuncionesGetPost}
  /*Aqui colocar los ejemplos de funcion get y post*/
  /*
  EJEMPLO DE FUNCION GET CON UN USEEFECT
  useEffect(() => {
    CargarDatos();
  }, []);
  const CargarDatos = async () => {
    setLoader(true);
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_ACCESLINK +
          "users/Datos_Usuario/" +
          cookies.get("id_user"),
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      const data = await response.json();
      //setData_User(data);
      //console.log(result.data);
      setLoader(false);
    } catch (error) {
      setLoader(false);
      //colocar una alerta de error 
      setError(true);
      setMensajeError(error.response.data.error);
    }
  };
  */
 /*EJEMPLO DE FUNCION POST CON AXIOS*/
 /*
    const Crear_Seccion = async () => {
    setLoader(true);
    try {
      const result = await axios.post(
        process.env.NEXT_PUBLIC_ACCESLINK + "test/Crear_Test",
        {
          p_Titulo: seccion.p_Titulo,
          p_Fecha_hora_cierre: fechaHoraCierreFormateada,
        },
        {
          withCredentials: true,
        }
      );
      setLoader(false);
    } catch (error) {
      //colocar una alerta de error 
      setLoader(false);
      setMensajeError(error.response.data.error);
      setError(true);
    }
  };
 */
  return (
  <>
    {load ? <Loader /> : ""}
    {error && (
          <Dialog_Error
            mensaje={mensajeError}
            titulo="Error"
            cerrar={()=>setError(false)}
          />
        )}
     <Card color="transparent" shadow={false}>
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
       <Typography variant="h4" color="blue-gray">
        ${Titulo}
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        ${SubTitulo}
      </Typography>
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Your Name
          </Typography>
          <Input
            size="lg"
            placeholder="name@mail.com"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Your Email
          </Typography>
          <Input
            size="lg"
            placeholder="name@mail.com"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Password
          </Typography>
          <Input
            type="password"
            size="lg"
            placeholder="********"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
        </div>
        <Checkbox
          label={
            <Typography
              variant="small"
              color="gray"
              className="flex items-center font-normal"
            >
              I agree the
              <a
                href="#"
                className="font-medium transition-colors hover:text-gray-900"
              >
                &nbsp;Terms and Conditions
              </a>
            </Typography>
          }
          containerProps={{ className: "-ml-2.5" }}
        />
        <Button className="mt-6" fullWidth>
          sign up
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          Already have an account?{" "}
          <a href="#" className="font-medium text-gray-900">
            Sign In
          </a>
        </Typography>
      </form>
    </Card>
    </>
  );
}`,
};
