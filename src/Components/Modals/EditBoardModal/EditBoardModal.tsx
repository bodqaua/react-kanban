import React, {useState} from 'react';
import {inject, observer} from "mobx-react";
import {Input} from "../../Inputs/Input";
import {BoardModel} from "../../../Models/Board.model";

type props = {
    toggle: (bool: boolean) => void;
    data?: any;
    boardStore?: any;
}

const EditBoardModal = ({toggle, data, boardStore}: props) => {
    const dataBoard: BoardModel = data.board;
    const [name, setName] = useState(dataBoard.name);
    const [alias, setAlias] = useState(dataBoard.name);
    if (!data.board) {
        toggle(false);
        return (<></>);
    }


    const submit = () => {
        const board: BoardModel = {
            id: data.board.id,
            name,
            alias
        }
        boardStore.editBoard(board);
        toggle(false);
    }

    return (
        <div>
            <div className="modal-title">
                Edit Board <b>{dataBoard.name}</b>
            </div>
            <div className="modal-body">
                <div>
                    <label>Name</label>
                    <Input placeholder={"Name"}
                           value={name}
                           onChange={(event) => setName(event.target.value)}
                    />
                </div>
                <div>
                    <label>Alias</label>
                    <Input placeholder={"alias"}
                           type={"text"}
                           value={alias}
                           onChange={(event) => setAlias(event.target.value)}/>
                </div>
            </div>
            <div className="modal-footer">
                <button className={"btn-secondary"} onClick={() => {
                    toggle(false);
                }}>Cancel
                </button>
                <button className={"btn-primary"} onClick={() => {
                    submit()
                }}>Submit
                </button>
            </div>
        </div>
    )
}

export default inject((stores: any) => ({
    boardStore: stores.boardStore
}))(observer(EditBoardModal));