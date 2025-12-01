import express, { Router } from "express";
import dotenv from "dotenv";
import conectarDB from "./config/db.js";
import routerPeli from "./routes/peliculaRoutes.js";
import expressLayouts from "express-ejs-layouts";
import path from 'path';

dotenv.config();
conectarDB();

const app = express();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configuración EJS
app.set("view engine", "ejs");
app.set("views", "./src/views"); 
app.use(expressLayouts);

// 🔥 Ruta raíz para evitar "Cannot GET /"
// Ruta principal del sitio web: renderiza la vista 'index.ejs'
app.get('/', (req, res) =>{
    res.render('index', {title: 'Pagina Principal'});
});
app.get('/agregarPelicula', (req, res) => {
    res.render('agregarPelicula', {title: 'Agregar Pelicula'});
});
// Sirve archivos estáticos como CSS, JS e imágenes desde la carpeta 'public'
app.use(express.static(path.resolve('./public')));
// Rutas de películas
app.use("/", routerPeli);

// Inicio del servidor
app.listen(process.env.PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${process.env.PORT}`);
});
