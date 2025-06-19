import { config } from "dotenv";
import { verify, sign } from "jsonwebtoken";
import { compare } from "bcrypt";
import { usuarioDao } from "./dao";
import { Iusuario, UsuarioRol } from "../../types";
import Usuario from "./model";
import { iUsuarioPayload } from "./types";
import bcrypt from "bcrypt";

config();

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
  mostrarUsuarios,
} = usuarioDao;

class UsuarioServicio {
  async crearUsuario(user: Iusuario) {
    try {
      const email = user.email;
      const verificarCorreo = await Usuario.findOne({ email });
      if (verificarCorreo) {
        throw new Error(
          "Ya se encuentra registrado un usuario con esa dirreccin de correo electronico"
        );
      }
      const hoy = new Date();
      const fechaMinima = new Date(
        hoy.getFullYear() - 18,
        hoy.getMonth(),
        hoy.getDate()
      );

      const fechaNacimiento = new Date(user.fecha_nacimiento);

      if (fechaNacimiento > fechaMinima) {
        throw new Error("El usuario debe ser mayor de 18 años");
      }

      const nuevoUsuario = await crearUsuario(user);
      return nuevoUsuario;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }

  async editarUsuario(userId: string, usuario: iUsuarioPayload) {
    try {
      if (!userId) {
        throw new Error("Usuario no encontrado");
      }

      const {
        nombre,
        apellido,
        fecha_nacimiento,
        email,
        contraseña,
        telefono,
        direccion,
      } = usuario;

      const dbPayLoad: Partial<iUsuarioPayload> = {
        ...(nombre ? { nombre } : {}),
        ...(apellido ? { apellido } : {}),
        ...(fecha_nacimiento ? { fecha_nacimiento } : {}),
        ...(email ? { email } : {}),
        ...(telefono ? { telefono } : {}),
        ...(direccion ? { direccion } : {}),
      };

      // Si hay contraseña, la hasheamos
      if (contraseña) {
        const hashPassword = await bcrypt.hash(contraseña, 10);
        dbPayLoad.contraseña = hashPassword;
      }

      // Editamos el usuario y devolvemos el documento actualizado
      const usuarioEditado = await Usuario.findByIdAndUpdate(
        userId,
        dbPayLoad,
        { new: true } // para que devuelva el documento actualizado
      );

      if (!usuarioEditado) {
        throw new Error("Usuario no encontrado o no se pudo editar");
      }

      return usuarioEditado;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async bajaUsuario(userId: string) {
    try {
      const usuarioBuscado = await bajaUsuario(userId);

      if (!usuarioBuscado) {
        throw new Error("usuario no encontrado");
      }
      if (usuarioBuscado.estado === false) {
        throw new Error("el usuario ya se encuenta inactivo");
      }
      const bajaUser = await bajaUsuario(userId);
      return bajaUser;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }

  async altaUsuario(userId: string) {
    try {
      const usuarioBuscado = await altaUsuario(userId);
      if (!usuarioBuscado) {
        throw new Error("el usuario ya se encuentra activo");
      }
      if (usuarioBuscado.estado === true) {
        throw new Error("usuario ya se encuentra activo");
      }
      const altaUser = await altaUsuario(userId);
      return altaUser;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }

  // async mostrarTodos (){
  //     try {
  //         const mostrar =await mostrarTodos()
  //         if (!mostrar || mostrar.length === 0){
  //             throw new Error ("no hay usuarios registrados")
  //         }
  //         return mostrar
  //     } catch (error) {
  //         throw Error ((error as Error).message)
  //     }
  // }

  async buscarPorId(id: string) {
    try {
      const usuario = id;
      if (!usuario || usuario.length === 0) {
        throw new Error("no se encontro ningun usuario");
      }
      const buscado = await buscarPorId(id);
      return buscado;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }

  async mostrarUsuarios() {
    try {
      const usuarios = await mostrarUsuarios();
      if (!usuarios || usuarios.length === 0) {
        throw new Error("no hay usuarios");
      }
      return usuarios;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }
  async buscarPorEmail(email: string) {
    //el metodo findone devuelve null si no encuentra,
    try {
      const buscado = await buscarPorEmail(email);
      if (!buscado) {
        throw new Error("usuario no encontrado");
        //aca busca en el dao el email, si no encuentra me devuelve el eror
      }
      return buscado;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }
  async mostrarActivos(pagina = "1", limite = "1000") {
    try {
      // const activos = await mostrarActivos(pagina, limite)
      const activos = await mostrarActivos();
      // if (!activos || activos.length === 0){
      if (!activos) {
        throw new Error("no hay usuario activos");
      }
      return activos;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }
  async mostrarInactivos(pagina = "1", limite = "10") {
    try {
      const inactivos = await mostrarInactivos(pagina, limite);
      if (!inactivos || inactivos.length === 0) {
        throw new Error("no hay usuarios inactivos");
      }
      return inactivos;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }
  async cambiarRol(userId: string, rol: UsuarioRol) {
    try {
      //  const // verificar = Usuario.findById(userId)
      if (!userId) {
        throw new Error("usuario no encontrado");
      }
      if (!rol) {
        throw new Error("error al cargar el rol");
      }
      const actualizarRol = await cambiarRol(userId, rol);
      if (!actualizarRol) {
        throw new Error("error aca al modificar rol del usuario");
      }
      return actualizarRol;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }

  async login(usuario: { email: string; contraseña: string }) {
    try {
      const { email, contraseña } = usuario;
      const verificarCorreo = await buscarPorEmail(email);
      if (!verificarCorreo) {
        throw new Error("correo  incorrecta");
      }
      const verficarContraseña = await compare(
        contraseña,
        verificarCorreo.contraseña
      );
      if (!verficarContraseña) {
        throw new Error("contraseña o correo incorrectos");
      }
      if (verificarCorreo.estado === false) {
        throw new Error("usuario inactivo");
      }

      const userPayload = {
        //esto es lo que me devuelve cuado inicio sesion
        _id: verificarCorreo._id,
        nombre: verificarCorreo.nombre,
        apellido: verificarCorreo.apellido,
        email: verificarCorreo.email,
        rol_usuario: verificarCorreo.rol_usuario,
        estado: verificarCorreo.estado,
      };
      const token = sign(userPayload, process.env.TOKEN_SECRET!); //no expira nunca
      // const token = sign(userPayload, process.env.TOKEN_SECRET!, {
      //   expiresIn: "10s", // aca expira en una hora
      // });

      return { userPayload, token };
    } catch (error) {
      throw Error((error as Error).message);
    }
  }

  async verificarRecaptcha(tokenC: string) {
    const secret = process.env.RECAPTCHA_SECRET_KEY_V2;

    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `secret=${secret}&response=${tokenC}`,
      }
    );

    const data = await response.json();
    return data;
  }
}

export const usuarioServicio = new UsuarioServicio();
