import React from 'react';
import {ColumnModel} from "../../Models/Column.model";
import {Column} from "../Column/Column";
import {useLocalStorage} from "../../Hooks/LocalStorage";
import './Board.css';

export const Board = () => {
    const [columns] = useLocalStorage("columns", []);

    return (
        <>
            <div className={"board"}>
                {columns.map((column: ColumnModel) => (
                    <Column key={column.id} column={column}/>
                ))}
            </div>
        </>
    )
}
