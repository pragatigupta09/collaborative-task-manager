import todoIcon from "../../assets/icons/todo.png";
import progressIcon from "../../assets/icons/in-progress.png";
import doneIcon from "../../assets/icons/done.png";
import api from "../../lib/axios";

const statusIconMap: Record<string, string> = {
  "todo": todoIcon,
  "in-progress": progressIcon,
  "done": doneIcon,
};

export default function TaskCard({ task }: any) {
  const icon = statusIconMap[task.status] || todoIcon;

  return (
    <div className="flex items-center gap-3 p-4 bg-white rounded shadow hover:shadow-md transition">
      <img
        src={icon}
        className="w-8 h-8"
        alt={task.status}
      />

      <div>
        <p className="font-medium">{task.title}</p>
        <span className="text-sm text-gray-500 capitalize">
          {task.status}
        </span>
        <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-700">
          {task.priority}
        </span>
      </div>
      <button
  onClick={() => {
    const newStatus = prompt("New status: todo | in-progress | done");
    const newPriority = prompt("New priority: low | medium | high | urgent");
    api.put(`/tasks/${task._id}`, {
      status: newStatus || task.status,
      priority: newPriority || task.priority,
    });
  }}
  className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
>
  Edit Task
</button>
    </div>
  );
}
