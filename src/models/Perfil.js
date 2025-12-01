import mongoose from "mongoose";

const PerfilSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    avatar: {
      type: String,
      required: true,
    },

    tipo: {
      type: String,
      enum: ["estandar", "nino"],
      default: "estandar",
    },

    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Perfil", PerfilSchema);
