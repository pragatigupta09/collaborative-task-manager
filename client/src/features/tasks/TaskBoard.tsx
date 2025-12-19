import TaskColumn from "./TaskColumn.jsx";
import { Task } from "../../types/task.types";

interface Props {
  tasks: Task[];
}

export default function TaskBoard({ tasks }: Props) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <TaskColumn title="Todo" status="todo" tasks={tasks} />
      <TaskColumn title="In Progress" status="in-progress" tasks={tasks} />
      <TaskColumn title="Done" status="done" tasks={tasks} />
    </div>
  );
}
