import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import dbConnect from './utils/dbConnect';
import portfolioRoutes from './routes/portfolioRoutes';
import articleRoutes from './routes/articleRoutes'; // <-- 1. Impor router artikel

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3030;

app.use(cors());
app.use(express.json());

dbConnect();

// Gunakan kedua router
app.use('/api', portfolioRoutes);
app.use('/api', articleRoutes); // <-- 2. Daftarkan router artikel

app.listen(PORT, () => {
  console.log(`Server Berjalan pada di port ${PORT}`);
});