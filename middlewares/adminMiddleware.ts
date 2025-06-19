 import { Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { config } from "dotenv";
config();

export function adminRoutes(req: Request, res: Response, next: Function) {

    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
    
  if (!token) {
    return res.status(401).json("Acceso denegado1");
  }
  try {
    
    const verificar = verify(token, process.env.TOKEN_SECRET !) as { rol_usuario: string, estado:boolean };
    if (!verificar) {
        return res.status(401).json("Acceso denegado");
    }
    const isAdmin = (verificar.rol_usuario ==="admin" && verificar.estado);
    if (!isAdmin){
        return res.status(401).json("Acceso denegado");
      }
    if (isAdmin) {
        next();
    }
  } catch (error) {
    res.status(400).json("token invalido");
  }
}
