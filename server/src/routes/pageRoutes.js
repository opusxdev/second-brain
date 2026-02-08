import express from "express";
import { registeration, login } from "../controllers/authController.js";
import {
  newContent,
  content,
  deleteContent,
  shareContent
} from "../controllers/crudController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/content", isAuthenticated, content);
router.post("/signup", registeration);
router.post("/signin", login);
router.post("/addcontent", isAuthenticated, newContent);
router.delete("/delete/:contentId", isAuthenticated, deleteContent);
router.get("/share/:userId", isAuthenticated, shareContent);

export default router;

