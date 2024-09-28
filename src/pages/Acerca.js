import { Typography, Avatar, Button } from "@material-tailwind/react";
import Head from "next/head";
import Image from "next/image";
import { Participantes } from "@/Data/Participantes";
import { AiOutlineDownload } from "react-icons/ai";

export default function Acerca() {
  //funcion para descargar el apk
  const handleDownload = () => {
    const apkUrl = "/APK/ComuniKids.apk";

    const link = document.createElement("a");
    link.href = apkUrl;
    link.setAttribute("download", "ComuniKids.apk");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div>
      <Head>
        <title>Acerca de </title>
      </Head>
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
            <a href="/">
              <div
                className=" h-auto hover:bg-yellow-400 bg-white  flex items-center justify-center mt-4 cursor-pointer text-center rounded-none mx-auto w-full border-4 border-solid border-orange-500 "
                //onClick={loginG}
              >
                <div className=" font-bold text-black p-3 ">Iniciar Sesión</div>
              </div>
            </a>
          </div>
        </div>
      </nav>
      {/**UTEQ */}
      <Typography
        as="a"
        // href="#"
        color="black"
        variant="h3"
        className="mx-auto border-b-2 max-w-sm border-green-300 text-center mt-5"
      >
        ¿Quiénes somos?
      </Typography>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-1 mt-10 mx-24 text-center">
        <div>
          <Image
            src="/img/Home/UTEQ.png"
            alt="card-image"
            width={200}
            height={200}
            className="mx-auto"
          />
        </div>
        <div>
          <div className="mx-10 gap-4">
            <Typography variant="h3" color="black" className="mb-4">
              Universidad Técnica Estatal de Quevedo
            </Typography>
            <p align="justify">
              La UTEQ es una universidad pública ecuatoriana situada en la
              ciudad de Quevedo. Tiene como objetivo formar profesionales y
              académicos con visión científica y humanista capaces de
              desarrollar investigaciones, crear tecnologías, mantener y
              difundir nuestros saberes y culturas ancestrales.
            </p>
          </div>
        </div>
      </div>
      {/**FE Y ALEGRIA */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-1 mt-10 mx-24 text-center">
        <div className="mx-10 ">
          <Typography variant="h3" color="black" className="mb-4">
            Fe y alegría
          </Typography>
          <p align="justify">
            Fe y Alegría Ecuador es una institución que se dedica a garantizar
            el derecho a una educación de calidad, enfocándose en la innovación
            como principio y estrategia clave para transformar las prácticas
            educativas. Implementa el Sistema de Mejora de la Calidad de la
            Educación de Fe y Alegría (SMCFYA) para promover una cultura de
            calidad en sus centros educativos.
          </p>
        </div>

        <div className="">
          <Image
            src="/img/Home/logo.png"
            alt="card-image"
            width={200}
            height={200}
            className="mx-auto"
          />
        </div>
      </div>
      {/* FOTOS DE LA APP MOVIL  */}
      <div className="mb-10 mt-10">
        <Typography
          as="a"
          // href="#"
          color="black"
          variant="h3"
          className="mx-auto border-b-2 max-w-sm border-green-300 text-center mt-5"
        >
          Aplicación móvil
        </Typography>
        <div>
          {/* RECORRER LAS IMAGENES DE LA APP MOVIL SKERE */}

          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-8 mx-24 ">
            {Participantes[0].FotosAppMovil.map(({ fotoSrc }, index) => (
              <div className="flex mx-auto w-full bg-transparent" key={index}>
                <Image
                  src={fotoSrc}
                  alt="card-image"
                  width={200}
                  height={200}
                  className="mx-auto"
                />
              </div>
            ))}
          </div>
          <div
            className="mx-auto bg-green-800 p-2 rounded-xl max-w-48 mt-10 cursor-pointer hover:bg-yellow-900"
            onClick={handleDownload}
          >
            <span htmlFor="fileInput" className="text-white font-bold ml-2 ">
              Descargar
            </span>

            <Button
              className="ml-3  rounded-xl  bg-white h-11"
              //onClick={handleButtonClick}
            >
              <AiOutlineDownload size="25px" color="black" />
            </Button>
          </div>
        </div>
      </div>
      {/* AQUI TIENEN QUE IR LAS CARDS CON LOS PERSONAJES XD */}
      <div className="bg-green-50 p-5 border-t-2 border-green-300">
        <div className=" mx-auto text-center ">
          <Typography
            as="a"
            // href="#"
            color="black"
            variant="h3"
            className="mx-auto border-b-2 max-w-sm border-green-300"
          >
            Equipo de trabajo
          </Typography>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5 mx-10 ">
          {Participantes[0].Lista_participantes.map(
            ({ Nombres, Descripcion, Foto, Correo }, index) => (
              <div
                className="flex mx-auto w-full bg-white  border-b-2 border-green-300"
                key={index}
              >
                <div className="p-4">
                  <Avatar
                    src={Foto}
                    alt="avatar"
                    size="xl"
                    className="border-2 border-green-300 "
                  />
                </div>
                <div className="mt-4">
                  <Typography
                    as="a"
                    // href="#"
                    color="black"
                    variant="h6"
                  >
                    {Nombres}
                  </Typography>
                  <Typography
                    as="a"
                    // href="#"
                    color="black"
                    variant="paragraph"
                  >
                    {Descripcion}
                  </Typography>
                  <Typography
                    as="a"
                    // href="#"
                    color="black"
                    variant="paragraph"
                  >
                    {Correo}
                  </Typography>
                </div>
              </div>
            )
          )}
        </div>
      </div>
      {/* Administracion */}
      <div className="bg-green-50 p-5">
        <div className=" mx-auto text-center ">
          <Typography
            as="a"
            // href="#"
            color="black"
            variant="h3"
            className="mx-auto border-b-2 max-w-sm border-green-300"
          >
            En la administración de:
          </Typography>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-5 mx-24 text-center">
          {Participantes[0].ListaAdministradores.map(({ Nombres }, index) => (
            <div className="flex mx-auto w-full   text-center" key={index}>
              <div className="mt-4 text-center items-center justify-center mx-auto">
                <Typography
                  as="a"
                  // href="#"
                  color="black"
                  variant="h6"
                  className="text-center items-center justify-center"
                >
                  {Nombres}
                </Typography>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* CON LA COLOBRACION DE  */}
      <div className="bg-green-50 p-5">
        <div className=" mx-auto text-center ">
          <Typography
            as="a"
            // href="#"
            color="black"
            variant="h3"
            className="mx-auto border-b-2 max-w-sm border-green-300"
          >
            Con la colaboración de:
          </Typography>
        </div>
        <div className="mx-auto text-center mt-10">
          <Typography
            as="a"
            // href="#"
            color="black"
            variant="h6"
            className="text-center items-center justify-center"
          >
            {Participantes[0].Colaboracion}
          </Typography>
        </div>
      </div>
      {/* FOOTER */}
      <footer className="w-full bg-black p-8">
        <div className="flex flex-row flex-wrap  gap-y-6 gap-x-12 bg-transparent text-center md:justify-between">
          <ul className="items-start text-left  gap-y-2 gap-x-8">
            <li>
              <Typography
                as="a"
                // href="#"
                color="white"
                variant="h4"
                className="font-bold transition-colors "
              >
                Universidad Técnica Estatal de Quevedo
              </Typography>
            </li>
            <li>
              <Typography
                as="a"
                // href="#"
                color="white"
                variant="paragraph"
                className="font-normal transition-colors "
              >
                Campus Central Av. Quito km. 11/2 vía a Santo Domingo de los
                Tsáchilas
              </Typography>
            </li>
            <li>
              <Typography
                as="a"
                // href="#"
                color="white"
                variant="paragraph"
                className="font-normal transition-colors "
              >
                Quevedo - Los Ríos - Ecuador
              </Typography>
            </li>
            <li>
              <Typography
                as="a"
                href="https://www.uteq.edu.ec/es "
                color="white"
                variant="paragraph"
                className="font-normal transition-colors hover:text-yellow-900 focus:text-yellow-900"
              >
                https://www.uteq.edu.ec/es
              </Typography>
            </li>
          </ul>
          <div className="flex">
            <Image
              src="/img/Home/UTEQ.png"
              alt="card-image"
              width={150}
              height={150}
              className="mx-auto"
            />
            <Image
              src="/img/Home/logo.png"
              alt="card-image"
              width={150}
              height={150}
              className="mx-auto"
            />
          </div>
        </div>
        <hr className="my-8 border-blue-gray-50" />
        <Typography color="white" className="text-center font-normal">
          &copy; {process.env.NEXT_PUBLIC_NOMBREAPP}
        </Typography>
      </footer>
    </div>
  );
}
