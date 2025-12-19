import todoIcon from "../../assets/icons/todo.png";
import progressIcon from "../../assets/icons/in-progress.png";
import doneIcon from "../../assets/icons/done.png";

const statusIconMap: Record<string, string> = {
  "todo": todoIcon,
  "in-progress": progressIcon,
  "done": doneIcon,
};

export default function TaskCard({ task }: any) {
  const icon = statusIconMap[task.status] || todoIcon;

  console.log(task.status);

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
      </div>
    </div>
  );
}
