import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Breadcrumbs,
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Chip,
  Tooltip,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  BellIcon,
  ClockIcon,
  CreditCardIcon,
  Bars3Icon,
  UserIcon,
  ArrowsPointingOutIcon,
  ArrowLongLeftIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";
import {
  useMaterialTailwindController,
  setOpenConfigurator,
  setOpenSidenav,
} from "@/context";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { colores_fondo } from "../../Data/colores_fondo";

export function Navbar_app({ user_name, titulo }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const {
    fixedNavbar,
    openSidenav,
    sidenavColor,
    effect_panel,
    sidenavType,
    panelSuperioColor,
    borders,
    contorno_borders,
    border_color,
    tamano_border,
  } = controller;
  const cookies = new Cookies();
  const [image, setimage] = useState("");
  const [nombres, setNombre] = useState("");
  const [nombresS, setNombreS] = useState("");
  const [gmail, setGmail] = useState("");

  useEffect(() => {
    setimage(decodeURIComponent(cookies.get("foto")));
    setNombre(decodeURIComponent(cookies.get("Nombres")));
    setNombreS(decodeURIComponent(cookies.get("Nombres")).substring(0, 15));
    setGmail(decodeURIComponent(cookies.get("email")));
  }, []);
  const layout = "si";
  const page = "no";
  return (
    <Navbar
      color={!fixedNavbar && "transparent"}
      className={` transition-all 
        ${contorno_borders ? "border-2" : "border-none"}
        ${
          fixedNavbar
            ? `sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5 ${
                colores_fondo[panelSuperioColor]
              } ${
                contorno_borders
                  ? `${tamano_border} ${border_color}`
                  : "border-none"
              }`
            : "px-0 py-1"
        } ${borders ? "rounded-xl" : "rounded-none"} 
                
`}
      fullWidth
      blurred={fixedNavbar}
    >
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        <div className="capitalize">
          <Breadcrumbs
            className={`bg-transparent p-0 transition-all ${
              fixedNavbar ? "mt-1" : ""
            }`}
          >
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100"
            >
              {layout}
            </Typography>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {page}
            </Typography>
          </Breadcrumbs>
        </div>
        <div className="flex items-center">
          {/*
          <div className="mr-auto md:mr-4 md:w-56">
            <Input label="Search" />
          </div>
           */}
          <IconButton
            variant="text"
            color="blue-gray"
            className="grid xl:hidden"
            onClick={() => setOpenSidenav(dispatch, !openSidenav)}
          >
            <Bars3Icon strokeWidth={3} className="h-6 w-6 text-blue-gray-500" />
          </IconButton>
          <Button
            variant="text"
            color="blue-gray"
            className="hidden items-center gap-1 px-4 xl:flex normal-case"
          >
            <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
            Sign In
          </Button>
          <IconButton
            variant="text"
            color="blue-gray"
            className="grid xl:hidden"
          >
            <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
          </IconButton>
          <Menu>
            <MenuHandler>
              <IconButton variant="text" color="blue-gray">
                <BellIcon className="h-5 w-5 text-blue-gray-500" />
              </IconButton>
            </MenuHandler>
            <MenuList className="w-max border-0">
              <MenuItem className="flex items-center gap-3">
                <Avatar
                  src="https://demos.creative-tim.com/material-dashboard/assets/img/team-2.jpg"
                  alt="item-1"
                  size="sm"
                  variant="circular"
                />
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-1 font-normal"
                  >
                    <strong>New message</strong> from Laur
                  </Typography>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center gap-1 text-xs font-normal opacity-60"
                  >
                    <ClockIcon className="h-3.5 w-3.5" /> 13 minutes ago
                  </Typography>
                </div>
              </MenuItem>
              <MenuItem className="flex items-center gap-4">
                <Avatar
                  src="https://demos.creative-tim.com/material-dashboard/assets/img/small-logos/logo-spotify.svg"
                  alt="item-1"
                  size="sm"
                  variant="circular"
                />
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-1 font-normal"
                  >
                    <strong>New album</strong> by Travis Scott
                  </Typography>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center gap-1 text-xs font-normal opacity-60"
                  >
                    <ClockIcon className="h-3.5 w-3.5" /> 1 day ago
                  </Typography>
                </div>
              </MenuItem>
              <MenuItem className="flex items-center gap-4">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-tr from-blue-gray-800 to-blue-gray-900">
                  <CreditCardIcon className="h-4 w-4 text-white" />
                </div>
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-1 font-normal"
                  >
                    Payment successfully completed
                  </Typography>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center gap-1 text-xs font-normal opacity-60"
                  >
                    <ClockIcon className="h-3.5 w-3.5" /> 2 days ago
                  </Typography>
                </div>
              </MenuItem>
            </MenuList>
          </Menu>
          <IconButton
            variant="text"
            color="blue-gray"
            onClick={() => setOpenConfigurator(dispatch, true)}
          >
            <Cog6ToothIcon className="h-5 w-5 text-blue-gray-500" />
          </IconButton>
        </div>
      </div>
    </Navbar>
  );
}
Navbar_app.displayName = "/src/widgets/layout/dashboard-navbar.jsx";
export default Navbar_app;
