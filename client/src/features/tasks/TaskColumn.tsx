import TaskCard from "./TaskCard.jsx";
import { Task } from "../../types/task.types";

interface Props {
  title: string;
  status: string;
  tasks: Task[];
}

export default function TaskColumn({ title, status, tasks }: Props) {
  const filteredTasks = tasks.filter(
    (task: any) => task.status === status
  );
  return (
    <div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <div className="space-y-2">
        {filteredTasks.map((task: any) => (
          <TaskCard key={task._id} task={task} />
        ))}
      </div>
    </div>
  );
}
