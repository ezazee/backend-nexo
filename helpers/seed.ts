import mongoose from "mongoose";
import dotenv from "dotenv";
import dbConnect from "../src/utils/dbConnect";
import Portfolio from "../src/models/portfolioModel";
import { portfolioData } from "./data/portfolioData"; // <-- Otomatis mengimpor data baru yang lengkap

dotenv.config();

const seedDatabase = async () => {
  console.log("Menghubungkan ke database...");
  await dbConnect();

  try {
    console.log("Menghapus data portofolio lama...");
    await Portfolio.deleteMany({});

    console.log("Memasukkan data portofolio baru yang lebih lengkap...");
    await Portfolio.insertMany(portfolioData);

    console.log(`Database berhasil di-seed dengan ${portfolioData.length} item portofolio baru.`);
  } catch (error) {
    console.error("Gagal melakukan seeding database:", error);
  } finally {
    console.log("Menutup koneksi database.");
    await mongoose.connection.close();
  }
};

seedDatabase();