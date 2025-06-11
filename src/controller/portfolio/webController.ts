import { Request, Response } from "express";
import { Web } from "../../models/webModel";

export const getWeb = async (req: Request, res: Response) => {
  try {
    const projects = await Web.find({});
    res.status(200).json({ success: true, data: projects });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

export const addWeb = async (req: Request, res: Response) => {
  try {
    const project = await Web.create(req.body);
    res.status(201).json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

export const updateWeb = async (req: Request, res: Response) => {
  try {
    const project = await Web.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

export const deleteWeb = async (req: Request, res: Response) => {
  try {
    await Web.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

export const getWebById = async (req: Request, res: Response) => {
  try {
    const project = await Web.findById(req.params.id);
    if (!project) {
      return res
        .status(404)
        .json({ success: false, error: "Project not found" });
    }
    res.status(200).json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};
