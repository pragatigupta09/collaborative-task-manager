import api from "../../lib/axios";

export const getBoards = async () =>
  (await api.get("/boards")).data;

export const createBoard = (data: any) =>
  api.post("/boards", data);
