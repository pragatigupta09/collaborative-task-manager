import Board from "../models/Board";

export const BoardRepository = {
  create: (data: any) => Board.create(data),
  findByUser: (userId: string) =>
    Board.find({ userId }).populate("members"),
};
