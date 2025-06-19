import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { config } from "dotenv";
config();

export function checkRoles(rolesPermitidos: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

    if (!token) {
      return res.status(401).json({ error: "Token no proporcionado" });
    }

    try {
      const verificar = verify(token, process.env.TOKEN_SECRET!) as {
        rol_usuario: string;
        estado: boolean;
      };

      if (!verificar || !verificar.estado) {
        return res.status(401).json({ error: "Token inválido o usuario inactivo" });
      }

      if (!rolesPermitidos.includes(verificar.rol_usuario)) {
        return res.status(403).json({ error: "No tenés permisos para acceder" });
      }

      // Si pasa todas las validaciones
      next();
    } catch (error) {
      return res.status(400).json({ error: "Token inválido" });
    }
  };
}
