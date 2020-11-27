import React from "react";
import {inject, observer} from "mobx-react";
import {BoardModel} from "../../Models/Board.model";
import BoardLink from "./BoardLink";
import NewBoard from "../NewBoard/NewBoard";

type props = {
    boardStore?: any;
}

const BoardWrapper = ({boardStore}: props) => {
    const boards = boardStore.boards;
    return (
        <>
            <div className={"board-wrapper"}>
                {boards.map((board: BoardModel) => (
                    <BoardLink key={board.id} alias={board.alias} name={board.name}/>
                ))}
                <NewBoard/>
            </div>
        </>
    )
}

export default inject((stores: any) => ({
    boardStore: stores.boardStore
}))(observer(BoardWrapper));