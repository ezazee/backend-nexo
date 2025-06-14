import { Request, Response } from "express";
import User from "../../models/userModel";
// Di masa depan, Anda bisa buat token JWT di sini
// import jwt from 'jsonwebtoken'; 

// --- FUNGSI UNTUK REGISTRASI (JIKA DIBUTUHKAN) ---
export const registerUser = async (req: Request, res: Response) => {
    try {
        const { email, password, name } = req.body;
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: "Email sudah terdaftar" });
        }

        const user = await User.create({ email, password, name });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });

    } catch (error) {
        res.status(500).json({ message: "Gagal mendaftar", error });
    }
};

// --- FUNGSI UNTUK LOGIN (AKAN DIPANGGIL OLEH NEXTAUTH) ---
export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
             return res.status(400).json({ message: "Email dan password wajib diisi" });
        }

        // Cari user berdasarkan email dan minta agar field password diikutsertakan
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(401).json({ message: "Kredensial tidak valid" });
        }
        
        // Bandingkan password yang diinput dengan password di DB
        const isMatch = await user.comparePassword(password);
        
        if (!isMatch) {
            return res.status(401).json({ message: "Kredensial tidak valid" });
        }

        // Jika berhasil, kirim data user (tanpa password)
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        });

    } catch (error) {
        res.status(500).json({ message: "Gagal login", error });
    }
};