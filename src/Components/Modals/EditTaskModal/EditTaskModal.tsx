import React, {useState} from "react";
import './EditTaskModal.css';
import {TextArea} from "../../Inputs/TextArea/TextArea";
import {inject, observer} from "mobx-react";
import {TaskModel} from "../../../Models/Tasks.model";
import {Input} from "../../Inputs/Input";

type EditTaskModalProps = {
    toggle: (bool: boolean) => void;
    data?: any;
    tasksStore?: any;
}


const EditTaskModal = ({toggle, data, tasksStore}: EditTaskModalProps) => {
    const [value, setValue] = useState(data.description);
    const [name, setName] = useState(data.name);
    const [alias, setAlias] = useState(data.alias);
    const toggleChange = (bool: boolean): void => {
        toggle(bool);
    }

    const submit = () => {
        const task: TaskModel = {...data};
        task.description = value as string;
        task.name = name as string;
        task.alias = alias as string;
        tasksStore.updateTask(task, task.id);
        toggle(false);
    }

    return (
        <>
            <div className="modal-title">
                Edit task modal
            </div>
            <div className="modal-body">
                <div>
                    <label>Name</label>
                    <Input placeholder={"Name"}
                           value={name}
                           onChange={(event) => setName(event.target.value)}
                    />
                </div>
                <div>
                    <label>Description</label>
                    <TextArea value={value}
                              onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => setValue(event.target.value)}
                    />
                </div>
                <div>
                    <label>Alias</label>
                    <Input placeholder={"alias"}
                           type={"text"}
                           value={alias}
                           onChange={(event) => setAlias(event.target.value)}/>
                </div>
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
