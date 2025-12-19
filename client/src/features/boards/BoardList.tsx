import { useQuery } from "@tanstack/react-query";
import { getBoards } from "./board.api";
import BoardCard from "./BoardCard.jsx";
import { Board } from "../../types/board.types";

export default function BoardList() {
  const { data = [] } = useQuery<Board[]>({
    queryKey: ["boards"],
    queryFn: getBoards,
  });

  return (
    <div className="grid grid-cols-3 gap-4">
      {data.map((board) => (
        <BoardCard key={board._id} board={board} />
      ))}
    </div>
  );
}
