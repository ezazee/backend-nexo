import mongoose from "mongoose";
import dotenv from "dotenv";
import dbConnect from "../../src/utils/dbConnect";
import User from "../../src/models/userModel";

dotenv.config();

const purgeUsers = async () => {
  console.log("Menghubungkan ke database...");
  await dbConnect();

  try {
    console.log("Menghapus semua data dari koleksi 'users'...");
    const result = await User.deleteMany({});
    console.log(`Berhasil! ${result.deletedCount} user telah dihapus.`);
  } catch (error) {
    console.error("Gagal membersihkan koleksi user:", error);
  } finally {
    console.log("Menutup koneksi database.");
    await mongoose.connection.close();
  }
};

purgeUsers();
