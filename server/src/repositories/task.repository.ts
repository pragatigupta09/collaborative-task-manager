import Task from "../models/Task";

export const TaskRepository = {
  create: (data: any) => Task.create(data),

  update: (id: string, data: any) =>
    Task.findByIdAndUpdate(id, data, { new: true }),

  delete: (id: string) =>
    Task.findByIdAndDelete(id),

  findByBoardAndUser: (boardId: string, userId: string) =>
    Task.find({ boardId, creatorId: userId }),

  findAllByUser: (userId: string) => Task.find({ creatorId: userId }),
};


// export const TaskRepository = {
//   create: (data: any) => Task.create(data),

//   findByBoardAndUser: (boardId: string, userId: string) =>
//     Task.find({ boardId, userId }),

//   findByUser: (userId: string) =>
//     Task.find({ userId }),

//   update: (id: string, data: any) =>
//     Task.findByIdAndUpdate(id, data, { new: true }),
// };

