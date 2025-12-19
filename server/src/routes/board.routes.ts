import { Router } from "express";
import { createBoard, getBoards } from "../controllers/board.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

router.use(protect);

router.post("/", createBoard);
router.get("/", getBoards);


export default router;
