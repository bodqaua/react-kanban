import React, {useEffect, useState} from "react";
import './EditTaskModal.css';
import {TextArea} from "../Inputs/TextArea/TextArea";
import {TaskModel} from "../../Models/Tasks.model";
import {useLocalStorage} from "../../Hooks/LocalStorage";

type EditTaskModalProps = {
    isOpen: boolean;
    toggle: (bool: boolean) => void;
    task: TaskModel
}


export const EditTaskModal = ({isOpen, toggle, task}: EditTaskModalProps) => {
    const [tasks, setTasks] = useLocalStorage('tasks', []);
    const [value, setValue] = useState("");

    useEffect(() => {
        setValue(task.description);
    }, [task])

    useEffect(() => {
        if (isOpen) {
            toggle(false);
        }
    }, [tasks])

    const toggleChange = (bool: boolean): void => {
        toggle(bool);
    }

    const submit = () => {
        const index = tasks.findIndex((item: TaskModel) => item.id === task.id);
        const clone = [...tasks];
        clone[index].description = value;
        setTasks(clone);
    }

    return (
        <>
            {isOpen &&
            <div className={"modal-backdrop"}>
                <div className="modal">
                    <div className="modal-title">
                        Edit task modal
                    </div>
                    <div className="modal-body">
                        <TextArea value={value} onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => setValue(event.target.value)} />
                    </div>
                    <div className="modal-footer">
                        <button className={"btn-secondary"} onClick={() => {toggleChange(false)}}>Cancel</button>
                        <button className={"btn-primary"} onClick={() => {submit()}}>Submit</button>
                    </div>
                </div>
            </div>}
        </>);
}