import { Router } from "express";
import {
  createArticle,
  getAllArticles,
  getArticleBySlug,
  updateArticle,
  deleteArticle,
  getArticleCategories,
  searchArticles,
  getPopularTags,
  getArticlesByTag
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

router.get("/articles/tags/popular", getPopularTags);

router.get("/articles/tag/:tag", getArticlesByTag);
router.get("/articles/:slug", getArticleBySlug); 

export default router;
