import express from "express";
import { usuarioController } from "./controller";
import { adminRoutes } from "../../middlewares/adminMiddleware";
import { clientRoutes } from "../../middlewares/clienteMiddleware";
import { loginLimite } from "../../utils/IntentosLogin";
import { checkRoles } from "../../utils/checkRol";
import { vendedorRoutes } from "../../middlewares/vendeMiddleware";

const userRouter = express.Router();

const {
  crearUsuario,
  editarUsuario,
  bajaUsuario,
  altaUsuario,
  buscarPorId,
  buscarPorEmail,
  mostrarActivos,
  mostrarInactivos,
  cambiarRol,
  login,
  mostrarUsuarios,
  verificarRecaptcha,
  // refreshToken,
} = usuarioController;

userRouter.post("/crear", crearUsuario);
userRouter.patch(
  "/editar/:id",
  checkRoles(["comprador", "vendedor", "admin"]),
  editarUsuario
);
userRouter.patch("/baja/:id", adminRoutes, bajaUsuario);
userRouter.patch("/alta/:id", adminRoutes, altaUsuario);
//userRouter.get("/buscar/:id", adminRoutes,buscarPorId)
userRouter.get("/buscar/:id", buscarPorId);
//userRouter.get("/buscarEmail",adminRoutes, buscarPorEmail)
userRouter.get("/buscarEmail/:email", buscarPorEmail);
userRouter.get("/activos", adminRoutes, mostrarActivos);
userRouter.get("/inactivos", adminRoutes, mostrarInactivos);
userRouter.patch("/cambiarRol/:id", adminRoutes, cambiarRol);

userRouter.get("/listaDeUsuario", adminRoutes, mostrarUsuarios);

userRouter.post("/login", login);
userRouter.post("/recaptcha", verificarRecaptcha);
export default userRouter;
