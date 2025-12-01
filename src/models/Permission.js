import mongoose from "mongoose";

const PermissionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  }
}, { timestamps: true });

export default mongoose.model("Permission", PermissionSchema);
