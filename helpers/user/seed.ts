import mongoose from "mongoose";
import dotenv from "dotenv";
import dbConnect from "../../src/utils/dbConnect";
import User from "../../src/models/userModel";
import { userData } from "./data/userData";

dotenv.config();

const seedUsers = async () => {
  console.log("Menghubungkan ke database...");
  await dbConnect();

  try {
    console.log("Memeriksa dan membuat akun admin jika belum ada...");

    for (const user of userData) {
      // Cek apakah user dengan email ini sudah ada
      const userExists = await User.findOne({ email: user.email });

      if (!userExists) {
        // Jika belum ada, buat user baru
        await User.create(user);
        console.log(`User admin dengan email ${user.email} berhasil dibuat.`);
      } else {
        console.log(`User admin dengan email ${user.email} sudah ada, proses dilewati.`);
      }
    }

  } catch (error) {
    console.error("Gagal melakukan seeding user:", error);
  } finally {
    console.log("Menutup koneksi database.");
    await mongoose.connection.close();
  }
};

seedUsers();