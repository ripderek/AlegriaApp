import jwt from "jsonwebtoken";

export default function handler(req, res) {
  if (req.method === "POST") {
    const { username, role } = req.body;
    console.log("Datos del body" + req.body);
    const payload = {
      username: username,
      role: role,
    };
    // Firma el token con una clave secreta (debería estar en un entorno seguro)
    const token = jwt.sign(payload, "secret", {
      expiresIn: "1h", // El token expira en 1 hora, por ejemplo
    });

    // Devuelve el JWT al cliente
    res.status(200).json({ token });
  } else {
    res.status(405).json({ message: "Método no permitido" });
  }
}
