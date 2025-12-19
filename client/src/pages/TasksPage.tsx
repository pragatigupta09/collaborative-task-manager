import { useQuery } from "@tanstack/react-query";
import api from "../lib/axios";
import TaskCard from "../features/tasks/TaskCard";
import { useEffect } from "react";
import { socket } from "../lib/socket";

export default function TasksPage() {
  const { data: tasks, isLoading, refetch } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => (await api.get("/tasks").then(res => res.data)),
  });

  const userId = localStorage.getItem("userId"); 

  useEffect(() => {
  if (!userId) return;

  socket.emit("join-user", userId);

  socket.on("task-assigned", (data) => {
    alert(`You have been assigned a task: ${data.title} (Priority: ${data.priority}, Status: ${data.status})`);
    refetch();
  });

  return () => {
    socket.off("task-assigned");
  };
}, [refetch, userId]);

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
