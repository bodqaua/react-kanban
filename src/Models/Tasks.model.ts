import {nanoid} from "nanoid";

export interface TaskModel {
    id: string;
    name: string;
    description: string;
    position?: number;
    creationDate: Date;
    updateDate?: Date;
    alias: string;
    colId: number | string;
}

export const initialTask: TaskModel = {
    id: nanoid(),
    name: `Task ${nanoid()}`,
    description: `lorem ipsum ${nanoid()}`,
    creationDate: new Date(),
    alias: nanoid(),
    colId: 1,
};
