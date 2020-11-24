import React, {useState} from 'react';
import {ColumnModel} from "../../Models/Column.model";
import Column from "../Column/Column";
import './Board.css';
import {inject, observer} from "mobx-react";
import {Input} from "../Inputs/Input";
import {nanoid} from "nanoid";

type props = {
    columnStore?: any
}

const Board = ({columnStore}: props) => {
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

    return (
        <>
            <div className={"board"}>
                {columns.map((column: ColumnModel) => (
                    <Column key={column.id} columnId={column.id}/>
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
        </>
    )
}

export default inject((stores: any) => ({columnStore: stores.columnsStore}))(observer(Board));
