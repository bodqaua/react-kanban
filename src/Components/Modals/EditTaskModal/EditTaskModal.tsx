import React, {useState} from "react";
import './EditTaskModal.css';
import {TextArea} from "../../Inputs/TextArea/TextArea";
import {inject, observer} from "mobx-react";
import {TaskModel} from "../../../Models/Tasks.model";

type EditTaskModalProps = {
    toggle: (bool: boolean) => void;
    data?: any;
    tasksStore?: any;
}


const EditTaskModal = ({toggle, data, tasksStore}: EditTaskModalProps) => {
    const [value, setValue] = useState(data.description);
    const toggleChange = (bool: boolean): void => {
        toggle(bool);
    }

    const submit = () => {
        const task: TaskModel = {...data};
        task.description = value;
        tasksStore.updateTask(task, task.id);
        toggle(false);
    }

    return (
        <>
            <div className="modal-title">
                Edit task modal
            </div>
            <div className="modal-body">
                <TextArea value={value}
                          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => setValue(event.target.value)}/>
            </div>
            <div className="modal-footer">
                <button className={"btn-secondary"} onClick={() => {
                    toggleChange(false)
                }}>Cancel
                </button>
                <button className={"btn-primary"} onClick={() => {
                    submit()
                }}>Submit
                </button>
            </div>
        </>)
}

export default inject((stores: any) => ({
    tasksStore: stores.tasksStore
}))(observer(EditTaskModal))
