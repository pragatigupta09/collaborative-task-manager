import { TaskRepository } from "../repositories/task.repository";

export const TaskService = {
  createTask: (data: any) => TaskRepository.create(data),
  updateTask: (id: string, data: any) =>
    TaskRepository.update(id, data),
  deleteTask: (id: string) =>
    TaskRepository.delete(id),
  getTasksByBoard: async (boardId: string, userId: string) => {
    return TaskRepository.findByBoardAndUser(boardId, userId);
  },
  getAllTasks: async (userId: string) => {
    return TaskRepository.findAllByUser(userId);
  },
};


// export const TaskService = {
//   createTask: (data: any) => TaskRepository.create(data),

//   getTasksByBoard: (boardId: string, userId: string) =>
//     TaskRepository.findByBoardAndUser(boardId, userId),

//   getAllTasksByUser: (userId: string) =>
//     TaskRepository.findByUser(userId),

//   updateTask: (id: string, data: any) =>
//     TaskRepository.update(id, data),
// };
