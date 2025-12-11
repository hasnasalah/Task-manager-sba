//Define interfaces

// Task interface: id, title, description, status, priority, date created, etc.

// Form props interface: fields + submit handler

// Filter options interface: status, date, priority

// TaskItem props interface: task data + callback functions for edit/delete
export type TaskStatus = 'Pending' | 'In Progress' | 'Completed';
 
export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: 'low' | 'medium' | 'high';
  dueDate: Date;
}
 
export interface TaskListProps {
  tasks: Task[];
  onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
  onDelete: (taskId: string) => void;
  onEdit:(taskId: string) => void;
}
export interface TaskItemProps {
  task: Task;
  onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
  onEdit:(taskId: string)=>void;
  onDelete: (taskId: string) => void;
}
export interface TaskFilterProps {
    search:string
  onFilterChange: (filters: {
    status?: TaskStatus;
    priority?: 'low' | 'medium' | 'high';
search?:string;}) => void;
}
// Form props interface: fields + submit handler
export interface TaskFormProps{
    id:string,
    title:string,
     description: string;
  status: TaskStatus;
  priority: 'low' | 'medium' | 'high';
  dueDate: Date;
  onSubmit: (task:Task) => void; 
}