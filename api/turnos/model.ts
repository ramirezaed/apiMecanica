import { Schema, model } from "mongoose";

const TurnoSchemas = new Schema({
  usuarioId: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: false,
  },

  nombre: {
    type: String,
    required: true,
  },
  apellido: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: false,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Por favor ingrese un correo electrónico válido",
    ],
  },
  telefono: {
    type: String,
    required: true,
    match: [/^\+?\d{10,15}$/, "Debe ser un número de teléfono válido."],
  },

  servicio: {
    type: Schema.Types.ObjectId,
    ref: "Servicio",
    required: false,
  },
  tipo_vehiculo: {
    type: String,
    required: true,
  },
  modelo: {
    type: String,
    required: true,
  },
  matricula: {
    type: String,
    required: true,
  },
  fecha: {
    type: Date,
    required: true,
    validate: {
      validator: (value: Date) => value > new Date(),
      message: "La fecha debe ser en el futuro.",
    },
  },

  codigo_turno: {
    type: String,
  },

  descripcion: {
    type: String,
    require: false,
    default: "",
  },

  estado_turno: {
    type: String,
    enum: ["Pendiente", "En Proceso", "Finalizado"],
    default: "Pendiente",
  },

  creado_el: {
    type: Date,
    default: Date.now,
  },
});

// Virtual para fecha local formateada
TurnoSchemas.virtual("fechaLocal").get(function () {
  if (!this.fecha) return null;
  return this.fecha
    .toLocaleString("es-AR", {
      timeZone: "America/Argentina/Buenos_Aires",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
    .replace(",", "");
});

// ✅ Configuración para incluir virtuals en toJSON y toObject
TurnoSchemas.set("toJSON", { virtuals: true });
TurnoSchemas.set("toObject", { virtuals: true });

const Turno = model("Turno", TurnoSchemas);

export default Turno;
