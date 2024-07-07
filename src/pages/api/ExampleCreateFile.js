// pages/api/createFile.js
import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method === "POST") {
    //nombre del archivo, ruta para guardalo, ruta de la plantilla a utilizar
    const { fileName, ruta_archivo, ruta_plantilla, Titulo, Subtitulo } =
      req.body;

    // Ruta del archivo de plantilla
    /*
    const templatePath = path.join(
      process.cwd(),
      "src",
      "Data",
      "Plantilla_1.js"
    );
    */
    const templatePath = path.join(process.cwd(), ruta_plantilla);
    // Leer el archivo de plantilla como texto
    fs.readFile(templatePath, "utf8", (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error al leer la plantilla" });
      }
      // Extraer el contenido de la plantilla
      const start = data.indexOf("Code: `") + 7;
      const end = data.lastIndexOf("`");
      let templateContent = data.substring(start, end);

      // Insertar contenido dinámico en la plantilla
      templateContent = templateContent.replace("${Titulo}", Titulo);
      templateContent = templateContent.replace("${SubTitulo}", Subtitulo);
      templateContent = templateContent.replace(
        "${FuncionesGetPost}",
        "//aqui va la funcion"
      );

      // Ruta donde se guardará el archivo
      /*
      const directoryPath = path.join(
        process.cwd(),
        "src",
        "pages",
        "dashboard"
      );*/
      const directoryPath = path.join(process.cwd(), ruta_archivo);
      const filePath = path.join(directoryPath, `${fileName}.js`);

      // Verificar si la carpeta 'dashboard' existe, si no, crearla
      if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, { recursive: true });
      }

      // Escribir el archivo
      fs.writeFile(filePath, templateContent, (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "Error al crear el archivo" });
        }

        res.status(200).json({ message: "Archivo creado exitosamente" });
      });
    });
  } else {
    res.status(405).json({ message: "Método no permitido" });
  }
}
