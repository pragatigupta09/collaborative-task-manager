import { Router } from "express";
import {
  createTask,
  deleteTask,
  getAllTasks,
  getTasksByBoard,
  updateTask,
} from "../controllers/task.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

router.use(protect);

router.post("/", createTask);
router.delete("/:id", deleteTask);
// router.get("/board/:boardId", getTasksByBoard);
router.put("/:id", updateTask);
router.get("/board/:boardId", getTasksByBoard);
router.get("/", getAllTasks);

export default router;
