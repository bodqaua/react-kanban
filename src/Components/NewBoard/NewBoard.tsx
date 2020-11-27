import React, {useState} from "react";
import {inject, observer} from "mobx-react";
import "./NewBoard.css";
import {BoardModel} from "../../Models/Board.model";
import {nanoid} from "nanoid";

type props = {
    boardStore?: any;
}

const NewBoard = ({boardStore}: props) => {
    const [name, setName] = useState('');
    const [alias, setAlias] = useState('');

    const addNewBoard = () => {
        const board: BoardModel = {
            id: nanoid(),
            name,
            alias
        };
        boardStore.newBoard(board);
        setName("");
        setAlias("");
    }

    return (
        <div className={"new-board-form"}>
            <div className={"new-board-field"}>
                <input type="text"
                       placeholder={"Board Name"}
                       value={name}
                       onChange={(event) => setName(event.target.value)}/>
            </div>
            <div className={"new-board-field"}>
                <input type="text"
                       placeholder={"Board Alias"}
                       value={alias}
                       onChange={(event) => setAlias(event.target.value)}/>
            </div>
            <button onClick={() => {addNewBoard()}}>Add</button>
        </div>
    )
}

export default inject((stores: any) => ({
    boardStore: stores.boardStore
}))(observer(NewBoard));