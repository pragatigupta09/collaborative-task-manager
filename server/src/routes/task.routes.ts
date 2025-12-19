import { Router } from "express";
import {
  createTask,
  getTasksByBoard,
  getAllTasks,
  updateTask,
} from "../controllers/task.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

router.use(protect);

router.post("/", createTask);
router.get("/", getAllTasks);
router.get("/board/:boardId", getTasksByBoard);
router.put("/:id", updateTask);

export default router;
