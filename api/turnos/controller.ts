import Turno from "./model";
import { turnoServicio } from "./service";
import { Response, Request } from "express";

const {
  crearTurno,
  buscarPorCodigo,
  mostrarTodos,
  buscarPorFecha,
  cancelarTurno,
  buscarPorId,
  obtenerTurno,
  buscarUsuarioTurno,
  cambiarEstado,
  editarTurno,
} = turnoServicio;

class TurnoController {
  async crearTurno(req: Request, res: Response) {
    try {
      // const usuarioId = req.params.id;
      const Datosturno = req.body;
      const turno = await crearTurno(Datosturno);
      // 👉 Ahora buscamos ese turno y "rellenamos" el servicio asociado
      const turnoConServicio = await Turno.findById(turno._id).populate(
        "servicio"
      );

      return res.status(201).json(turnoConServicio);
      // return res.status(201).json(turno);
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  }

  async buscarPorCodigo(req: Request, res: Response) {
    try {
      const { codigo_turno } = req.body;
      const turno = await buscarPorCodigo(codigo_turno);
      return res.status(200).json(turno);
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  }
  async buscarporFecha(req: Request, res: Response) {
    try {
      const { fecha } = req.body;
      const turnos = await buscarPorFecha(fecha);
      return res.status(200).json(turnos);
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  }
  async mostrarTodos(req: Request, res: Response) {
    try {
      const turnos = await mostrarTodos();
      return res.status(200).json(turnos);
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  }
  async editarTurno(req: Request, res: Response) {
    const { id } = req.params;
    const descripcion = req.body;
    try {
      const turnoEditado = await editarTurno(id, descripcion);
      return res.status(200).json(turnoEditado);
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  }

  async cancelarTurno(req: Request, res: Response) {
    try {
      const { codigo_turno } = req.body;
      const cancelar = await cancelarTurno(codigo_turno);
      return res.status(200).json("Turno cancelado");
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  }

  async buscarPorId(req: Request, res: Response) {
    try {
      const idturno = req.params.id;
      const turnoBuscado = await buscarPorId(idturno);
      return res.status(200).json(turnoBuscado);
    } catch (error) {
      const e = error as Error & { code?: string };
      if (e.code === "NOT_FOUND") {
        return res.status(404).json({ error: e.message });
      }
      return res.status(500).json({ error: e.message });
    }
  }

  async buscarUsuarioTurno(req: Request, res: Response) {
    try {
      const idUsuario = req.params.id;
      const turnoUsuario = await buscarUsuarioTurno(idUsuario);
      return res.status(200).json(turnoUsuario);
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  }

  async obtenerturno(req: Request, res: Response) {
    try {
      const turno = await obtenerTurno();
      return res.status(200).json(turno);
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  }

  async cambiarEstado(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const { estado_turno } = req.body;
      const turnoModificado = await cambiarEstado(id, estado_turno);
      return res.status(200).json(turnoModificado);
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  }
}
export const turnoController = new TurnoController();
