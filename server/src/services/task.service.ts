import { TaskRepository } from "../repositories/task.repository";

export const TaskService = {
  createTask: (data: any) => TaskRepository.create(data),

  getTasksByBoard: (boardId: string, userId: string) =>
    TaskRepository.findByBoardAndUser(boardId, userId),

  getAllTasksByUser: (userId: string) =>
    TaskRepository.findByUser(userId),

  updateTask: (id: string, data: any) =>
    TaskRepository.update(id, data),
};
