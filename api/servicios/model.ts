import { Schema, model } from "mongoose";

const ServicioSchemas = new Schema({
  nombre: {
    type: String,
    required: true,
    unique: true,
  },
  precio: {
    type: String,
    required: false,
    default: "0",
  },
  descripcion: {
    type: String,
    required: true,
  },

  estado: {
    type: Boolean,
    default: true,
  },
});

const Servicio = model("Servicio", ServicioSchemas);

export default Servicio;
