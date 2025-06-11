import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URL = process.env.MONGODB_URL!;

if (!MONGODB_URL) {
  throw new Error("URL MongoDB tidak ada / error");
}

// Mengatur tipe untuk cached
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

let cached: MongooseCache = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  // if (cached.conn) {
  //   return cached.conn;
  // }

  if (!cached.promise) {
    const opts = {};

    cached.promise = mongoose.connect(MONGODB_URL, opts).then((mongoose) => {
      console.log("MongoDB Berhasil Connect");
      return mongoose;
    }).catch((error) => {
      console.error("MongoDB Connection Error:", error);
      throw error;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
