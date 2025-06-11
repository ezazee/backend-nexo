import { Router } from "express";
import { 
    createPortfolioItem, 
    getAllPortfolioItems, 
    getPortfolioItemById,
    updatePortfolioItem,
    deletePortfolioItem 
} from "../controller/portfolio/portfolioController";

const router = Router();

// Endpoint untuk portofolio dengan fungsionalitas CRUD lengkap

// CREATE
router.post("/portfolio", createPortfolioItem);

// READ
router.get("/portfolio", getAllPortfolioItems);
router.get("/portfolio/:id", getPortfolioItemById);

// UPDATE
router.put("/portfolio/:id", updatePortfolioItem);

// DELETE
router.delete("/portfolio/:id", deletePortfolioItem);

export default router;