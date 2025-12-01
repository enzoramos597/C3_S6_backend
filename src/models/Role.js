import mongoose from "mongoose";

const RoleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },

  description: {
    type: String,
    required: true,
  },

  permissions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Permission",
    }
  ],
}, { timestamps: true });

export default mongoose.model("Role", RoleSchema);
