import express from "express";
import { login } from "../controllers/adminController.js";

const router = express.Router();

//Admstr
router.post("/user/login", login);

export default router;
