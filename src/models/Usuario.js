import mongoose from "mongoose";

const UsuarioSchema = new mongoose.Schema(
  {
    correo: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    contrasenia: {
      type: String,
      required: true,
      minlength: 6,
    },

    name: { type: String, required: true },
    apellido: { type: String, required: true },

    avatar: {
      type: String,
      default:
        "https://wallpapers.com/images/featured-full/imagenes-de-perfil-de-netflix-62wgyitks6f4l79m.jpg",
    },

    estado: {
      type: Number,
      default: 1, // 1 activo, 0 inactivo
    },

    type: {
      type: String,
      enum: ["usuario", "admin"],
      default: "usuario",
    },

    perfiles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Perfil",
      },
    ],

    favoritos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pelicula",
      },
    ],

    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Usuario", UsuarioSchema);
