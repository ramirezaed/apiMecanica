import { ObjectId } from "mongoose"; // o desde mongodb si lo usás así

export type estadoTurno = "Pendiente" | "En Proceso" | "Finalizado";

export interface Iturno {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  // servicioID: string;
  servicioID: {
    servicioID: string;
    precio: string;
  };
  tipo_vehiculo: string;
  modelo: string;
  matricula: string;
  fecha: Date;
  precio: number;
  codigo_turno: string;
  estado_turno: estadoTurno;
  creado_el: Date;
  usuarioId?: ObjectId | string; // <-- AGREGÁ ESTE CAMPO
  descripcion: string;
}
