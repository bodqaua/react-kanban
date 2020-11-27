import React from "react";
import {Link} from "react-router-dom";
import {inject, observer} from "mobx-react";

type props = {
    alias: string;
    name: string;
    boardStore?: any;
    modalStore?: any;
}

const BoardLink = ({alias, name, boardStore, modalStore}: props) => {
    const board = boardStore.getByAlias(alias);
    const deleteBoard = () => {
        boardStore.removeBoardByProperty('alias', alias);
    }

    const editBoard = () => {
        if (!board) {
            return;
        }
        modalStore.toggleModal('EditBoardModal', true, {board});
    }
    return (
        <div className={"board-link"}>
            <Link to={`/${alias}`}>{name}</Link>
            <i className="fa fa-pencil"
               aria-hidden="true"
               onClick={() => editBoard()}
            />
            <i className="fa fa-trash"
               aria-hidden="true"
               onClick={() => deleteBoard()}
            />
        </div>)
}

export default inject((stores: any) => ({
    boardStore: stores.boardStore,
    modalStore: stores.modalStore
}))(observer(BoardLink));