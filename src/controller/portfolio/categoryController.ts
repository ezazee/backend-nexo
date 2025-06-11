import { Request, Response } from 'express';
import Portfolio from '../../models/portfolioModel';

// Fungsi dasar untuk mendapatkan item berdasarkan nama kategori
const getItemsByCategory = async (categoryName: string, res: Response) => {
  try {
    const items = await Portfolio.find({ category: categoryName }).sort({ date: -1 });
    if (!items || items.length === 0) {
      return res.status(404).json({ message: `Tidak ada item ditemukan untuk kategori: ${categoryName}` });
    }
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: "Gagal mendapatkan data", error });
  }
};

// --- Ekspor satu fungsi untuk setiap kategori ---

export const getWebDevelopmentPortfolio = async (req: Request, res: Response) => {
  await getItemsByCategory("Web Development", res);
};

export const getMobileDevelopmentPortfolio = async (req: Request, res: Response) => {
  await getItemsByCategory("Mobile Development", res);
};

export const getUiUxDesignPortfolio = async (req: Request, res: Response) => {
  await getItemsByCategory("UI/UX Design", res);
};

export const get3dDesignPortfolio = async (req: Request, res: Response) => {
  await getItemsByCategory("3D Design", res);
};

export const getGraphicDesignPortfolio = async (req: Request, res: Response) => {
  await getItemsByCategory("Graphic Design", res);
};

export const getInstagramManagementPortfolio = async (req: Request, res: Response) => {
  await getItemsByCategory("Instagram Management", res);
};

export const getVideoEditingPortfolio = async (req: Request, res: Response) => {
    // Kategori ini bisa mencakup beberapa nilai
    await getItemsByCategory("Take & Editing Video", res);
};

export const getPhotoEditingPortfolio = async (req: Request, res: Response) => {
    // Kategori ini bisa mencakup beberapa nilai
    await getItemsByCategory("Take & Editing Photo", res);
};