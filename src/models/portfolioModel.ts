import mongoose, { Schema, Document } from "mongoose";

// Fungsi helper untuk membuat slug yang URL-friendly
const slugify = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
};

export interface IPortfolioItem extends Document {
  title: string;
  slug: string;
  shortDescription: string;
  longDescription: string;
  client: string;
  industry: string;
  date: Date;
  category: string;
  image: string;
  projectUrl?: string;
  githubUrl?: string;
}

const PortfolioItemSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    shortDescription: { type: String, required: true },
    longDescription: { type: String, required: true },
    client: { type: String, required: true },
    industry: { type: String, required: true },
    date: { type: Date, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    projectUrl: { type: String, required: false },
    githubUrl: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

// --- PERBAIKAN UTAMA DI SINI ---
// Hook diubah menjadi 'validate' agar berjalan sebelum validasi 'required'
PortfolioItemSchema.pre<IPortfolioItem>('validate', function(next) {
  // Hanya jalankan jika judul berubah atau saat dokumen baru
  if (this.isModified('title') || this.isNew) {
    // Menghindari duplikasi slug dengan menambahkan string acak jika perlu
    // Namun untuk seeder, slugify sederhana sudah cukup
    this.slug = slugify(this.title);
  }
  next();
});

const Portfolio = mongoose.model<IPortfolioItem>("Portfolio", PortfolioItemSchema);

export default Portfolio;