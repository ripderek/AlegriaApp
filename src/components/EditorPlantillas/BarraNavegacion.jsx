import React from "react";
//imports del sidenav del otro proyecto
import {
  Avatar,
  Button,
  IconButton,
  Typography,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Tooltip,
} from "@material-tailwind/react";

import { routes } from "../../Data/ListaPlantillas";
export function BarraNavegacion({ cambiarPestañas }) {
  return (
    //el aside puede tener w-52 o w-72 para que se haga mas grande
    //pero hay que colocar un boton para que haga pequeno el aside y solo se vea los iconos
    <aside
      className={`
         fixed border-r border-blue-gray-100    
             `}
    >
      <div className="">
        {routes.map(({ layout, title, pages }, key) => (
          <ul key={key} className="mb-4 flex flex-col gap-2 p-5">
            {title && (
              <li className="">
                <Typography color="black" className="  font-bold capitalize">
                  {title}
                </Typography>
              </li>
            )}
            {pages.map(({ name, path, codigo }) => (
              <li key={name}>
                <Typography
                  color="black"
                  className="font-medium capitalize cursor-pointer hover:text-blue-900 opacity-75"
                  onClick={() => cambiarPestañas(codigo)}
                >
                  {name}
                </Typography>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </aside>
  );
}

export default BarraNavegacion;
