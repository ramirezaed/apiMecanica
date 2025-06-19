import Usuario from "./model";
import { Iusuario, UsuarioRol } from "../../types";
import { iUsuarioPayload } from "./types";

class UsuarioDao {
  async crearUsuario(usuario: Iusuario) {
    try {
      const nuevoUsuario = await Usuario.create(usuario);
      return nuevoUsuario;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }

  async editarUsuario(userId: string, user: iUsuarioPayload) {
    try {
      const usuarioEditado = await Usuario.findByIdAndUpdate(userId, user, {
        new: true,
      });
      return usuarioEditado;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }

  async bajaUsuario(userId: string) {
    try {
      const bajaUsuario = await Usuario.findByIdAndUpdate(
        userId,
        { estado: false },
        { new: true }
      );
      return bajaUsuario;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }

  async altaUsuario(userId: string) {
    try {
      const altaUsuario = await Usuario.findByIdAndUpdate(
        userId,
        { estado: true },
        { new: true }
      );
      return altaUsuario;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }

  async buscarPorId(id: string) {
    try {
      //const buscarPorId = await Usuario.findById(id).select("-contraseña"); // no muestra la contraseña
      const buscarPorId = await Usuario.findById(id);
      return buscarPorId;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }

  async buscarPorEmail(email: string) {
    try {
      const buscarPorEmail = await Usuario.findOne({ email });
      return buscarPorEmail;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }

  //paginacion, muestra todos los usuarios
  // async mostrarUsuarios(pagina:string, limite:string){
  async mostrarUsuarios() {
    try {
      // const saltar=(Number(pagina)-1)*Number(limite)
      const usuarios = await Usuario.find();
      // .skip(saltar)
      // .limit(Number(limite))
      return usuarios;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }

  //paginacion usuarios activos
  // async mostrarActivos(pagina:string, limite:string){
  async mostrarActivos() {
    try {
      // const saltar =(Number(pagina)-1)*Number(limite)
      const activos = Usuario.find({ estado: true }).select("-contraseña");
      // .skip(saltar)           //skip metodo de mongoose
      // .limit(Number(limite))  //limit metodo de mongoose
      return activos;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }

  async mostrarInactivos(pagina: string, limite: string) {
    const saltar = (Number(pagina) - 1) * Number(limite);
    try {
      const inactivos = await Usuario.find({ estado: false })
        .skip(saltar) //skip metodo de mongoose
        .limit(Number(limite)); //limit metodo de mongoose
      return inactivos;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }

  async cambiarRol(userId: string, rol_usuario: UsuarioRol) {
    try {
      const cambiarRol = await Usuario.findByIdAndUpdate(
        userId,
        { rol_usuario },
        { new: true }
      );
      return cambiarRol;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }
}

export const usuarioDao = new UsuarioDao();
