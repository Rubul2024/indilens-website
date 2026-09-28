const mongoose = require("mongoose");

// Cache the connection across serverless invocations (Vercel reuses warm instances)
let cached = global._mongoose || (global._mongoose = { conn: null, promise: null });

const connectDB = async () => {
  if (cached.conn) return cached.conn;

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not defined");
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 10000 })
      .then((conn) => {
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        return conn;
      })
      .catch((error) => {
        cached.promise = null;
        console.error("MongoDB Connection Error:", error.message);
        throw error;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

module.exports = connectDB;
