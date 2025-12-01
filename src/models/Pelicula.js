import mongoose from "mongoose";

const PeliculaSchema = new mongoose.Schema(
  {
    original_title: { type: String, required: true },

    detalle: { type: String, required: true },

    actores: [{ type: String }],

    poster: { type: String, required: true },

    genero: [{ type: String }],

    Director: [{ type: String }],

    type: [{ type: String }], // movies / series

    link: { type: String },

    anio: { type: Number },

    estado: {
      type: String,
      enum: ["activo", "inactivo"],
      default: "activo",
    },

   
  },
  { timestamps: true }
);

const Pelicula = mongoose.model('Pelicula', PeliculaSchema, 'peliculas' );
export default Pelicula


 // ===============================
    // NUEVO CAMPO: QUIÉN AGREGÓ LA PELÍCULA
    // ===============================
   // usuario: {
   //   type: mongoose.Schema.Types.ObjectId,
   //   ref: "Usuario",   // referencia al modelo Usuario
   //   required: true,
   // },