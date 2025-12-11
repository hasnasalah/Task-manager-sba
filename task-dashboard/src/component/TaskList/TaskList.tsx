// second step is building TaskList

// Receives an array of tasks and callbacks 

// Maps through tasks and renders TaskItem for each.

// Handles just props no state
// export interface TaskListProps {
//   tasks: Task[];
//   onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
//   onDelete: (taskId: string) => void;
// }
import type { TaskListProps} from "../../types";
import { TaskItem } from "./TaskItem";
import type {Task} from "../../types/index.ts"
export function TaskList({tasks,onStatusChange,onDelete,onEdit}:TaskListProps){
 return (
  <div className="container py-5">
    <ul className="list-group">
      {tasks.map((task: Task) => (
        <TaskItem
          key={task.id}
          task={task}
          onStatusChange={onStatusChange}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
    </div>
  );
}