import { useState } from "react";
import { Dialog_app } from "@/components/Elements";
import {
  Card,
  Typography,
  Input,
  Checkbox,
  Button,
  Select,
  Option,
  CardFooter,
} from "@material-tailwind/react";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { format } from "date-fns";

const TABLE_HEAD = ["Campo", "Valor", "Activar"];

export function Buscar_Accion({
  closeBuscador,
  Titulo,
  RealizarBusqueda,
  ID_CAT,
}) {
  // lista de las weas
  const [Filtros, setFiltros] = useState([
    {
      id: 0,
      PlaceHolder: "Accion",
      Clave: "Accion",
      Estado: false,
      Valor: "",
      Tipo: "Texto",
      V_check: true,
    },
    {
      id: 1,
      PlaceHolder: "Descripcion",
      Clave: "Descripcion",
      Estado: false,
      Valor: "",
      Tipo: "Texto",
      V_check: true,
    },
    {
      //y-MM-dd
      id: 2,
      PlaceHolder: "Fecha Creacion",
      Clave: "Fecha_Creacion",
      Estado: false,
      Fecha: new Date(),
      Valor: format(new Date(), "yyyy-MM-dd"),
      Tipo: "Fecha",
      V_check: true,
    },
    {
      id: 3,
      PlaceHolder: "Fecha Modificacion",
      Clave: "Fecha_Modificacion",
      Estado: false,
      Fecha: new Date(),
      Valor: format(new Date(), "yyyy-MM-dd"),
      Tipo: "Fecha",
      V_check: true,
    },
    {
      id: 4,
      PlaceHolder: "Activo",
      Clave: "Activo",
      Estado: true,
      Valor: true,
      Tipo: "Selector",
      Selector: {
        Habilitado: true,
        Deshabilitado: false,
      },
      V_check: false,
    },
  ]);
  // Función para actualizar una propiedad de un objeto en Filtros por su índice
  const actualizarEstado = (indice, nuevoValor, propiedad) => {
    setFiltros((prevFiltros) => {
      const nuevosFiltros = [...prevFiltros]; // Copia superficial del array Filtros
      nuevosFiltros[indice] = {
        ...nuevosFiltros[indice], // Copia superficial del objeto a actualizar
        [propiedad]: nuevoValor,
      };
      return nuevosFiltros;
    });
  };
  const actualizarFECHAVALOR = (indice, nuevoValor) => {
    const fechaFormat = format(nuevoValor, "yyyy-MM-dd");
    actualizarEstado(indice, fechaFormat, "Valor");
  };
  //Aceptar criterios de busqueda skere modo diablo
  const AceptarCriteriosBusqueda = () => {
    // alert("Enviando busqueda");
    const datosExtraidos = Filtros.reduce((acc, { Clave, Valor, Estado }) => {
      if (Estado) {
        acc[Clave.toLowerCase()] = Valor;
      }
      return acc;
    }, {});
    const datosConCategoria = {
      ...datosExtraidos,
      id_categoria: parseInt(ID_CAT),
    };
    //console.log(datosConCategoria);
    //alert("Ver Consola");
    //retornar el JSON CON LOS FILTROS DE BUSQUEDA
    RealizarBusqueda(datosConCategoria);
  };
  return (
    <>
      <Dialog_app open={true} close={closeBuscador} title={Titulo} size="lg">
        <Card className="h-96 w-full overflow-y-scroll">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Filtros.map(
                (
                  {
                    id,
                    Clave,
                    Estado,
                    Valor,
                    Selector,
                    Tipo,
                    Fecha,
                    PlaceHolder,
                    V_check,
                  },
                  index
                ) => (
                  <tr key={id} className="even:bg-blue-gray-50/50">
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {PlaceHolder}
                      </Typography>
                    </td>
                    <td className="p-4">
                      {/* Aqui ir cambiando si es de tipo texto, si es de tipo fecha o si es de tipo select skere modo diablo */}
                      {Tipo === "Texto" ? (
                        <Input
                          variant="outlined"
                          label={Clave}
                          placeholder=""
                          value={Valor}
                          disabled={!Estado}
                          onChange={(event) =>
                            actualizarEstado(index, event.target.value, "Valor")
                          }
                        />
                      ) : Tipo === "Fecha" ? (
                        <DateTimePicker
                          className="w-auto cursor-pointer z-50"
                          onChange={(value) => (
                            actualizarEstado(index, value, "Fecha"),
                            actualizarFECHAVALOR(index, value)
                          )}
                          value={Fecha}
                          disableClock
                          disableCalendar
                          format="y-MM-dd"
                          disabled={!Estado}
                        />
                      ) : (
                        <Select label="Seleccionar Estado" disabled={!Estado}>
                          {Object.entries(Selector).map(([key, value]) => (
                            <Option
                              key={key}
                              value={value}
                              onClick={(event) =>
                                actualizarEstado(index, value, "Valor")
                              }
                            >
                              {key}
                            </Option>
                          ))}
                        </Select>
                      )}
                    </td>
                    <td className="p-4">
                      {V_check && (
                        <Checkbox
                          checked={Estado}
                          onChange={(event) =>
                            actualizarEstado(
                              index,
                              event.target.checked,
                              "Estado"
                            )
                          }
                        />
                      )}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
          <CardFooter style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={AceptarCriteriosBusqueda}>Buscar</Button>
          </CardFooter>
        </Card>
      </Dialog_app>
    </>
  );
}

export default Buscar_Accion;
