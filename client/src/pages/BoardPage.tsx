import { useParams } from "react-router-dom";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import api from "../lib/axios";
import { useEffect } from "react";
import { socket } from "../lib/socket";
import taskImage from "../assets/images/tasks.svg";

export default function BoardPage() {
  const queryClient = useQueryClient();

  const { id } = useParams();

  const createTaskMutation = useMutation({
    mutationFn: (data: { title: string; status: string }) =>
      api.post("/tasks", {
        ...data,
        boardId: id,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", id] });
    },
  });
  

  const { data, refetch, isLoading } = useQuery({
    queryKey: ["tasks", id],
    queryFn: async () => (await api.get(`/tasks/board/${id}`)).data
  });

  useEffect(() => {
    if (!id) return;

    socket.emit("join-board", id);

    socket.on("task-created", refetch);
    socket.on("task-updated", refetch);

    return () => {
      socket.off("task-created");
      socket.off("task-updated");
    };
  }, [id, refetch]);

  if (isLoading) {
    return <p className="p-6">Loading tasks...</p>;
  }

  const handleAddTask = () => {
  const title = prompt("Enter task title");
  if (!title) return;

  const status =
    prompt("Enter status (todo | in-progress | done)") || "todo";

  createTaskMutation.mutate({
    title,
    status,
  });
};


  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Tasks</h2>
      
      <button
  onClick={handleAddTask}
  className="mb-4 bg-green-600 text-white px-4 py-2 rounded"
>
  + Add Task
</button>

      {data?.length === 0 ? (
        <p className="text-gray-500">No tasks in this board.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data?.map((task: any) => (
            <div
              key={task._id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
            >
              {/* <img
                src={task.image || taskImage}
                alt={task.title}
                className="h-40 w-full object-contain bg-slate-100"
              /> */}

              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1">
                  {task.title}
                </h3>

                {task.description && (
                  <p className="text-sm text-gray-600 mb-2">
                    {task.description}
                  </p>
                )}

                <span className="inline-block px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-700">
                  {task.status || "Pending"}
                </span>
  
              </div>
              
            </div>
          ))}
          
        </div>
      )}
      

    </div>
  );
}
