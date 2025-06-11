import mongoose, { Schema, Document } from "mongoose";

// Interface ini akan mewakili setiap item dalam data JSON Anda
export interface IPortfolioItem extends Document {
  title: string;
  shortDescription: string;
  longDescription: string;
  client: string;
  industry: string;
  date: Date;
  category: string;
  image: string;
  projectUrl: string; // Menggantikan 'ahref'
  // 'link' dari JSON tidak perlu disimpan, karena itu untuk routing frontend
}

const PortfolioItemSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    shortDescription: { type: String, required: true },
    longDescription: { type: String, required: true },
    client: { type: String, required: true },
    industry: { type: String, required: true },
    date: { type: Date, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    projectUrl: { type: String, required: false }, // Dibuat opsional
  },
  {
    timestamps: true, // Otomatis menambahkan createdAt dan updatedAt
  }
);

// Gunakan satu nama model yang umum, yaitu "Portfolio"
const Portfolio = mongoose.model<IPortfolioItem>("Portfolio", PortfolioItemSchema);

export default Portfolio;