import express from "express";
import dotenv from "dotenv";
import conectarDB from "./config/db.js";
import routerPeli from "./routes/peliculaRoutes.js";
import expressLayouts from "express-ejs-layouts";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
conectarDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configuración EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(expressLayouts);

// Vistas
app.get("/", (req, res) => {
  res.render("index", { title: "Pagina Principal" });
});

app.get("/agregarPelicula", (req, res) => {
  res.render("peliculas/agregarPelicula", { title: "Agregar Pelicula" });
});

app.get("/agregarPermiso", (req, res) => {
  res.render("permissions/agregarPermiso", { title: "Agregar Permiso" });
});

app.get("/agregarRole", (req, res) => {
  res.render("roles/agregarRole", { title: "Agregar Role" });
});
//app.get("/agregarUsuario", (req, res) => {
//  res.render("usuarios/agregarUsuario", { title: "Agregar Usuario" });
//});

// Static
app.use(express.static(path.join(__dirname, "../public")));

// Rutas
app.use("/", routerPeli);

// Server
app.listen(process.env.PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${process.env.PORT}`);
});
