import express from "express";
import {
  register,
  login,
  hasUsers,
  me,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/exists", hasUsers);
router.get("/me", me);

export default router;
