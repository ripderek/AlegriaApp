//Este es un nuevo archivo que no se habia usado en el proyecto anterior sirve como un rotueador parecedio a nodejs

import {
  RectangleStackIcon,
  RectangleGroupIcon,
  CursorArrowRippleIcon,
} from "@heroicons/react/24/solid";
import { useMaterialTailwindController } from "@/context";

const icon = {
  className: "w-5 h-5 text-inherit",
};
import { useEffect, useState } from "react";

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        //icon: <ChartBarSquareIcon {...icon} />,
        //Modificado para aceptar el clasname de donde se renderiza
        icon: (className) => <RectangleStackIcon className={className} />,
        name: "Categorias",
        path: "/Categorias",
        //element: <Home />,
      },

      {
        //icon: <ChartBarSquareIcon {...icon} />,
        //Modificado para aceptar el clasname de donde se renderiza
        icon: (className) => <RectangleGroupIcon className={className} />,
        name: "Modelos",
        path: "/Modelos",
        //element: <Home />,
      },
      /*
      {
        //icon: <ChartBarSquareIcon {...icon} />,
        //Modificado para aceptar el clasname de donde se renderiza
        icon: (className) => <CursorArrowRippleIcon className={className} />,
        name: "Acciones",
        path: "/Acciones",
        //element: <Home />,
      },
      */
    ],
  },
  /*
    {
        title: "Opciones Usuario",
        layout: "auth",
        pages: [
            {
                icon: <InformationCircleIcon {...icon} />,
                name: "Mis datos",
                path: "/notifications",
                //element: <Notifications />,
            },
            {
                icon: <InformationCircleIcon {...icon} />,
                name: "Mis reportes",
                path: "/notifications",
                //element: <Notifications />,
            },
        ],
    },
    {
        title: "Opciones de Super Usuario",
        layout: "superuser",
        pages: [
            {
                icon: <InformationCircleIcon {...icon} />,
                name: "Usuarios",
                path: "/notifications",
                //element: <Notifications />,
            },
            {
                icon: <InformationCircleIcon {...icon} />,
                name: "Formularios",
                path: "/notifications",
                //element: <Notifications />,
            },
        ],
    },
    */
];

export default routes;
