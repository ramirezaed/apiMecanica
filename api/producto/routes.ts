import  express, {Response, Request}  from "express";
import { productoController } from "./controller";
import { vendedorRoutes } from "../../middlewares/vendeMiddleware";
import { clientRoutes } from "../../middlewares/clienteMiddleware";

const productoRouter = express.Router()
const {
        crearProducto, editarProducto,buscarPorId, mostrarTodos, mostrarActivos, mostrarInactivos, altaProducto,
        bajaProdcuto, buscarNombre, buscarFiltro
      }= productoController

productoRouter.get("/", buscarFiltro) //si no le paso nada me muestra todos los defectos
// en thunder si quisiera uscar por nombre seria productos?nombre=Escobillas de Parabrisas
productoRouter.post("/crear", vendedorRoutes,crearProducto);
productoRouter.patch("/editar/:id", vendedorRoutes,editarProducto);
//productoRouter.get("/buscar/:id", vendedorRoutes, buscarPorId);
productoRouter.get("/buscar/:id", buscarPorId);
productoRouter.get("/lista", vendedorRoutes, mostrarTodos)
productoRouter.get("/activos",  mostrarActivos)
productoRouter.get("/inactivos",mostrarInactivos)
productoRouter.put("/alta/:id", vendedorRoutes,altaProducto)
productoRouter.put("/baja/:id",vendedorRoutes, bajaProdcuto)
productoRouter.get("/buscarNombre", buscarNombre)

export default productoRouter;