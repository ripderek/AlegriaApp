import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  Button,
  IconButton,
  Switch,
  Typography,
  Chip,
  Slider,
  Stepper,
  Step,
} from "@material-tailwind/react";
import {
  useMaterialTailwindController,
  setOpenConfigurator,
  setSidenavColor,
  setSidenavType,
  setFixedNavbar,
  setEffectPanel,
  setColorPanelSuperior,
  setBorders,
  setShadows,
  setIconAPP,
  setContornBorders,
  setColorBorder,
  setTamanoBorde,
  setTamanoSombra,
  setTColorsombra,
} from "@/context";
import { useState, useEffect } from "react";
//import {sidenavColors} from "../../Data/sidenavColors"
export function Configurator() {
  const [controller, dispatch] = useMaterialTailwindController();
  const {
    openConfigurator,
    sidenavColor,
    sidenavType,
    fixedNavbar,
    effect_panel,
    panelSuperioColor,
    borders,
    shadows,
    iconApp,
    contorno_borders,
    border_color,
    tamano_border,
    tamano_sombras,
    color_sombras,
  } = controller;
  const sidenavColors = {
    white: "from-gray-100 to-gray-100 border-gray-200",
    dark: "from-black to-black border-gray-200",
    green: "from-lime-600 to-lime-600",
    orange: "from-orange-400 to-orange-600",
    red: "from-red-400 to-red-600",
    pink: "from-pink-400 to-pink-600",
    purple: "from-purple-500 to-purple-500",
  };
  const colores_fondo = {
    dark: "bg-gray-900",
    white: "bg-white",
    green: "bg-lime-600",
    orange: "bg-orange-400",
    red: "bg-red-400 ",
    pink: "bg-pink-400 ",
    purple: "bg-purple-500 ",
  };
  const colores_bordes = {
    dark: "border-black",
    white: "border-white",
    green: "border-green-700",
    orange: "border-orange-700 ",
    red: "border-red-700  ",
    pink: "border-pink-700 ",
    purple: "border-purple-700  ",
  };
  //tipos de sombras
  const sombras = {
    1: "shadow-sm",
    2: "shadow-md",
    3: "shadow-lg",
    4: "shadow-xl",
    5: "shadow-2xl",
  };
  const colores_sombras = {
    dark: "shadow-black",
    white: "shadow-white",
    green: "shadow-green-700",
    orange: "shadow-orange-700 ",
    red: "shadow-red-700  ",
    pink: "shadow-pink-700 ",
    purple: "shadow-purple-700  ",
  };
  const [value, setValue] = useState(1);
  const handleChange = (event) => {
    setValue(event.target.value);
    const indice = event.target.value;
    setTamanoSombra(dispatch, sombras[indice]);
  };
  return (
    <aside
      className={`fixed top-0 right-0 z-50 h-screen w-96 overflow-y-scroll bg-white px-2.5 shadow-lg transition-transform duration-300 ${
        openConfigurator ? "translate-x-0 " : "translate-x-96"
      }`}
    >
      <div className="flex  items-start justify-between px-6 pt-8 pb-6 ">
        <div>
          <Typography variant="h5" color="blue-gray">
            Configuracion de interfaz
          </Typography>
          <Typography className="font-normal text-blue-gray-600">
            Vea las opciones de la interfaz
          </Typography>
        </div>
        <IconButton
          variant="text"
          color="blue-gray"
          onClick={() => setOpenConfigurator(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5" />
        </IconButton>
      </div>
      <div className="py-4 px-6">
        <div className="mb-2">
          <Typography variant="h6" color="blue-gray">
            Color de Selector
          </Typography>
          <div className="mt-3 flex items-center gap-2">
            {Object.keys(sidenavColors).map((color) => (
              <span
                key={color}
                className={`h-6 w-6 cursor-pointer rounded-full border bg-gradient-to-br transition-transform hover:scale-105 ${
                  sidenavColors[color]
                } ${
                  sidenavColor === color ? "border-black" : "border-transparent"
                }`}
                onClick={() => setSidenavColor(dispatch, color)}
              />
            ))}
          </div>
        </div>
        <div className="mb-2">
          <Typography variant="h6" color="blue-gray">
            Color del Menu lateral
          </Typography>
          <div className="mt-3 flex items-center gap-2">
            {Object.keys(colores_fondo).map((color) => (
              <span
                key={color}
                className={`h-6 w-6 cursor-pointer rounded-full border bg-gradient-to-br transition-transform hover:scale-105 ${
                  colores_fondo[color]
                } ${
                  sidenavType === color ? "border-black" : "border-transparent"
                }`}
                onClick={() => setSidenavType(dispatch, color)}
              />
            ))}
          </div>
        </div>
        <div className="mb-2">
          <Typography variant="h6" color="blue-gray">
            Color de la barra superior
          </Typography>
          <div className="mt-3 flex items-center gap-2">
            {Object.keys(colores_fondo).map((color) => (
              <span
                key={color}
                className={`h-6 w-6 cursor-pointer rounded-full border bg-gradient-to-br transition-transform hover:scale-105 ${
                  colores_fondo[color]
                } ${
                  panelSuperioColor === color
                    ? "border-black"
                    : "border-transparent"
                }`}
                onClick={() => setColorPanelSuperior(dispatch, color)}
              />
            ))}
          </div>
        </div>
        <div className="mb-2">
          <Typography variant="h6" color="blue-gray">
            Color de los borders
          </Typography>
          <div className="mt-3 flex items-center gap-2">
            {Object.keys(colores_fondo).map((color) => (
              <span
                key={color}
                className={`h-6 w-6 cursor-pointer rounded-full border bg-gradient-to-br transition-transform hover:scale-105 ${
                  colores_fondo[color]
                } ${
                  border_color === colores_bordes[color]
                    ? "border-black"
                    : "border-transparent"
                }`}
                onClick={() => setColorBorder(dispatch, colores_bordes[color])}
              />
            ))}
          </div>
        </div>
        <div className="mb-2">
          <Typography variant="h6" color="blue-gray">
            Color de las sombras
          </Typography>
          <div className="mt-3 flex items-center gap-2">
            {Object.keys(colores_fondo).map((color) => (
              <span
                key={color}
                className={`h-6 w-6 cursor-pointer rounded-full border bg-gradient-to-br transition-transform hover:scale-105 ${
                  colores_fondo[color]
                } ${
                  color_sombras === colores_sombras[color]
                    ? "border-black"
                    : "border-transparent"
                }`}
                onClick={() =>
                  setTColorsombra(dispatch, colores_sombras[color])
                }
              />
            ))}
          </div>
        </div>
        <div className="mb-2">
          <hr />
          <div className="flex items-center justify-between py-5">
            <Typography variant="h6" color="blue-gray">
              Barra superior fija
            </Typography>
            <Switch
              id="navbar-fixed"
              value={fixedNavbar}
              onChange={() => setFixedNavbar(dispatch, !fixedNavbar)}
            />
          </div>
          <hr />
        </div>
        <div className="mb-2">
          <hr />
          <div className="flex items-center justify-between py-5">
            <Typography variant="h6" color="blue-gray">
              Borders redondos
            </Typography>
            <Switch
              id="borders-layouts"
              value={!borders}
              onChange={() => setBorders(dispatch, !borders)}
            />
          </div>
          <hr />
        </div>
        <div className="mb-2">
          <hr />
          <div className="flex items-center justify-between py-5">
            <Typography variant="h6" color="blue-gray">
              Sombras
            </Typography>
            <Switch
              id="shadows-layouts"
              value={!shadows}
              onChange={() => setShadows(dispatch, !shadows)}
            />
          </div>
          <hr />
        </div>
        <div className="mb-2">
          <hr />
          <div className="flex items-center justify-between py-5">
            <Typography variant="h6" color="blue-gray">
              Mostrar icono de la App
            </Typography>
            <Switch
              id="icon-layout"
              value={iconApp}
              onChange={() => setIconAPP(dispatch, !iconApp)}
            />
          </div>
          <hr />
        </div>
        <div className="mb-2">
          <hr />
          <div className="flex items-center justify-between py-5">
            <Typography variant="h6" color="blue-gray">
              Activar contornos
            </Typography>
            <Switch
              id="contornos-layout"
              value={contorno_borders}
              onChange={() => setContornBorders(dispatch, !contorno_borders)}
            />
          </div>
          <hr />
        </div>
        <div className="mb-2">
          <hr />
          <div className="flex items-center justify-between py-5">
            <Typography variant="h6" color="blue-gray">
              Tamano del contorno
            </Typography>
            <Stepper>
              <Step
                key={1}
                onClick={() => setTamanoBorde(dispatch, "border-2")}
                className={`cursor-pointer ${
                  tamano_border === "border-2"
                    ? "border-8 border-red-900"
                    : "border-none"
                }`}
              >
                2x
              </Step>
              <Step
                key={2}
                onClick={() => setTamanoBorde(dispatch, "border-4")}
                className={`cursor-pointer ${
                  tamano_border === "border-4"
                    ? "border-8 border-red-900"
                    : "border-none"
                }`}
              >
                4x
              </Step>
              <Step
                key={3}
                onClick={() => setTamanoBorde(dispatch, "border-8")}
                className={`cursor-pointer ${
                  tamano_border === "border-8"
                    ? "border-8 border-red-900"
                    : "border-none"
                }`}
              >
                8x
              </Step>
            </Stepper>
          </div>
          <hr />
        </div>
        {/* 
        <div className="mb-2">
          <hr />
          <div className="flex items-center justify-between py-5">
            <Typography variant="h6" color="blue-gray">
              Tamano sombras
            </Typography>
            <div className="w-96">
              <Slider
                defaultValue={value}
                //value={value}
                min={1}
                max={5}
                step={1}
                onChange={handleChange}
              />
            </div>
          </div>
          <hr />
        </div>
        */}
        <div className="text-center">
          {/*
          <Typography variant="h6" color="blue-gray">
            Extintor Team
          </Typography>
           */}
          <div className="flex justify-center gap-2">
            <div className="p-2">
              <img
                className=" w-auto rounded-full"
                src="/img/Home/Extintor_logo.png"
                alt="User image"
              />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

Configurator.displayName = "/src/widgets/layout/configurator.jsx";
//Navbar_app.displayName = "/src/widgets/layout/dashboard-navbar.jsx";

export default Configurator;
