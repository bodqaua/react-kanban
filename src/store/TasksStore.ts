import {action, makeAutoObservable, observable} from "mobx";
import {getLocalStorage, setLocalStorage} from "../Services/localstorage";
import {initialTask, TaskModel} from "../Models/Tasks.model";
import {nanoid} from "nanoid";
import Task from "../Components/Task/Task";

class TasksStore {
    localStorageKey = 'tasks';
    tasks = this.initialLoad();

    constructor() {
        makeAutoObservable(this, {
            tasks: observable,
            loadTasks: action
        })
    }

    newTask(task: TaskModel): void {
        this.tasks.push(task);
        this.updateLocalStorage();
    }

    initialLoad(): TaskModel[] {
        return getLocalStorage(this.localStorageKey);
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
