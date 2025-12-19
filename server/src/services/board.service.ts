import { BoardRepository } from "../repositories/board.repository";

export const BoardService = {
  createBoard: (data: any) => BoardRepository.create(data),
  getBoardsByUser: (userId: string) =>
  BoardRepository.findByUser(userId),

};
