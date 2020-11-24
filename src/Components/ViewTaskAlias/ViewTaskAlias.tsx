import React from "react";
import {inject, observer} from "mobx-react";
import {withRouter} from "react-router";
import moment from "moment";
import { useHistory } from "react-router-dom";

type props = {
    match?: any;
    taskStore?: any;
    columnStore?: any;
    history: any;
}

const ViewTaskAlias = ({match, taskStore, columnStore, history}: props) => {
    const task = taskStore.getTaskByProperty(match.params.id, 'alias');
    if (!task) {
        history.push('/');
        return null;
    }
    const column = columnStore.getColumnById(task.colId);

    const format = (date: Date): string => {
        return moment(date).format('YYYY-MM-DD HH:mm')
    }

    const deleteTask = () => {
        taskStore.deleteTask(task.id);
        history.push('/');
    }

    return (
        <>
            <div className="modal-title">
                Task: <b>{task.name}</b>
                <i className="fa fa-trash deleteTask"
                   aria-hidden="true"
                   onClick={() => deleteTask()}
                />
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
            </>
    )
}

export default inject((stores: any) => ({
    taskStore: stores.tasksStore,
    columnStore: stores.columnsStore
}))(observer(withRouter(ViewTaskAlias)));
