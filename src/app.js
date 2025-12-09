import express from "express";
import dotenv from "dotenv";
import conectarDB from "./config/db.js";
import routerPeli from "./routes/peliculaRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

import "./models/Pelicula.js";
import "./models/Usuario.js";
import "./models/Perfil.js";
import "./models/Role.js";
import "./models/Permission.js";

import cors from "cors";

dotenv.config();
const app = express();
conectarDB();

// CORS FIXED
const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Content-Range", "x-Content-Range"],
  maxAge: 86400
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Static
app.use(express.static(path.join(__dirname, "../public")));

// Rutas API
app.use("/api", routerPeli);

// Ruta base
app.get("/", (req, res) => {
  res.json({ message: "API funcionando correctamente" });
});

// Servidor
app.listen(process.env.PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${process.env.PORT}`);
  console.log(`🚀 Servidor corriendo en http://localhost:${process.env.PORT}`);
});
