import { Router } from "express";
import {
    createPortfolioItem,
    getAllPortfolioItems,
    getPortfolioItemById,
    updatePortfolioItem,
    deletePortfolioItem
} from "../controller/portfolio/portfolioController";

const router = Router();

// Endpoint CRUD lengkap untuk portofolio
router.post("/portfolio", createPortfolioItem);
router.get("/portfolio", getAllPortfolioItems);
router.get("/portfolio/:id", getPortfolioItemById);
router.put("/portfolio/:id", updatePortfolioItem);
router.delete("/portfolio/:id", deletePortfolioItem);

export default router;