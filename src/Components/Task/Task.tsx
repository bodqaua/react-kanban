import React from "react";
import {TaskModel} from "../../Models/Tasks.model";
import './Task.css';
import {inject, observer} from "mobx-react";
import { useHistory } from "react-router-dom";


type TaskProps = {
    taskStore?: any;
    modalStore?: any;
    taskId: string;
}

const Task = ({taskStore, modalStore, taskId}: TaskProps) => {
    const history = useHistory();
    const task: TaskModel = taskStore.getTaskById(taskId);
    const openTask = () => {
        modalStore.toggleModal('ViewTaskModal', true, {task});
    }

    const showTask = () => {
        history.push(`${history.location.pathname}/${task.alias}`);
    }

    const editTask = () => {
        modalStore.toggleModal('EditTaskModal', true, task);
    }

    const deleteTask = () => {
        taskStore.deleteTask(task.id);
    }

    return (
        <div className={"task"}>
            <div className="task-actions">
                <i className="fa fa-eye"
                   aria-hidden="true"
                   onClick={() => showTask()}/>
                <i className="fa fa-trash"
                   aria-hidden="true"
                   onClick={() => deleteTask()}/>
                <i className="fa fa-pencil"
                   aria-hidden="true"
                   onClick={() => editTask()}/>

            </div>
            <div className="task-title"  onClick={() => openTask()}>{task.name}</div>
            <div className="task-description"  onClick={() => openTask()}>{task.description}</div>
        </div>)
}

export default inject((stores: any) => ({
    taskStore: stores.tasksStore,
    modalStore: stores.modalStore
}))(observer(Task))
