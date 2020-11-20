import React, {useState} from "react";
import {ColumnModel} from "../../Models/Column.model";
import './Column.css';
import {Task} from "../Task/Task";
import {TaskModel} from "../../Models/Tasks.model";
import {useLocalStorage} from "../../Hooks/LocalStorage";
import {EditTaskModal} from "../EditTaskModal/EditTaskModal";

type ColumnProps = {
    column: ColumnModel
}

export const Column = ({column}: ColumnProps) => {
    const [tasks]: any = useLocalStorage("tasks", []);
    const [task, setTask]: any = useState({});
    const [isOpen, toggleOpen] = useState(false);

    console.log(tasks);

    const filterTasks = (tasks: TaskModel[], colId: number): TaskModel[] => {
        return tasks.filter((task: TaskModel) => task.colId === colId);
    }
    const taskForMap = filterTasks(tasks, column.id);

    const openTask = (task: TaskModel) => {
        setTask(task);
        toggleOpen(true);
    }
    return (
        <>
            <div className={"column-wrapper"}>
                <div className="column-body">
                    <div className="column-title">{column.title}</div>
                    <div className="tasks-wrapper">
                        {taskForMap.map((task: TaskModel) => (
                            <Task key={task.id} task={task} handleClick={openTask}/>
                        ))}
                    </div>
                </div>
            </div>
            <EditTaskModal task={task} isOpen={isOpen} toggle={(boolean) => toggleOpen(boolean)}/>
        </>
    );
}