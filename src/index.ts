import express from "express";
import dotenv from "dotenv";
import dbConnect from "./utils/dbConnect";
import portfolioRoutes from './routes/portfolioRoutes'; // <-- Impor route baru
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

dbConnect();

app.use("/api", portfolioRoutes);

app.listen(PORT, () => {
  console.log(`Server Berjalan pada di port ${PORT}`);
});
