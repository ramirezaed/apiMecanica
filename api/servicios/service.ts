import { servicioDao } from "./dao";
import Servicio from "./model";
import { Iservicio } from "./types";
const {
  crearServicio,
  buscarPorId,
  bajaServicio,
  buscarNombre,
  altaServicio,
  mostrarTodos,
  Inactivos,
  Activos,
  editarServicio,
} = servicioDao;

class ServiService {
  async crearServicio(servicio: Iservicio) {
    try {
      const nuevoServicio = crearServicio(servicio);
      return nuevoServicio;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }

  async editarServicio(id: string, servicio: Iservicio) {
    const { nombre, descripcion, precio } = servicio;
    const dbPayLoad = {
      ...(nombre ? { nombre } : {}),
      ...(descripcion ? { descripcion } : {}),
      ...(precio ? { precio } : {}),
    };
    try {
      const verificar = await Servicio.findById(id, servicio);
      if (!verificar) {
        throw new Error("servicio no encontrado");
      }
      const servicioEditado = await editarServicio(id, servicio);
      return servicioEditado;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }

  async buscarPorId(id: string) {
    try {
      const servicioBuscado = await buscarPorId(id);
      if (!servicioBuscado) {
        throw new Error("servicio no encontrado");
      }
      return servicioBuscado;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }

  async buscarNombre(nombre: string) {
    try {
      const verificar = Servicio.find({ nombre });
      if (!verificar) {
        throw new Error("servicio no encontrado");
      }
      const servicioBuscado = await buscarNombre(nombre);
      return servicioBuscado;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }

  async bajaServicio(id: string) {
    try {
      const verificar = await bajaServicio(id);
      if (!verificar) {
        throw new Error("no se encontro el servicio");
      }
      // if (verificar.estado) {
      //   throw new Error("el servicio ya se encuentra inactivo");
      // }
      const servicioB = await bajaServicio(id);
      if (!servicioB) {
        throw new Error("servicio no encontrado");
      }
      return servicioB;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }

  async altaServicio(id: string) {
    try {
      const servicioA = await altaServicio(id);
      if (!servicioA) {
        throw new Error("servicio no encontrado");
      }
      if (!servicioA.estado) {
        throw new Error("el servicio ya se encuentra1 activo");
      }
      return servicioA;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }
  async mostrarTodos() {
    try {
      const servicios = await mostrarTodos();
      if (!servicios) {
        throw new Error("no hay servicios");
      }
      return servicios;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }
  async Inactivos() {
    try {
      const servicios = await Inactivos();
      if (!servicios) {
        throw new Error("no hay servicios inactivos");
      }
      return servicios;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }
  async Activos() {
    try {
      const servicios = await Activos();
      if (!servicios) {
        throw new Error("no hay servicios activos");
      }
      return servicios;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }
}

export const serviService = new ServiService();
