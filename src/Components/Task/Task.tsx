import React from "react";
import {TaskModel} from "../../Models/Tasks.model";
import './Task.css';

type TaskProps = {
    task: TaskModel;
    handleClick: (task: TaskModel) => void
}

export const Task = ({task, handleClick}: TaskProps) => {
    return (
        <div className={"task"} onClick={() => handleClick(task)}>
            <div className="task-title">{task?.name}</div>
            <div className="task-description">{task?.description}</div>
        </div>)
}