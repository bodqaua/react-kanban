import {action, makeAutoObservable, observable} from "mobx";
import {getLocalStorage, setLocalStorage} from "../Services/localstorage";
import {TaskModel} from "../Models/Tasks.model";

class TasksStore {
    localStoragePrefix = 'tasks';
    localStorageKey = '';
    tasks = this.initialLoad();

    constructor() {
        makeAutoObservable(this, {
            tasks: observable,
            loadTasks: action,
            resortByColumn: action,
            newTask: action,
            createAndResort: action,
            deleteTask: action,
            updateTask: action,
            deleteByColumn: action,
        })
    }

    setKey(key: string): void {
        this.localStorageKey = `${this.localStoragePrefix}-${key}`;
        this.tasks = this.initialLoad();
    }

    newTask(task: TaskModel): void {
        this.tasks.push(task);
        this.updateLocalStorage();
    }

    initialLoad(): TaskModel[] {
        if (!this.localStorageKey) {
            return [];
        }
        const tasks = getLocalStorage(this.localStorageKey);
        if (!tasks) {
            setLocalStorage(this.localStorageKey, []);
            return [];
        }
        return tasks;
    }

    loadTasks(): void {
        this.tasks = getLocalStorage(this.localStorageKey);
    }

    getTasksByColumn(columnId: string): TaskModel[] {
        return this.tasks.filter((task: TaskModel) => task.colId === columnId);
    }

    getTaskById(id: string): TaskModel | undefined {
        return this.tasks.find((task: TaskModel) => task.id === id);
    }

    getTaskByProperty(property: any, propertyName: string): TaskModel | undefined {
        // @ts-ignore
        return this.tasks.find((task: TaskModel) => task[propertyName] === property)
    }

    getLastPosition(colId: string): number {
        const tasks = this.getTasksByColumn(colId);
        if (tasks.length) {
            return tasks[tasks.length - 1].position || 1;
        }
        return 0;
    }

    createAndResort(task: TaskModel, colId: string, position: number) {
        let tasks: TaskModel[] = this.getTasksByColumn(colId);
        task.colId = colId;
        tasks.splice(position, 0, task);
        this.removeWithColId(colId);
        tasks = this.resetIndexes(tasks);
        this.tasks = this.tasks.concat(tasks);
        this.updateLocalStorage();
    }

    resortByColumn(colId: string): void {
        let tasks = this.getTasksByColumn(colId);
        this.removeWithColId(colId);
        tasks = this.resetIndexes(tasks);
        this.tasks = this.tasks.concat(tasks);
        this.updateLocalStorage();
    }

    removeWithColId(colId: string): void {
        const ids = this.getTasksByColumn(colId).map((task: TaskModel) => task.id);
        ids.forEach((id) => {
            this.deleteTask(id, false)
        });
        this.updateLocalStorage();
    }

    resetIndexes(data: any[]): any[] {
        data = [...data];
        data.forEach((item, index) => {
            item.position = index + 1
        });
        return data;
    }

    deleteTask(id: string, isUpdate = true): void {
        const index = this.tasks.findIndex((searchTask: TaskModel) => searchTask.id === id);
        this.tasks.splice(index, 1);
        if (isUpdate) {
            this.updateLocalStorage();
        }
    }

    updateTask(task: TaskModel, id: string): void {
        const index = this.tasks.findIndex((searchTask: TaskModel) => searchTask.id === id);
        this.tasks[index] = task;
        this.updateLocalStorage();
    }

    deleteByColumn(columnId: string): void {
        const forDeleting = this.tasks.filter((task: TaskModel) => task.colId === columnId);
        forDeleting.forEach((task: TaskModel) => {
            this.deleteTask(task.id, false);
        })
        this.updateLocalStorage();
    }

    updateLocalStorage(): void {
        setLocalStorage(this.localStorageKey, this.tasks);
    }
}

const store = new TasksStore();
export default store;
