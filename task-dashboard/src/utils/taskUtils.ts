
import type {Task,TaskStatus} from "../types/index"
export function createTask(tasks: Task[], newTask: Task){
 return([...tasks,newTask]);
}

export function editTask(tasks: Task[], updatedTask: Task){
 return tasks.map(task =>
        task.id === updatedTask.id ? updatedTask : task
    );
}

export function deleteTask(tasks: Task[], taskId: string){
 const updatedList = tasks.filter((item) => item.id !== taskId);
 return(updatedList);
}

export function changeTaskStatus(tasks: Task[], taskId: string, status: TaskStatus){
const updatedTasks = tasks.map(task =>task.id === taskId ? { ...task, status: status } : task);
    return updatedTasks;
}

export function filterByStatusAndPriority(tasks: Task[], status: TaskStatus|"", priority?: 'low' | 'medium' | 'high'|''){
 return tasks.filter(task => {
      const statusMatch = !status||task.status === status;
      const priorityMatch =!priority||task.priority === priority;
      return statusMatch && priorityMatch;
    })
}
export function searchForTask(tasks:Task[],title:string):Task[]{
   return tasks.filter(task => 
    task.title.toLowerCase().includes(title.toLowerCase())
  );
}