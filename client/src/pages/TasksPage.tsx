import { useQuery } from "@tanstack/react-query";
import api from "../lib/axios";
import TaskCard from "../features/tasks/TaskCard";

export default function TasksPage() {
  const { data: tasks, isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => (await api.get("/tasks")).data,
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">My Tasks</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tasks?.map((task: any) => (
          <TaskCard key={task._id} task={task} />
        ))}
      </div>
    </div>
  );
}
