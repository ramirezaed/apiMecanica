import express, { Request, Response } from "express";
import dbConnect from "./db/dbConnect";
import { config } from "dotenv";
import router from "./routers";
import cookieParser from "cookie-parser";

import cors from "cors"; // Importa CORS esto es para que desde el front pueda entrar a todos los endpoint

config();
const PORT = Number(process.env.PORT) || 5000; // parseando, le digo que es del tipo numero
const HOST = process.env.HOST || "localhost";
const app = express();
app.use(cors());
// app.use(cors({
//   origin: 'http://localhost:3000',  // Cambia este valor al puerto donde corre tu frontend
// }));
app.use(express.json());
app.use(cookieParser());
app.use("/api", router);

dbConnect(); //me conecto a la base de dato abstraida

// app.listen(PORT, HOST, () => {
//   console.log(`server is runnin en http://${HOST}:${PORT}`);
// });
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
