import express from "express";
import { turnoController } from "./controller";
import { vendedorRoutes } from "../../middlewares/vendeMiddleware";
import { adminRoutes } from "../../middlewares/adminMiddleware";

const turnoRouter = express.Router();

const {
  crearTurno,
  buscarPorCodigo,
  mostrarTodos,
  buscarporFecha,
  cancelarTurno,
  buscarPorId,
  obtenerturno,
  buscarUsuarioTurno,
  cambiarEstado,
  editarTurno,
  eliminarTodos,
} = turnoController;

turnoRouter.post("/nuevo", crearTurno);
turnoRouter.get("/buscarCodigo", vendedorRoutes, buscarPorCodigo);
turnoRouter.get("/lista", vendedorRoutes, mostrarTodos);
// turnoRouter.get("/lista", mostrarTodos);
turnoRouter.put("/editar/:id", vendedorRoutes, editarTurno);
turnoRouter.get("/buscarFecha", vendedorRoutes, buscarporFecha);
turnoRouter.post("/cancelar", cancelarTurno);
turnoRouter.get("/buscar/:id", buscarPorId);
turnoRouter.get("/buscarUsuarioTurno/:id", buscarUsuarioTurno);
turnoRouter.get("/turser", obtenerturno);
turnoRouter.put("/cambiarEstado/:id", vendedorRoutes, cambiarEstado);
turnoRouter.delete("/eliminar", eliminarTodos);
export default turnoRouter;
