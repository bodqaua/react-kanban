import {nanoid} from "nanoid";

export interface ColumnModel {
    id: string;
    title: string;
    position?: number;
}

export const initialColumn = {
    id: nanoid(),
    title: 'Test column'
};
