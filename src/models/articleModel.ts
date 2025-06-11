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

export interface IArticle extends Document {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage: string;
  category: string;
  tags: string[];
  author: string;
  status: 'draft' | 'published';
}

const ArticleSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    content: { type: String, required: true },
    excerpt: { type: String, required: true },
    coverImage: { type: String, required: true },
    category: { type: String, required: true },
    tags: [{ type: String }],
    author: { type: String, required: true, default: "Nexoria Creative" },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// --- PERBAIKAN UTAMA DI SINI ---
// Hook diubah menjadi 'validate' agar berjalan sebelum validasi 'required'
ArticleSchema.pre<IArticle>('validate', function(next) {
  if (this.isModified('title') || this.isNew) {
    this.slug = slugify(this.title);
  }
  next();
});


const Article = mongoose.model<IArticle>("Article", ArticleSchema);

export default Article;