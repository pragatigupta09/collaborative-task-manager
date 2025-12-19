import { useQuery } from "@tanstack/react-query";
import api from "../lib/axios";
import taskImage from "../assets/images/tasks.svg";
import TaskCard from "../features/tasks/TaskCard";

type Task = {
  _id: string;
  title: string;
  description: string;
  status: string;
  image?: string;
};

export default function Tasks() {
  const { data, isLoading } = useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: async () => (await api.get("/tasks")).data,
  });

  if (isLoading) {
    return <p className="p-6">Loading tasks...</p>;
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center">
        <img
            src={taskImage}
            alt="Task"
            className="h-40 w-full object-contain bg-slate-100"
        />
        <h2 className="text-xl font-semibold">No tasks yet</h2>
        <p className="text-gray-500">
          Create a board and start adding tasks.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Tasks</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((task) => (
  <TaskCard key={task._id} task={task} />
))}

        {/* {data.map((task) => (
          <div
            key={task._id}
            className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
          >
            <img
  src={task.image ? task.image : taskImage}
  alt={task.title}
  className="h-40 w-full object-contain bg-slate-100"
/>


            <div className="p-4">
              <h3 className="font-semibold text-lg mb-1">
                {task.title}
              </h3>

              <p className="text-sm text-gray-600 mb-3">
                {task.description}
              </p>

              <span className="inline-block px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-700">
                {task.status}
              </span>
            </div>
          </div>
        ))} */}
      </div>
    </div>
  );
}
