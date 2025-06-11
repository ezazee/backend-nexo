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

// READ ALL (dengan filter)
export const getAllPortfolioItems = async (req: Request, res: Response) => {
  try {
    const query = req.query.category ? { category: req.query.category } : {};
    const items = await Portfolio.find(query).sort({ date: -1 });
    res.status(200).json(items);
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
    const updatedItem = await Portfolio.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedItem) return res.status(404).json({ message: "Item tidak ditemukan" });
    res.status(200).json({ message: "Item berhasil diupdate", data: updatedItem });
  } catch (error) {
    res.status(500).json({ message: "Gagal mengupdate item", error });
  }
};

// DELETE
export const deletePortfolioItem = async (req: Request, res: Response) => {
  try {
    const deletedItem = await Portfolio.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ message: "Item tidak ditemukan" });
    res.status(200).json({ message: "Item berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: "Gagal menghapus item", error });
  }
};