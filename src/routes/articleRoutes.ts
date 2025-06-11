import { Router } from "express";
import {
  createArticle,
  getAllArticles,
  getArticleBySlug,
  updateArticle,
  deleteArticle,
  getArticleCategories,
  searchArticles,
} from "../controller/article/articleController";

const router = Router();

router.post("/articles", createArticle);

// READ
router.get("/articles", getAllArticles);
router.get("/articles/categories", getArticleCategories);

router.get("/articles/search", searchArticles);
router.get("/articles/:slug", getArticleBySlug);
// ---------------------------------

router.put("/articles/:id", updateArticle);

router.delete("/articles/:id", deleteArticle);

export default router;
