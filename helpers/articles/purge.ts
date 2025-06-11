import mongoose from "mongoose";
import dotenv from "dotenv";
import dbConnect from "../..//src/utils/dbConnect";
import Article from "../../src/models/articleModel";

dotenv.config();

const purgeArticles = async () => {
  console.log("Menghubungkan ke database...");
  await dbConnect();

  try {
    console.log("Menghapus semua data dari koleksi 'articles'...");
    const result = await Article.deleteMany({});
    console.log(`Berhasil! ${result.deletedCount} artikel telah dihapus.`);
  } catch (error) {
    console.error("Gagal membersihkan koleksi artikel:", error);
  } finally {
    console.log("Menutup koneksi database.");
    await mongoose.connection.close();
  }
};

purgeArticles();