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
        "https://i.pinimg.com/originals/34/65/cd/3465cda198db3eef055503fbb826e526.jpg",
    },

    estado: {
      type: Number,
      default: 1,
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

    // 🔥 El único que define permisos
    perfiles: [
  {
    name: { type: String, required: true },
    avatar: { type: String, default: "" },
    createdAt: { type: Date, default: Date.now } // opcional
  }
],
  },
  { timestamps: true }
);

export default mongoose.model("Usuario", UsuarioSchema);


