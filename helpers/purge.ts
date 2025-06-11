import mongoose from "mongoose";
import dotenv from "dotenv";
import dbConnect from "../src/utils/dbConnect";
import Portfolio from "../src/models/portfolioModel";

dotenv.config();

const purgeDatabase = async () => {
  console.log("Menghubungkan ke database...");
  await dbConnect();

  try {
    console.log("Menghapus semua data dari koleksi 'portfolios'...");
    
    // --- PERUBAHAN: Menangkap hasil operasi deleteMany ---
    const result = await Portfolio.deleteMany({});
    
    // --- PERUBAHAN: Memberikan laporan jumlah data yang dihapus ---
    console.log(`Berhasil! ${result.deletedCount} item portofolio telah dihapus.`);
    console.log("Database berhasil dibersihkan.");

  } catch (error) {
    console.error("Gagal membersihkan database:", error);
  } finally {
    // Selalu tutup koneksi setelah selesai
    console.log("Menutup koneksi database.");
    await mongoose.connection.close();
  }
};

purgeDatabase();