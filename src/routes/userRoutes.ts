import { Router } from "express";
import { registerUser, loginUser } from "../controller/user/userController";

const router = Router();

// Endpoint untuk registrasi
router.post("/auth/register", registerUser);

// Endpoint untuk login
router.post("/auth/login", loginUser);

export default router;