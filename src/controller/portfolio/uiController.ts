import { Request, Response } from "express";
import { Ui } from "../../models/uiModel";

// Fungsi untuk mendapatkan semua proyek desain
export const getUi = async (req: Request, res: Response) => {
  try {
    const projects = await Ui.find({});
    res.status(200).json({ success: true, data: projects });
  } catch (error) {
    res.status(500).json({ success: false, error, data: {} });
  }
};

// Fungsi untuk menambahkan proyek desain baru
export const addUi = async (req: Request, res: Response) => {
  try {
    const project = await Ui.create(req.body);
    res.status(201).json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, error, data: {} });
  }
};

// Fungsi untuk memperbarui proyek desain berdasarkan _id
export const updateUi = async (req: Request, res: Response) => {
  try {
    const project = await Ui.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, error, data: {} });
  }
};

// Fungsi untuk menghapus proyek desain berdasarkan _id
export const deleteUi = async (req: Request, res: Response) => {
  try {
    await Ui.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error, data: {} });
  }
};

// Fungsi untuk mendapatkan detail proyek desain berdasarkan _id
export const getUiById = async (req: Request, res: Response) => {
  try {
    const project = await Ui.findById(req.params.id);
    if (!project) {
      return res
        .status(404)
        .json({ success: false, error: "Project not found" });
    }
    res.status(200).json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, error, data: {} });
  }
};

// Fungsi untuk mendapatkan semua proyek kod
