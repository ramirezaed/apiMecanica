import Turno from "./model";
import { Iturno, estadoTurno } from "./type";

class TurnoDao {
  async crearTurno(turno: Iturno) {
    try {
      const nuevoTurno = await Turno.create(turno);
      return nuevoTurno;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }

  //  async mostrarTodos(pagina:string, limite:string){
  async mostrarTodos() {
    //  const saltar = (Number(pagina)-1) * Number(limite)
    try {
      const turno = Turno.find();
      // .skip (saltar)
      // .limit(Number(limite))
      return turno;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }
  async buscarPorId(turnoID: string) {
    try {
      const turnoBuscado = await Turno.findById(turnoID);
      return turnoBuscado;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }
  async editarTurno(turnoID: string, turno: Iturno) {
    try {
      const editarTurno = await Turno.findByIdAndUpdate(turnoID, turno, {
        new: true,
      });
      return editarTurno;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }

  async buscarUsuarioTurno(usuarioId: string) {
    try {
      const turnoUsuario = await Turno.find({ usuarioId }).sort({ fecha: 1 });
      return turnoUsuario;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }

  async buscarPorcodigo(codigo_turno: string) {
    try {
      const turno = await Turno.findOne({ codigo_turno });
      return turno;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }
  async buscarPorFecha(fecha: Date) {
    try {
      const turnos = await Turno.find({ fecha });
      return turnos;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }

  async cancelarTurno(codigo_turno: string) {
    try {
      const cancelar = await Turno.findOneAndDelete({ codigo_turno });
      return cancelar;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }

  async cambiarEstado(id: string, estado_turno: estadoTurno) {
    try {
      const turnoModificado = await Turno.findByIdAndUpdate(
        id,
        { estado_turno },
        { new: true }
      );
      return turnoModificado;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }
}

export const turnoDao = new TurnoDao();
