import React from "react";
import {TaskModel} from "../../../Models/Tasks.model";
import {inject, observer} from "mobx-react";
import {ColumnModel} from "../../../Models/Column.model";
import moment from 'moment';

type props = {
    columnStore?: any;
    data?: any;
    toggle: (bool: boolean) => void;
}

const ViewTaskModal = ({columnStore, data, toggle}: props) => {
    if (!data) {
        toggle(false);
    }
    const task: TaskModel = data.task;
    const column: ColumnModel = columnStore.getColumnById(task.colId);

    const format = (date: Date): string => {
        return moment(date).format('YYYY-MM-DD HH:mm')
    }
    return (
        <div>
            <div className="modal-title">
                Task: <b>{task.name}</b>
            </div>
            <div className="modal-body">
                <div className={"d-flex sb"}>
                    <span>Column: <b>{column.title}</b></span>
                    <span>Alias: <b>{task.alias}</b></span>
                </div>
                <div>
                    <p className={"text-secondary description"}>
                        {task.description}
                    </p>
                </div>
                <div className={"view-task-dates"}>
                    <p>Creation date: <span className="text-danger">{format(task.creationDate)}</span></p>
                    <p>Last updated: <span className="text-danger">{task.updateDate ? task.updateDate : 'Never changed'}</span></p>
                </div>
            </div>
            <div className="modal-footer">
                <button className={"btn-primary"} onClick={() => toggle(false)}>close</button>
            </div>
        </div>)
}

export default inject((stores: any) => ({
    columnStore: stores.columnsStore
}))(observer(ViewTaskModal));
