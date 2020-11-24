import React, {useState} from "react";
import './Column.css';
import {inject, observer} from "mobx-react";
import Task from "../Task/Task";
import {TaskModel} from "../../Models/Tasks.model";
import {ColumnModel} from "../../Models/Column.model";
import {Input} from "../Inputs/Input";

type ColumnProps = {
    taskStore?: any,
    columnStore?: any,
    modalStore?: any,
    columnId: string
}

const Column = ({taskStore, columnStore, modalStore, columnId}: ColumnProps) => {
    const tasks: TaskModel[] = taskStore.getTasksByColumn(columnId);
    const column: ColumnModel = columnStore.getColumnById(columnId);

    const [columnName, setColumnName] = useState(column.title);
    const [editing, setEditing] = useState(false);

    const openNewTask = () => {
        modalStore.toggleModal('NewTaskModal', true, {columnId});
    }

    const deleteColumn = () => {
        columnStore.deleteColumn(columnId);
    }

    const changeColumnName = () => {
        const clone = {...column};
        clone.title = columnName;
        columnStore.updateColumn(clone);
        setEditing(false);
    }

    return (
        <>
            <div className={"column-wrapper"}>
                <div className="column-body">
                    <div className="column-title">
                        {editing && <Input value={columnName}
                                           onChange={(event) => setColumnName(event.target.value)}
                                           enterDown={changeColumnName}

                        />}
                        {!editing && <span onDoubleClickCapture={() => setEditing(true)}>{column.title}</span>}
                        <div className="add-new-task">
                            <i className="fa fa-trash"
                               aria-hidden="true"
                               onClick={() => deleteColumn()}
                            />
                            <i className="fa fa-plus"
                               aria-hidden="true"
                               onClick={() => openNewTask()}
                            />
                        </div>
                    </div>
                    <div className="tasks-wrapper">
                        {tasks.map((task: TaskModel) => (
                            <Task key={task.id} taskId={task.id}/>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default inject((stores: any) => ({
    taskStore: stores.tasksStore,
    columnStore: stores.columnsStore,
    modalStore: stores.modalStore
}))(observer(Column));
