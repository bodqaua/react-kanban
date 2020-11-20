export interface TaskModel {
    id: number;
    name: string;
    description: string;
    position?: number;
    creationDate: Date;
    updateDate?: Date;
    alias: string;
    colId: number | string;
}