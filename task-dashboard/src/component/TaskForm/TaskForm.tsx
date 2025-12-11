// export interface TaskFormProps{
//     id:string,
//     title:string,
//      description: string;
//   status: TaskStatus;
//   priority: 'low' | 'medium' | 'high';
//   dueDate: Date;
// }
// step 3 is building the form to recieve the data from user and handele Controlled form to add new tasks.
 import type { TaskFormProps } from "../../types";
 import type { TaskStatus } from "../../types";
 import React, { useState } from 'react';

 export function TaskForm({id,title,description,status,priority,dueDate,onSubmit}:TaskFormProps){
   const [taskId,setTaskId] = useState<string>(id);
  const [taskTitle, setTitle] = useState<string>(title);
  const [taskDescription, setDescription] = useState<string>(description);
  const [taskStatus, setStatus] = useState<TaskStatus>(status);
  const [taskPriority, setPriority] = useState<"low"|"medium"|"high">(priority);
  const [taskDueDate,setDueDate]=useState<Date>(dueDate);

     const handleSelectSTatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value as TaskStatus);
  };
  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  onSubmit({
    id: taskId || Date.now().toString(), 
    title:taskTitle,
    description:taskDescription,
    status:taskStatus,
    priority:taskPriority,
    dueDate:taskDueDate,
  });
    setTitle("");
  setDescription("");
  setPriority("low");
  setStatus("Pending");
  setDueDate(new Date());
};
    return(
     <>
     <form className="p-3 border rounded d-flex align-items-end flex-wrap" onSubmit={handleSubmit}>
      <div className="me-2 mb-2">
      <label htmlFor="title" className="form-label">Title:</label>
      <input id="title" className="form-control" type="text" value={taskTitle} onChange={e => setTitle(e.target.value)} />
      </div>
     
      <div className="me-2 mb-2">
      <label htmlFor="description" className="form-label">Description:</label> 
  <textarea 
    className="form-control form-control-sm" 
    style={{ height: '38px', width: '200px' }} 
    value={taskDescription} 
    onChange={e => setDescription(e.target.value)}
  />
</div>

      <div className="me-2 mb-2">
      <label htmlFor="status" className="form-label">status:</label>
       <select className="form-select" id="status" value={taskStatus} onChange={handleSelectSTatusChange}>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      </div>
      <div className="me-2 mb-2">
      <label htmlFor="priority" className="form-label">Priority:</label>
      <select className="form-select" id="priority" value={taskPriority} onChange={e => setPriority(e.target.value as 'low'|'medium'|'high')}>
        <option value="low">low</option>
        <option value="medium">medium</option>
        <option value="high">high</option>
      </select>
      </div>
      <div className="me-2 mb-2">
      <label htmlFor="dueDtae" className="form-label">Due Date</label>
      <input className="form-control" id="dueDate" type="date" value={taskDueDate ? taskDueDate.toISOString().split('T')[0] : ''}onChange={e => setDueDate(new Date(e.target.value))}/>
      </div>
      <div className="mb-2">
      <button className="btn btn-primary" type="submit">Register</button>
      </div>
    </form>
     
     
     </>







    );
 }