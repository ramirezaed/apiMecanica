import { Request, Response } from "express";
import { usuarioServicio } from "./service";

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
  // refrescarToken,
  //EL DE ABAJO TRAIGO PARA EL CONTROLADOR DE GOOGLE
} = usuarioServicio;

class UsuarioController {
  async crearUsuario(req: Request, res: Response) {
    try {
      const DatosUsuario = req.body;
      const usuarioCreado = await crearUsuario(DatosUsuario);
      return res.status(201).json(usuarioCreado);
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  }

  async editarUsuario(req: Request, res: Response) {
    const userId = req.params.id;
    const usuario = req.body;
    try {
      const usuarioEditado = await editarUsuario(userId, usuario);
      return res.status(200).json(usuarioEditado);
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  }

  async bajaUsuario(req: Request, res: Response) {
    try {
      const userid = req.params.id;
      const baja = await bajaUsuario(userid);
      return res.status(200).json(baja);
    } catch (error) {
      return res.status(400).json({ message: (error as Error).message });
    }
  }

  async altaUsuario(req: Request, res: Response) {
    try {
      const userId = req.params.id;
      const alta = await altaUsuario(userId);
      return res.status(200).json(alta);
    } catch (error) {
      // Error ((error as Error).message)
      return res.status(400).json({ message: (error as Error).message });
    }
  }

  async mostrarUsuarios(req: Request, res: Response) {
    try {
      const usuarios = await mostrarUsuarios();
      return res.status(200).json(usuarios);
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  }

  async mostrarActivos(req: Request, res: Response) {
    try {
      const activos = await mostrarActivos();
      return res.status(200).json(activos);
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  }

  async mostrarInactivos(req: Request, res: Response) {
    try {
      const inactivos = await mostrarInactivos();
      return res.status(200).json(inactivos);
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  }

  async buscarPorId(req: Request, res: Response) {
    try {
      const userId = req.params.id;
      const buscado = await buscarPorId(userId);
      return res.status(200).json(buscado);
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  }
  async buscarPorEmail(req: Request, res: Response) {
    const email = req.params.email; //req.query.email as string;
    try {
      const user = await buscarPorEmail(email);
      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  }

  //esto tengo agregar otro que volver a agregar pero cambiando desde el dao
  //porq uso con params id para el login
  // async buscarPorEmail (req:Request , res:Response){
  //     const {email} = req.body //req.query.email as string;
  //     try {
  //         const user = await buscarPorEmail(email);
  //         return res.status(200).json(user);
  //       } catch (error) {
  //         return res.status(400).json({ error: (error as Error).message });
  //       }

  // }

  async cambiarRol(req: Request, res: Response) {
    const userId = req.params.id;
    const { rol_usuario } = req.body;
    try {
      const rolCambiado = await cambiarRol(userId, rol_usuario);
      return res.status(200).json(rolCambiado);
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, contraseña } = req.body;
      const { token, userPayload } = await login({
        email,
        contraseña,
      });

      res.setHeader("token", token);
      res.status(200).json({
        ...userPayload,
        token,
      });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async verificarRecaptcha(req: Request, res: Response) {
    try {
      const { tokenC } = req.body;
      const resultado = await verificarRecaptcha(tokenC);
      return res.status(200).json(resultado);
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  }
}

export const usuarioController = new UsuarioController();
