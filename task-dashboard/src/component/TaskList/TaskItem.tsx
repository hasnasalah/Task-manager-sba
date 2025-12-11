import  type {TaskItemProps}  from "../../types";
import type {TaskStatus} from "../../types/index"


export function TaskItem({ task, onStatusChange, onDelete,onEdit }: TaskItemProps){

return (
<li className="list-group-item d-flex justify-content-between align-items-center flex-column flex-md-row">
  <div className="d-flex align-items-center mb-2 mb-md-0">
    <div className="d-flex align-items-center">
      <h6 className="mb-0 me-3">{task.title}</h6>
      <p className="mb-0">{task.description}</p>
    </div>
  </div>

  <div className="d-flex align-items-center">
    <span
      className={`badge me-3 ${
        task.priority === "high"
          ? "bg-danger"
          : task.priority === "medium"
          ? "bg-warning"
          : "bg-success"
      }`}
    >
      {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} priority
    </span>
   <p className="mb-0 me-3">Due: {task.dueDate instanceof Date ? task.dueDate.toLocaleDateString() : new Date(task.dueDate).toLocaleDateString()}</p>
    <select
      value={task.status}
      onChange={(e) => onStatusChange(task.id, e.target.value as TaskStatus)}
      className="form-select form-select-sm me-2"
    >
      <option value="Pending">Pending</option>
      <option value="In Progress">In Progress</option>
      <option value="Completed">Completed</option>
    </select>

    <button className="btn btn-sm btn-warning me-2" onClick={() => onEdit(task.id)}>Edit</button>
    <button className="btn btn-sm btn-danger" onClick={() => onDelete(task.id)}>Delete</button>
  </div>
</li>


);
}