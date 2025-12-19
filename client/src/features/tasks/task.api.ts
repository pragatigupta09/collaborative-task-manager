import api from "../../lib/axios";

export const getTasks = async (boardId: string) =>
  (await api.get(`/tasks/${boardId}`)).data;

export const createTask = (data: any) =>
  api.post("/tasks", data);
