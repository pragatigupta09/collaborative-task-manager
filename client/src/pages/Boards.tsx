import { useQuery } from "@tanstack/react-query"; 
import api from "../lib/axios"; 
import BoardCard from "../features/boards/BoardCard"; 
import { queryClient } from "../lib/react-query";

export default function Boards() {
  const { data: boards, isLoading } = useQuery({
    queryKey: ["boards"],
    queryFn: async () => (await api.get("/boards")).data,
  });

  if (isLoading) return <p>Loading boards...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Boards</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {boards?.map((board: any) => (
          <BoardCard key={board._id} board={board} />
        ))}
      </div>
    </div>
  );
}
