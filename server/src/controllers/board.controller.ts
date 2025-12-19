import { Request, Response } from "express";
import { BoardService } from "../services/board.service";

export const createBoard = async (req: Request, res: Response) => {
  const board = await BoardService.createBoard({
    title: req.body.title,
    userId: (req as any).user.id,
  });
  res.status(201).json(board);
};

export const getBoards = async (req: Request, res: Response) => {
  const boards = await BoardService.getBoardsByUser((req as any).user.id);
  res.json(boards);
};

