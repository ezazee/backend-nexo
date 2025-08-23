import { Router } from "express";
import {
    createArticle,
    getAllArticles,
    getArticleBySlug,
    getArticleByIdForEdit,
    updateArticle,
    deleteArticle,
    getArticleCategories,
    getPopularTags,
    searchArticles,
    getArticlesByTag,
    getRecentNewsArticles 
} from "../controller/article/articleController";

const router = Router();

// Endpoint CRUD & Agregasi
router.post("/articles", createArticle);
router.get("/articles", getAllArticles);
router.get("/articles/search", searchArticles);
router.get("/articles/categories", getArticleCategories);
router.get("/articles/tags/popular", getPopularTags);
router.get("/articles/tag/:tag", getArticlesByTag);
router.get("/articles/news", getRecentNewsArticles);


// --- ROUTE DINAMIS YANG DIPERBAIKI & TIDAK BENTROK ---
// Endpoint untuk halaman publik (menggunakan slug)
router.get("/articles/slug/:slug", getArticleBySlug); 

// Endpoint untuk halaman edit dashboard (menggunakan ID)
router.get("/articles/id/:id", getArticleByIdForEdit);

// Endpoint untuk update & delete (tetap menggunakan ID)
router.put("/articles/:id", updateArticle);
router.delete("/articles/:id", deleteArticle);

export default router;
