import { Request, Response } from "express";
import Article from "../../models/articleModel";

// CREATE - Membuat artikel baru
export const createArticle = async (req: Request, res: Response) => {
  try {
    const newArticle = new Article(req.body);
    await newArticle.save();
    res.status(201).json({ message: "Artikel berhasil dibuat", data: newArticle });
  } catch (error) {
    res.status(500).json({ message: "Gagal membuat artikel", error });
  }
};

// READ - Mendapatkan semua artikel dengan paginasi
export const getAllArticles = async (req: Request, res: Response) => {
  try {
    // 1. Logika Paginasi
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    // 2. Logika Filter
    const filter: any = req.query.status === 'all' ? {} : { status: 'published' };
    if (req.query.category) {
        filter.category = req.query.category;
    }

    // 3. Ambil data untuk halaman saat ini dan total data secara bersamaan
    const [articles, totalItems] = await Promise.all([
        Article.find(filter)
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit),
        Article.countDocuments(filter)
    ]);
    
    const totalPages = Math.ceil(totalItems / limit);

    // 4. Kirim data dengan format yang menyertakan informasi paginasi
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
      { $match: { status: 'published' } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
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
