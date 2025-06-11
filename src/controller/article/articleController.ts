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

// READ - Mendapatkan semua artikel (dengan filter status untuk publik)
export const getAllArticles = async (req: Request, res: Response) => {
  try {
    // Untuk publik, hanya tampilkan yang statusnya 'published'
    // Untuk dashboard, bisa tambahkan query ?status=all
    const filter: any = req.query.status === 'all' ? {} : { status: 'published' };
    
    // Filter berdasarkan kategori jika ada
    if (req.query.category) {
        filter.category = req.query.category;
    }
    
    const articles = await Article.find(filter).sort({ createdAt: -1 });
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: "Gagal mendapatkan artikel", error });
  }
};

// READ - Mendapatkan satu artikel berdasarkan SLUG (untuk publik)
export const getArticleBySlug = async (req: Request, res: Response) => {
  try {
    const article = await Article.findOne({ slug: req.params.slug, status: 'published' });
    if (!article) return res.status(404).json({ message: "Artikel tidak ditemukan" });
    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ message: "Gagal mendapatkan artikel", error });
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

// MENDAPATKAN DAFTAR KATEGORI DINAMIS
export const getArticleCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Article.aggregate([
      // Hanya hitung dari artikel yang sudah di-publish
      { $match: { status: 'published' } }, 
      // Kelompokkan berdasarkan field 'category' dan hitung jumlahnya
      { $group: { _id: '$category', count: { $sum: 1 } } },
      // Urutkan dari yang paling banyak
      { $sort: { count: -1 } },
      // Ubah nama field _id menjadi category
      { $project: { _id: 0, category: '$_id', count: 1 } }
    ]);
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Gagal mendapatkan kategori", error });
  }
};

// MELAKUKAN PENCARIAN ARTIKEL (VERSI BARU DENGAN REGEX)
export const searchArticles = async (req: Request, res: Response) => {
    try {
        const query = req.query.q;
        if (!query) {
            return res.status(400).json({ message: "Query pencarian tidak boleh kosong" });
        }

        // Membuat regular expression dari query. 'i' berarti case-insensitive (tidak peduli huruf besar/kecil)
        const searchRegex = new RegExp(query as string, 'i');

        // Cari artikel yang statusnya 'published' DAN salah satu dari field di bawah ini cocok dengan regex
        const articles = await Article.find({
            status: 'published',
            // $or akan mencari di semua field yang ada di dalam array ini
            $or: [
                { title: searchRegex },
                { category: searchRegex },
                { tags: searchRegex } // Otomatis mencari di dalam array 'tags'
            ]
        }).sort({ createdAt: -1 }); // Urutkan berdasarkan yang terbaru

        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({ message: "Gagal melakukan pencarian", error });
    }
};

export const getPopularTags = async (req: Request, res: Response) => {
  try {
    const popularTags = await Article.aggregate([
      // 1. Ambil hanya artikel yang sudah publish
      { $match: { status: 'published' } },
      // 2. "Bongkar" array tags menjadi dokumen terpisah
      { $unwind: '$tags' },
      // 3. Kelompokkan berdasarkan nama tag dan hitung jumlahnya
      { $group: { _id: '$tags', count: { $sum: 1 } } },
      // 4. Urutkan dari yang paling banyak digunakan
      { $sort: { count: -1 } },
      // 5. Batasi hanya 10 tag teratas
      { $limit: 10 },
      // 6. Ubah nama field agar lebih rapi
      { $project: { _id: 0, tag: '$_id', count: '$count' } }
    ]);
    res.status(200).json(popularTags);
  } catch (error) {
    res.status(500).json({ message: "Gagal mendapatkan tag populer", error });
  }
};

export const getArticlesByTag = async (req: Request, res: Response) => {
  try {
    const tagName = decodeURIComponent(req.params.tag);

    // Membuat regular expression yang fleksibel dan case-insensitive
    const searchRegex = new RegExp(tagName, 'i');

    const articles = await Article.find({
      // Cari di dalam array 'tags' yang elemennya cocok dengan regex
      tags: searchRegex, 
      status: 'published'
    }).sort({ createdAt: -1 });

    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: "Gagal mendapatkan artikel berdasarkan tag", error });
  }
};