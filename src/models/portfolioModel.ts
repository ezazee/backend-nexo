import mongoose, { Schema, Document } from "mongoose";

// Fungsi untuk membuat slug (agar bisa digunakan di pre-save hook)
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

// Hook Mongoose untuk membuat slug secara otomatis sebelum menyimpan
PortfolioItemSchema.pre<IPortfolioItem>('save', function(next) {
  if (this.isModified('title')) {
    this.slug = slugify(this.title);
  }
  next();
});

const Portfolio = mongoose.model<IPortfolioItem>("Portfolio", PortfolioItemSchema);

export default Portfolio;