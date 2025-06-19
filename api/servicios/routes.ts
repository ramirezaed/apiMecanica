import { servicioController } from "./controller";
import express from "express";
import { vendedorRoutes } from "../../middlewares/vendeMiddleware";

const {
  crearServicio,
  buscarPorId,
  bajaServicio,
  buscarNombre,
  altaServicio,
  editarServicio,
  mostrarTodos,
  Activos,
  Inactivos,
} = servicioController;

const servicioRouter = express.Router();

servicioRouter.post("/crear", vendedorRoutes, crearServicio);
servicioRouter.get("/buscar/:id", vendedorRoutes, buscarPorId);
servicioRouter.get("/buscarNombre", vendedorRoutes, buscarNombre);
servicioRouter.put("/editar/:id", vendedorRoutes, editarServicio);
servicioRouter.put("/baja/:id", vendedorRoutes, bajaServicio);
servicioRouter.put("/alta/:id", vendedorRoutes, altaServicio);
servicioRouter.get("/lista", mostrarTodos);
servicioRouter.get("/activos", Activos);
servicioRouter.get("/inactivos", vendedorRoutes, Inactivos);

export default servicioRouter;
