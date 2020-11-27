import React, {useEffect, useState} from 'react';
import {ColumnModel} from "../../Models/Column.model";
import Column from "../Column/Column";
import './Board.css';
import {inject, observer} from "mobx-react";
import {Input} from "../Inputs/Input";
import {nanoid} from "nanoid";
import {DragDropContext, Droppable} from 'react-beautiful-dnd';
import {TaskModel} from "../../Models/Tasks.model";
import {BrowserRouter as Router, Route, Switch, useHistory, useParams} from 'react-router-dom';
import ViewTaskAlias from "../ViewTaskAlias/ViewTaskAlias";

type props = {
    columnStore?: any;
    taskStore?: any;
    boardStore?: any;
}

const Board = ({columnStore, taskStore, boardStore}: props) => {
    const params: { id: any } = useParams();
    const board = boardStore.getByAlias(params.id);
    const history = useHistory()
    if (!boardStore.checkIsExists(params.id)) {
        history.push('/');
        params.id = null;
    }
    useEffect(() => {
        if (params.id) {
            columnStore.setKey(board.id);
            taskStore.setKey(board.id)
        }

    }, [params])

    const [isNew, setIsNew] = useState(false);
    const [newColumnName, setNewColumnName] = useState('');
    const columns = columnStore.columns;
    const newColumn = () => {
        const column: ColumnModel = {
            id: nanoid(),
            title: newColumnName
        };
        columnStore.newColumn(column);
        setNewColumnName("");
        setIsNew(false);
    }

    const onDragEnd = (result: any) => {
        const {source, destination} = result;
        if (!destination) {
            return;
        }

        const tasks = [...taskStore.getTasksByColumn(source.droppableId)];
        const fromIndex = tasks.findIndex((task: TaskModel) => task.position === source.index + 1);

        taskStore.deleteTask(tasks[fromIndex].id);
        taskStore.createAndResort(tasks[fromIndex], destination.droppableId, destination.index);
        taskStore.resortByColumn(source.droppableId);
    }

    return (
        <>
            <Router>
                <Switch>
                    <Route path="/:colId/:taskId">
                        <ViewTaskAlias/>
                    </Route>
                    <Route path="">
                        <DragDropContext onDragEnd={onDragEnd}>
                            <div className={"board"}>
                                {columns.map((column: ColumnModel) => (
                                    <Droppable droppableId={column.id.toString()}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}>
                                                <Column key={column.id} columnId={column.id}/>
                                            </div>)}
                                    </Droppable>
                                ))}
                                {isNew && <div className={"new-column"}>
                                    <Input value={newColumnName}
                                           enterDown={newColumn}
                                           onChange={(event) => setNewColumnName(event.target.value)}/>
                                </div>}
                                {!isNew && <div className="new-column" onClick={() => setIsNew(true)}>
                                    <p><i className="fa fa-plus" aria-hidden="true"/>New column</p>
                                </div>}
                            </div>
                        </DragDropContext>
                    </Route>
                </Switch>
            </Router>
        </>
    )
}

export default inject((stores: any) => ({
    columnStore: stores.columnsStore,
    taskStore: stores.tasksStore,
    boardStore: stores.boardStore
}))(observer(Board));
