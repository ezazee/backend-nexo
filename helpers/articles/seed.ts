import mongoose from "mongoose";
import dotenv from "dotenv";
import dbConnect from "../../src/utils/dbConnect";
import Article from "../../src/models/articleModel";
import { articleData } from "./data/articleData";

dotenv.config();

const seedArticles = async () => {
  console.log("Menghubungkan ke database...");
  await dbConnect();

  try {
    // 1. Hapus semua data lama
    console.log("Menghapus artikel lama...");
    await Article.deleteMany({});

    // 2. Masukkan data baru satu per satu untuk memicu hooks
    console.log("Memasukkan data artikel satu per satu untuk memicu hooks...");
    
    // --- PERUBAHAN UTAMA DI SINI ---
    // Ganti Article.insertMany(articleData) dengan loop ini:
    for (const article of articleData) {
      await Article.create(article);
    }
    // --------------------------------

    console.log(`Database berhasil di-seed dengan ${articleData.length} artikel baru.`);

  } catch (error) {
    console.error("Gagal melakukan seeding artikel:", error);
  } finally {
    console.log("Menutup koneksi database.");
    await mongoose.connection.close();
  }
};

seedArticles();