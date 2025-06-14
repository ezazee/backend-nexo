import { Router } from "express";
import {
    createArticle,
    getAllArticles,
    getArticleBySlug,
    updateArticle,
    deleteArticle,
    getArticleCategories,
    getPopularTags,
    searchArticles,
    getArticleByIdForEdit // <-- 1. Impor fungsi baru
} from "../controller/article/articleController";

const router = Router();

// Endpoint untuk CRUD Artikel

// CREATE
router.post("/articles", createArticle);

// READ
router.get("/articles", getAllArticles);
router.get("/articles/search", searchArticles);
router.get("/articles/categories", getArticleCategories);
router.get("/articles/tags/popular", getPopularTags);

// --- 2. TAMBAHKAN ROUTE BARU INI (SEBELUM /:slug) ---
// Route ini khusus untuk halaman edit di dashboard
router.get("/articles/:id", getArticleByIdForEdit); 

// Route ini untuk halaman detail artikel di website publik
router.get("/articles/:slug", getArticleBySlug); 


// UPDATE
router.put("/articles/:id", updateArticle);

// DELETE
router.delete("/articles/:id", deleteArticle);

export default router;
