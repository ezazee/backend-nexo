import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import dbConnect from './utils/dbConnect';
import portfolioRoutes from './routes/portfolioRoutes';
import articleRoutes from './routes/articleRoutes';
import userRoutes from './routes/userRoutes';
import blobRoutes from './routes/blobRoutes';


dotenv.config();

const app: Express = express();

// Middleware
app.use(cors());
app.use(express.json());

// Koneksi Database
dbConnect();

// Routes
app.use('/api', portfolioRoutes);
app.use('/api', articleRoutes);
app.use('/api', userRoutes);
app.use('/api/blob', blobRoutes);

// HAPUS ATAU BERI KOMENTAR BAGIAN INI:

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log(`Server Berjalan pada di port ${PORT}`);
});


// TAMBAHKAN BARIS INI DI PALING BAWAH
export default app;