import {useState} from "react";
import { TaskList } from "../TaskList/TaskList";
import { TaskFilter} from "../TaskFilter/TaskFilter";
import { TaskForm } from "../TaskForm/TaskForm";
import type{Task}from "../../types/index";
import type { TaskStatus } from "../../types/index";
import{createTask,editTask,deleteTask,changeTaskStatus,filterByStatusAndPriority,searchForTask} from "../../utils/taskUtils"




export function Dashboard(){
    const savedTasks: Task[] = (JSON.parse(localStorage.getItem('tasks') || '[]') as Task[]).map(task => ({
  ...task,dueDate: new Date(task.dueDate) 
}));
const [tasks,setTasks]=useState<Task[]>(savedTasks);
const [filtredTasks,setFiltredTasks]=useState<Task[]>(savedTasks);
const [filterStatus, setFilterStatus] = useState<TaskStatus | "">("");
const [filterPriority, setFilterPriority] = useState<"low" | "medium" | "high"|"">("");
const [searchTerm, setSearchTerm] = useState<string>("");
const [currentTask, setCurrentTask] = useState<Task | null>(null);
//stats:\


  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === "Completed").length;
  const pendingTasks = tasks.filter(t => t.status === "Pending").length;
  const inProgressTasks = tasks.filter(t => t.status === "In Progress").length;


function handleDelete(taskId: string) {
  const updatedTasks = deleteTask(tasks, taskId);
  setTasks(updatedTasks);
  setFiltredTasks(updatedTasks);
   localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}
function handleEdit(taskId:string){
const taskToEdit = tasks.find(t => t.id === taskId);
  if (!taskToEdit) return;

  setCurrentTask(taskToEdit); 
}
function handleSubmitTask(task: Task) {
  let updatedTasks: Task[];
  if (currentTask) { 
    updatedTasks = editTask(tasks, task);
    setCurrentTask(null); 
  } else {
    updatedTasks = createTask(tasks, task);
  }

  setTasks(updatedTasks);
  setFiltredTasks(updatedTasks); 
  localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}

function handleFilter(newStatus?: TaskStatus | "", newPriority?: "low" | "medium" | "high" | "") {
  const statusToUse = newStatus ?? filterStatus;
  const priorityToUse = newPriority ?? filterPriority;

  const result = filterByStatusAndPriority(tasks, statusToUse, priorityToUse);
  setFiltredTasks(result);

  setFilterStatus(statusToUse);
  setFilterPriority(priorityToUse);
}
function handleStatusChange(taskId: string, newStatus: TaskStatus) {
  const updatedTasks = changeTaskStatus(tasks, taskId, newStatus);
  setTasks(updatedTasks);
  setFiltredTasks(updatedTasks);
  localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}
function handleSearch(search: string) {
  const searched = searchForTask(tasks, search); 
  setFiltredTasks(searched);
}
function sortBySoonest() {
  const sorted = [...filtredTasks].sort(
    (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  );
  setFiltredTasks(sorted);
}

    return(
        <>
        <div className={`d-flex justify-content-center align-items-center`} style={{width: "100vw",minHeight: "100vh",}}>
    <div className="container my-4 p-3" style={{ maxWidth: "900px", width: "100%" }}>
  <h1 className="text-center mb-4" style={{ fontWeight: 'bold'}}>
    Task Manager
  </h1>
         <div className="mb-3 d-flex flex-wrap gap-3 justify-content-center align-items-center">
  <div className="p-3 text-white rounded d-flex flex-column align-items-center justify-content-center bg-primary" style={{width: "120px", height: "80px"}}>
    <strong>Total</strong>
    <span>{totalTasks}</span>
  </div>
  <div className="p-3 text-white rounded d-flex flex-column align-items-center justify-content-center bg-success" style={{width: "120px", height: "80px"}}>
    <strong>Completed</strong>
    <span>{completedTasks}</span>
  </div>
  <div className="p-3 text-white rounded d-flex flex-column align-items-center justify-content-center bg-warning" style={{width: "120px", height: "80px"}}>
    <strong>Pending</strong>
    <span>{pendingTasks}</span>
  </div>
  <div className="p-3 text-white rounded d-flex flex-column align-items-center justify-content-center bg-info" style={{width: "120px", height: "80px"}}>
    <strong>In Progress</strong>
    <span>{inProgressTasks}</span>
  </div>
</div>
<div className="mb-3 d-flex flex-column align-items-center gap-2">
 <TaskFilter
  search={searchTerm}
  onFilterChange={({ status, priority, search }) => {
    if (search !== undefined) handleSearch(search);
    if (status !== undefined || priority !== undefined) handleFilter(status, priority);
  }}
  />
     <button
      className="btn btn-outline-secondary btn-sm mb-3"
      onClick={sortBySoonest}
      >
  Sort by Due Date (Soonest First)
</button>
</div>
        <TaskForm  key={currentTask ? currentTask.id : "new"}  id={currentTask?.id??""} title={currentTask?.title??""} description={currentTask?.description??""}status={currentTask?.status??"Pending"} priority={currentTask?.priority??"low"}dueDate={currentTask?.dueDate??new Date()} onSubmit={handleSubmitTask}></TaskForm>
        <TaskList tasks={filtredTasks} onDelete={handleDelete} onEdit={handleEdit} onStatusChange={handleStatusChange}></TaskList>
        </div>
        </div>
        </>
    );
}