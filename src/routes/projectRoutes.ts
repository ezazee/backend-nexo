import express from "express";
import {
  getUi,
  addUi,
  updateUi,
  deleteUi,
  getUiById,
} from "../controller/portfolio/uiController";
import {
  getWeb,
  addWeb,
  deleteWeb,
  getWebById,
  updateWeb,
} from "../controller/portfolio/webController";

const router = express.Router();

// // // // // Route Untuk UI Design // // // //

// Rute untuk mendapatkan semua proyek desain
router.get("/uiPortfolio", getUi);

// Rute untuk menambahkan proyek desain baru
router.post("/uiPortfolio", addUi);

// Rute untuk memperbarui proyek desain berdasarkan _id
router.put("/uiPortfolio/:id", updateUi);

// Rute untuk menghapus proyek desain berdasarkan _id
router.delete("/uiPortfolio/:id", deleteUi);

// Rute untuk mendapatkan detail proyek desain berdasarkan _id
router.get("/uiPortfolio/:id", getUiById);



// // // // // Route Untuk Website  // // // //

// Rute untuk mendapatkan semua proyek kode
router.get("/webPortfolio", getWeb);

// Rute untuk menambahkan proyek kode baru
router.post("/webPortfolio", addWeb);

// Rute untuk memperbarui proyek kode berdasarkan _id
router.put("/webPortfolio/:id", updateWeb);

// Rute untuk menghapus proyek kode berdasarkan _id
router.delete("/webPortfolio/:id", deleteWeb);

// Rute untuk mendapatkan detail proyek kode berdasarkan _id
router.get("/webPortfolio/:id", getWebById);

export default router;
