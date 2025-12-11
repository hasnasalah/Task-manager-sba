

import React, { useState } from 'react';
import type {TaskFilterProps} from "../../types/index";
import type {TaskStatus} from "../../types/index";


export function TaskFilter({onFilterChange,search}:TaskFilterProps){
    const[taskSearch,setSearch]=useState<string>(search);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value as TaskStatus;
    onFilterChange({status});
  };

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const priority = e.target.value as 'low' | 'medium' | 'high' ;
    onFilterChange({ priority });
  };
  const handeleSearch=(e:React.ChangeEvent<HTMLInputElement>)=>{
    const value= e.target.value;
    setSearch(value)
    onFilterChange({search:value});
  };

    return(
      <div className="p-3 border rounded d-flex flex-wrap align-items-end gap-3 mb-3"> 
       <div className="d-flex flex-column">
        <label className="form-label mb-1">Search</label>
        <input type="text" value={taskSearch} onChange={handeleSearch} placeholder='Seach for Task'/>
        </div>
         <div className="d-flex flex-column">
        <label className="form-label mb-1"> Status</label>
      <select className="form-select form-select-sm" onChange={handleStatusChange} >
        <option  value="">All Status</option>
        <option  value="Pending">Pending</option>
        <option  value="In Progress">In Progress</option>
        <option  value="Completed">Completed</option>
      </select>
      </div>
      <div className="d-flex flex-column">
      <label className="form-label mb-1">Priority</label>
      <select className="form-select form-select-sm" onChange={handlePriorityChange}>
        <option value="">All Priority</option>
        <option value="low">low</option>
        <option value="medium">medium</option>
        <option value="high">high</option>
      </select>
    </div>
    </div>
  );
}




