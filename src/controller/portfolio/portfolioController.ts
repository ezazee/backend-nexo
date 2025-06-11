import { Request, Response } from "express";
import Portfolio, { IPortfolioItem } from "../../models/portfolioModel";

// Membuat item portofolio baru
export const createPortfolioItem = async (req: Request, res: Response) => {
  try {
    const newItem: IPortfolioItem = new Portfolio(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: "Gagal membuat item portofolio", error });
  }
};

// Mendapatkan semua item portofolio (dengan filter kategori)
export const getAllPortfolioItems = async (req: Request, res: Response) => {
  try {
    const query = req.query.category ? { category: req.query.category } : {};
    const items = await Portfolio.find(query).sort({ date: -1 }); // Urutkan dari yang terbaru
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: "Gagal mendapatkan data", error });
  }
};

// Mendapatkan satu item berdasarkan ID
export const getPortfolioItemById = async (req: Request, res: Response) => {
  try {
    const item = await Portfolio.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Item tidak ditemukan" });
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: "Gagal mendapatkan data", error });
  }
};

// Mengupdate satu item berdasarkan ID
export const updatePortfolioItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // Cari dan update item dengan data baru dari body request
    // Opsi { new: true } akan mengembalikan dokumen yang sudah ter-update
    const updatedItem = await Portfolio.findByIdAndUpdate(id, req.body, { 
      new: true, 
      runValidators: true 
    });

    if (!updatedItem) {
      return res.status(404).json({ message: "Item tidak ditemukan" });
    }

    res.status(200).json({ message: "Item berhasil diupdate", data: updatedItem });
  } catch (error) {
    res.status(500).json({ message: "Gagal mengupdate item", error });
  }
};

// Menghapus satu item berdasarkan ID
export const deletePortfolioItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const deletedItem = await Portfolio.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ message: "Item tidak ditemukan" });
    }

    res.status(200).json({ message: "Item portofolio berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: "Gagal menghapus item", error });
  }
};