import { Request, Response } from "express";
import { TaskService } from "../services/task.service";
import { AuthRequest } from "../middleware/auth.middleware";

export const createTask = async (req: AuthRequest, res: Response) => {
  const task = await TaskService.createTask({
    ...req.body,
    status: req.body.status?.toLowerCase().trim(),
    userId: req.user!.id,
  });
  res.status(201).json(task);
};

export const getTasksByBoard = async (req: AuthRequest, res: Response) => {
  const tasks = await TaskService.getTasksByBoard(
    req.params.boardId,
    req.user!.id
  );
  res.json(tasks);
};

export const getAllTasks = async (req: AuthRequest, res: Response) => {
  const tasks = await TaskService.getAllTasksByUser(req.user!.id);
  res.json(tasks);
};

export const updateTask = async (req: Request, res: Response) => {
  const task = await TaskService.updateTask(req.params.id, req.body);
  res.json(task);
};
