import {action, makeAutoObservable, observable, computed} from 'mobx';
import {getLocalStorage, setLocalStorage} from "../Services/localstorage";
import {ColumnModel} from "../Models/Column.model";
import taskStore from './TasksStore';

class ColumnStore {
    localstoragePrefix = 'columns';
    localstorageKey = '';
    columns = this.initialLoad();

    constructor() {
        makeAutoObservable(this, {
            columns: observable,
            loadColumns: action,
            getColumnById: action
        });
    }

    setKey(key: string): void {
        this.localstorageKey = `${this.localstoragePrefix}-${key}`;
        this.columns = this.initialLoad();
    }

    newColumn(column: ColumnModel): void {
        this.columns.push(column);
        this.updateLocalStorage();
    }

    deleteColumn(columnId: string): void {
        const index = this.columns.findIndex((column: ColumnModel) => column.id === columnId);
        this.columns.splice(index, 1);
        taskStore.deleteByColumn(columnId);
        this.updateLocalStorage();
    }

    initialLoad(): ColumnModel[] {
        if (!this.localstorageKey) {
            return [];
        }
        const columns = getLocalStorage(this.localstorageKey);
        if (!columns) {
            setLocalStorage(this.localstorageKey, []);
            return [];
        }
        return columns;
    }

    loadColumns(): void {
        this.columns = getLocalStorage(this.localstorageKey);
    }

    getColumnById(columnId: string): ColumnModel | undefined {
        return this.columns.find((column: ColumnModel) => column.id === columnId);
    }

    updateColumn(column: ColumnModel, id?: string): void {
        id = id ? id : column.id;
        const index = this.columns.findIndex((column: ColumnModel) => column.id === id);
        this.columns[index] = column;
        this.updateLocalStorage();
    }

    updateLocalStorage() {
        setLocalStorage(this.localstorageKey, this.columns);
    }
}

const store = new ColumnStore();
export default store;
