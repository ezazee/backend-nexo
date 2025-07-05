import { Request, Response } from "express";
import Article from "../../models/articleModel";

// CREATE - Membuat artikel baru
export const createArticle = async (req: Request, res: Response) => {
  try {
    if (typeof req.body.tags === 'string') {
      try {
        req.body.tags = JSON.parse(req.body.tags);
      } catch {
        req.body.tags = req.body.tags.split(',').map((t: string) => t.trim());
      }
    }

    const newArticle = new Article(req.body);
    await newArticle.save();

    res.status(201).json({ message: "Artikel berhasil dibuat", data: newArticle });
  } catch (error) {
    res.status(500).json({ message: "Gagal membuat artikel", error });
  }
};

export const getAllArticles = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    // Jika limit tidak ada, jangan batasi. Jika ada, gunakan nilainya.
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 0;
    const skip = (page - 1) * limit;

    const filter: any = req.query.status === 'all' ? {} : { status: 'published' };
    if (req.query.category) {
        filter.category = req.query.category;
    }

    const articlesQuery = Article.find(filter)
      .sort({ createdAt: -1 }) // <-- Selalu urutkan dari yang terbaru
      .skip(skip);

    if (limit > 0) {
        articlesQuery.limit(limit); // Terapkan limit jika ada
    }

    const articles = await articlesQuery;
    const totalItems = await Article.countDocuments(filter);
    const totalPages = limit > 0 ? Math.ceil(totalItems / limit) : 1;

    res.status(200).json({
      data: articles,
      pagination: {
        currentPage: page,
        totalPages: totalPages,
        totalItems: totalItems,
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Gagal mendapatkan artikel", error });
  }
};

export const getArticleBySlug = async (req: Request, res: Response) => {
  try {
    const slug = req.params.slug; // Membaca param :slug
    const article = await Article.findOne({ slug: slug, status: 'published' });
    if (!article) return res.status(404).json({ message: "Artikel tidak ditemukan" });
    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ message: "Gagal mendapatkan artikel", error });
  }
};

// Fungsi ini untuk halaman edit di dashboard
export const getArticleByIdForEdit = async (req: Request, res: Response) => {
  try {
    const id = req.params.id; // Membaca param :id
    const article = await Article.findById(id);
    if (!article) return res.status(404).json({ message: "Artikel tidak ditemukan" });
    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ message: "Gagal mendapatkan artikel untuk diedit", error });
  }
};


// UPDATE - Mengupdate artikel berdasarkan ID
export const updateArticle = async (req: Request, res: Response) => {
  try {
    const updatedArticle = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedArticle) return res.status(404).json({ message: "Artikel tidak ditemukan" });
    res.status(200).json({ message: "Artikel berhasil diupdate", data: updatedArticle });
  } catch (error) {
    res.status(500).json({ message: "Gagal mengupdate artikel", error });
  }
};

// DELETE - Menghapus artikel berdasarkan ID
export const deleteArticle = async (req: Request, res: Response) => {
  try {
    const deletedArticle = await Article.findByIdAndDelete(req.params.id);
    if (!deletedArticle) return res.status(404).json({ message: "Artikel tidak ditemukan" });
    res.status(200).json({ message: "Artikel berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: "Gagal menghapus artikel", error });
  }
};


// --- FUNGSI UNTUK SIDEBAR ---

// Mendapatkan daftar Kategori
export const getArticleCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Article.aggregate([
      // 1. Ambil hanya artikel yang sudah 'published'
      { $match: { status: 'published' } },
      // 2. Kelompokkan berdasarkan field 'category' dan hitung jumlahnya
      { $group: { _id: '$category', count: { $sum: 1 } } },
      // 3. Urutkan dari yang paling banyak postingannya
      { $sort: { count: -1 } },
      // 4. Batasi hanya 5 kategori teratas
      { $limit: 5 },
      // 5. Ubah nama field agar rapi
      { $project: { _id: 0, category: '$_id', count: '$count' } }
    ]);
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Gagal mendapatkan kategori", error });
  }
};

// Mendapatkan Tag Populer
export const getPopularTags = async (req: Request, res: Response) => {
  try {
    const popularTags = await Article.aggregate([
      { $match: { status: 'published' } },
      { $unwind: '$tags' },
      { $group: { _id: '$tags', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
      { $project: { _id: 0, tag: '$_id', count: '$count' } }
    ]);
    res.status(200).json(popularTags);
  } catch (error) {
    res.status(500).json({ message: "Gagal mendapatkan tag populer", error });
  }
};

// Mendapatkan Artikel berdasarkan Tag
export const getArticlesByTag = async (req: Request, res: Response) => {
  try {
    const tagName = decodeURIComponent(req.params.tag);
    const searchRegex = new RegExp(tagName, 'i');
    const articles = await Article.find({ tags: searchRegex, status: 'published' }).sort({ createdAt: -1 });
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: "Gagal mendapatkan artikel berdasarkan tag", error });
  }
};

// Melakukan Pencarian Artikel
export const searchArticles = async (req: Request, res: Response) => {
  try {
      const query = req.query.q;
      if (!query) {
          return res.status(400).json({ message: "Query pencarian tidak boleh kosong" });
      }
      const searchRegex = new RegExp(query as string, 'i');
      const articles = await Article.find({
          status: 'published',
          $or: [
              { title: searchRegex },
              { category: searchRegex },
              { tags: searchRegex }
          ]
      }).sort({ createdAt: -1 });
      res.status(200).json(articles);
  } catch (error) {
      res.status(500).json({ message: "Gagal melakukan pencarian", error });
  }
};
