import {makeAutoObservable} from "mobx";
import {BoardModel} from "../Models/Board.model";
import {getLocalStorage, setLocalStorage} from "../Services/localstorage";
import {nanoid} from "nanoid";

class BoardStore {
    boards: BoardModel[] = [];
    storageKey = 'boards';
    constructor() {
        makeAutoObservable(this, {});
        this.initBoards();
    }

    initBoards():void {
        this.boards = getLocalStorage(this.storageKey);
        if (!this.boards) {
            setLocalStorage(this.storageKey, [{id: nanoid(), name: "Board1", alias: 'board1'}]);
            this.boards = [];
        }
    }

    checkIsExists(alias: string): boolean {
        return !!this.boards.find((board: BoardModel) => board.alias === alias);
    }

    getByAlias(alias: string): BoardModel | undefined {
        return this.boards.find((board: BoardModel) => board.alias === alias);
    }

}

const store = new BoardStore();
export default store;