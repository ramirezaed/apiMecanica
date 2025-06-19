import { carritoController } from "./controller";
import express from "express"
import { carritoServicio } from "./service";
import { vendedorRoutes } from "../../middlewares/vendeMiddleware";
import { clientRoutes } from "../../middlewares/clienteMiddleware";
import { checkRoles } from "../../utils/checkRol";


const {agregarCarrito,actualizarCarrito,buscarID,MostrarTodos, eliminarCarrito, buscarPorFecha}=carritoController

const carritoRouter = express.Router()

carritoRouter.get("/buscarID/:id", vendedorRoutes,buscarID)
carritoRouter.get("/todos",vendedorRoutes ,MostrarTodos)
carritoRouter.post("/agregar", clientRoutes,agregarCarrito)
carritoRouter.delete("/eliminar", clientRoutes,eliminarCarrito)
carritoRouter.patch("actualizar/:id", vendedorRoutes, actualizarCarrito)
carritoRouter.get("buscarPorFecha", checkRoles, buscarPorFecha)
//EN LUGAR DE USAR EL check roles que cree, puedo hacer un arreglo con los middleware
// [vendedorRoutes, clienteRoutes]

export default carritoRouter


