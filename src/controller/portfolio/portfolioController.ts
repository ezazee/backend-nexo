import { Request, Response } from "express";
import Portfolio from "../../models/portfolioModel";

// CREATE
export const createPortfolioItem = async (req: Request, res: Response) => {
  try {
    const newItem = new Portfolio(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: "Gagal membuat item portofolio", error });
  }
};

// Ganti fungsi getAllPortfolioItems Anda dengan ini

export const getAllPortfolioItems = async (req: Request, res: Response) => {
  try {
    // --- Logika Paginasi ---
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10; // Default 10 item per halaman
    const skip = (page - 1) * limit;

    // Filter berdasarkan kategori jika ada
    const filter: any = req.query.category
      ? { category: req.query.category }
      : {};

    // Ambil data untuk halaman saat ini
    const items = await Portfolio.find(filter)
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit);

    // Ambil total jumlah dokumen untuk menghitung total halaman
    const totalItems = await Portfolio.countDocuments(filter);
    const totalPages = Math.ceil(totalItems / limit);

    // Kirim data beserta informasi paginasi
    res.status(200).json({
      data: items,
      pagination: {
        currentPage: page,
        totalPages: totalPages,
        totalItems: totalItems,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Gagal mendapatkan data", error });
  }
};

// READ ONE BY ID
export const getPortfolioItemById = async (req: Request, res: Response) => {
  try {
    const item = await Portfolio.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item tidak ditemukan" });
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: "Gagal mendapatkan data", error });
  }
};

// UPDATE
export const updatePortfolioItem = async (req: Request, res: Response) => {
  try {
    const updatedItem = await Portfolio.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedItem)
      return res.status(404).json({ message: "Item tidak ditemukan" });
    res
      .status(200)
      .json({ message: "Item berhasil diupdate", data: updatedItem });
  } catch (error) {
    res.status(500).json({ message: "Gagal mengupdate item", error });
  }
};

// DELETE
export const deletePortfolioItem = async (req: Request, res: Response) => {
  try {
    const deletedItem = await Portfolio.findByIdAndDelete(req.params.id);
    if (!deletedItem)
      return res.status(404).json({ message: "Item tidak ditemukan" });
    res.status(200).json({ message: "Item berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: "Gagal menghapus item", error });
  }
};
