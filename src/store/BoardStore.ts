import {makeAutoObservable} from "mobx";
import {BoardModel} from "../Models/Board.model";
import {getLocalStorage, removeLocalStorage, setLocalStorage} from "../Services/localstorage";

class BoardStore {
    boards: BoardModel[] = [];
    storageKey = 'boards';

    constructor() {
        makeAutoObservable(this, {});
        this.initBoards();
    }

    initBoards(): void {
        this.boards = getLocalStorage(this.storageKey);
        if (!this.boards) {
            setLocalStorage(this.storageKey, []);
            this.boards = [];
        }
    }

    newBoard(board: BoardModel): void {
        this.boards.push(board);
        this.updateLocalStorage();
    }

    editBoard(board: BoardModel, id?: string) {
        if (id === undefined) {
            id = board.id;
        }

        const index = this.boards.findIndex((item: BoardModel) => item.id === id);
        if (index === -1) {
            return;
        }
        this.boards[index] = board;
        this.updateLocalStorage();
    }

    checkIsExists(alias: string): boolean {
        return !!this.boards.find((board: BoardModel) => board.alias === alias);
    }

    getByAlias(alias: string): BoardModel | undefined {
        return this.boards.find((board: BoardModel) => board.alias === alias);
    }

    removeBoardByProperty(property: string, value: any): void {
        const index = this.boards.findIndex((board: any) => board[property] === value);
        if (index === -1) {
            return;
        }
        const id = this.boards[index].id;
        removeLocalStorage(`columns-${id}`);
        removeLocalStorage(`tasks-${id}`);
        this.boards.splice(index, 1);
        this.updateLocalStorage();
    }

    private updateLocalStorage() {
        setLocalStorage(this.storageKey, this.boards);
    }
}

const store = new BoardStore();
export default store;