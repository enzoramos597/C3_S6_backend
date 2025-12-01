import mongoose from "mongoose";

const conectarDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "peliflix"
    });

    console.log("📌 MongoDB conectado:", conn.connection.host);
  } catch (error) {
    console.error("❌ Error al conectar a MongoDB:", error.message);
    process.exit(1);
  }
};

export default conectarDB;

