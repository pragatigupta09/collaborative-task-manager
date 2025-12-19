import { Response } from "express";
import { TaskService } from "../services/task.service";
import { AuthRequest } from "../middleware/auth.middleware";
import { getIO } from "../config/socket";
import Notification from "../models/Notification";

export const createTask = async (req: AuthRequest, res: Response) => {
  try {
    const taskData = {
      ...req.body,
      creatorId: req.user!.id,   
    };

    const task = await TaskService.createTask(taskData);

    const io = getIO();
    io.to(task.boardId.toString()).emit("task-created", task); // Optional live update

    if (req.body.assignedToId) {
      io.to(req.body.assignedToId.toString()).emit("task-assigned", {
        taskId: task._id,
        title: task.title,
      });
    }

    res.status(201).json(task);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Failed to create task" });
  }
};

export const deleteTask = async (req: AuthRequest, res: Response) => {
  try {
    const deleted = await TaskService.deleteTask(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Task not found" });
    }

    const io = getIO();
    io.to(deleted.boardId.toString()).emit("task-deleted", { taskId: deleted._id });

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Failed to delete task" });
  }
};

export const updateTask = async (req: AuthRequest, res: Response) => {
  const task = await TaskService.updateTask(req.params.id, req.body);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  const io = getIO();

  // Live update to board (status, priority, assignee all included)
  io.to(task.boardId.toString()).emit("task-updated", task);

  // Assignment notification
  if (req.body.assignedToId) {
  io.to(req.body.assignedToId.toString()).emit("task-assigned", {
    taskId: task._id,
    title: task.title,
    priority: task.priority,
    status: task.status,
  });

  await Notification.create({
    userId: req.body.assignedToId,
    message: `You have been assigned task: ${task.title}`,
    taskId: task._id,
  });
}

  return res.json(task);
};

export const getTasksByBoard = async (req: AuthRequest, res: Response) => {
  const tasks = await TaskService.getTasksByBoard(
    req.params.boardId,
    req.user!.id
  );
  res.json(tasks);
};

export const getAllTasks = async (req: AuthRequest, res: Response) => {
  try {
    const tasks = await TaskService.getAllTasks(req.user!.id);
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};