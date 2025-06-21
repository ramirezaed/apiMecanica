import { turnoDao } from "./dao";
import Turno from "./model";
import QRCode from "qrcode";
import { Iturno, estadoTurno } from "./type";
import { DateTime } from "luxon";

const {
  crearTurno,
  buscarPorcodigo,
  mostrarTodos,
  buscarPorFecha,
  editarTurno,
  cancelarTurno,
  buscarPorId,
  buscarUsuarioTurno,
  cambiarEstado,
} = turnoDao;

class TurnoServicio {
  async crearTurno(turno: Iturno) {
    try {
      // 1. Definir horarios disponibles en hora Argentina
      const horariosArgentina = [
        { hours: 9, minutes: 0 }, // 9:00 AM
        { hours: 11, minutes: 0 }, // 11:00 AM
        { hours: 16, minutes: 0 }, // 4:00 PM
        { hours: 17, minutes: 30 }, // 5:30 PM
      ];

      // 2. Crear fecha base en hora Argentina (UTC-3)
      const fechaBase = new Date(`${turno.fecha}T00:00:00-03:00`);

      // 3. Buscar horario disponible
      for (const horario of horariosArgentina) {
        const fechaTurno = new Date(fechaBase);
        fechaTurno.setHours(horario.hours, horario.minutes, 0, 0);

        // Verificar disponibilidad (±30 minutos)
        const turnosExistentes = await Turno.countDocuments({
          fecha: {
            $gte: new Date(fechaTurno.getTime() - 30 * 60000),
            $lte: new Date(fechaTurno.getTime() + 30 * 60000),
          },
        });

        if (turnosExistentes === 0) {
          // 4. Formatear fecha local para mostrar (hora Argentina)
          const fechaLocalFormateada = fechaTurno
            .toLocaleString("es-AR", {
              timeZone: "America/Argentina/Buenos_Aires",
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })
            .replace(",", ""); // Ejemplo: "20/07/2026 16:00"

          // 5. Generar QR (usando hora local)
          const qrData = `Detalles del Turno:
            ----------------------------
            Nombre: ${turno.nombre} ${turno.apellido}
            Vehículo: ${turno.tipo_vehiculo} (${turno.modelo})
            Matrícula: ${turno.matricula}
            Fecha y Hora: ${fechaLocalFormateada}`;

          const qrCode = await QRCode.toDataURL(qrData);

          // 6. Guardar en DB (en UTC)
          const nuevoTurno = new Turno({
            ...turno,
            fecha: fechaTurno, // Se guarda como Date (UTC)
            codigo_turno: qrCode,
            servicioID: turno.servicioID || null,
          });

          await nuevoTurno.save();

          // 7. Devolver respuesta con hora local formateada
          return {
            ...nuevoTurno.toObject(),
            fecha: fechaTurno.toISOString(), // Ej: "2029-10-06T19:00:00.000Z" (16:00 ARG +3)
            fechaLocal: fechaTurno
              .toLocaleString("es-AR", {
                timeZone: "America/Argentina/Buenos_Aires",
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })
              .replace(",", ""), // "06/10/2029 16:00"
          };
        }
      }

      throw new Error("No hay turnos disponibles para la fecha seleccionada");
    } catch (error) {
      console.error("Error al crear turno:", error);
      throw new Error((error as Error).message);
    }
  }

  async editarTurno(turnoID: string, turno: Iturno) {
    const { descripcion } = turno;
    const dbPayLoad = {
      ...(descripcion ? { descripcion } : {}),
    };
    try {
      const verificar = await Turno.findById(turnoID);
      if (!verificar) {
        throw new Error("turno no encontrado");
      }
      const turnoEditado = await editarTurno(turnoID, turno);
      return turnoEditado;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
  // async mostrarTodos(pagina="1", limite ="15"){
  async mostrarTodos() {
    try {
      // const turnos = await mostrarTodos(pagina, limite)
      const turnos = await mostrarTodos();
      // if (!turnos || turnos.length === 0) {
      //   throw new Error("no hay turnos");
      //}
      return turnos || [];
    } catch (error) {
      throw Error((error as Error).message);
    }
  }
  async buscarPorCodigo(codigo: string) {
    try {
      if (!codigo) {
        throw new Error("error al buscar el codigo");
      }
      const turno = await buscarPorcodigo(codigo);
      if (!turno) {
        throw new Error("turno no encontrado");
      }
      return turno;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }
  async buscarPorFecha(fecha: Date) {
    try {
      if (!fecha) {
        throw new Error("Error con la fecha");
      }

      // Convertir la fecha para asegurarse de que sea un rango completo del día (sin importar hora)
      const fechaInicio = new Date(fecha);
      fechaInicio.setHours(0, 0, 0, 0); // Establece la hora a las 00:00:00 para el inicio del día
      const fechaFin = new Date(fecha);
      fechaFin.setHours(23, 59, 59, 999); // Establece la hora a las 23:59:59.999 para el final del día

      // Buscar turnos dentro de ese rango de fecha (todo el día)
      const turnosEncontrados = await Turno.find({
        fecha: { $gte: fechaInicio, $lte: fechaFin },
      });

      if (turnosEncontrados.length === 0) {
        throw new Error("No hay turnos en esta fecha");
      }

      return turnosEncontrados;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
  async cancelarTurno(codigo_turno: string) {
    try {
      const Verificar = await Turno.findOne({ codigo_turno });
      if (!Verificar) {
        throw new Error("turno no encontrado");
      }
      const cancelar = await cancelarTurno(codigo_turno);
      return cancelar;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }
  async buscarPorId(id: string) {
    try {
      const buscado = await buscarPorId(id);
      if (!buscado) {
        const error = new Error("Turno no encontrado");
        (error as any).code = "NOT_FOUND";
        throw error;
      }
      return buscado;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }

  async buscarUsuarioTurno(usuarioId: string) {
    try {
      const turnoUsuario = await buscarUsuarioTurno(usuarioId);
      // if (!turnoUsuario || turnoUsuario.length === 0) {
      //   throw new Error("el usuario no tiene turnos asociados");
      // }
      // return turnoUsuario;
      return turnoUsuario || [];
    } catch (error) {
      throw Error((error as Error).message);
    }
  }

  async obtenerTurno() {
    try {
      const turnos = await Turno.find().populate("servicio");
      if (!turnos) {
        throw new Error("turno no encotnrado");
      }
      return turnos;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }
  async cambiarEstado(id: string, estado_turno: estadoTurno) {
    try {
      if (!id) {
        throw new Error("id vacio");
      }
      if (!estado_turno) {
        throw new Error("estado incorrecto");
      }
      const turnoModificado = await cambiarEstado(id, estado_turno);
      if (!turnoModificado) {
        throw new Error("error al modificar turnos");
      }
      return turnoModificado;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }
}
export const turnoServicio = new TurnoServicio();
