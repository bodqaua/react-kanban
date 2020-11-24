import React, {useState} from 'react';
import {inject, observer} from "mobx-react";
import {TextArea} from "../../Inputs/TextArea/TextArea";
import {Input} from "../../Inputs/Input";
import {TaskModel} from "../../../Models/Tasks.model";
import {nanoid} from "nanoid";

type props = {
    toggle: (bool: boolean) => void;
    data: any;
    taskStore?: any;
}

const NewTaskModal = ({taskStore, data, toggle}: props) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [alias, setAlias] = useState('');

    const createTask = () => {
        const task: TaskModel = {
            id: nanoid(),
            name: name,
            description: description,
            creationDate: new Date(),
            alias: alias,
            colId: data.columnId,
        }
        taskStore.newTask(task);
        toggle(false);
        taskStore.loadTasks();
    }

    return (
        <div>
            <div className="modal-title">
                New task modal
            </div>
            <div className="modal-body">
                <div>
                    <label>Name</label>
                    <div>
                        <Input
                            type="text"
                            value={name}
                            onChange={(event) => setName(event.target.value)}/>
                    </div>
                </div>
                <div>
                    <label>Description</label>
                    <div>
                        <TextArea value={description}
                                  onChange={(event) => setDescription(event.target.value)}/>
                    </div>
                </div>
                <div>
                    <label>Alias</label>
                    <div>
                        <Input type="text" value={alias}
                               onChange={(event) => setAlias(event.target.value)}/>
                    </div>
                </div>
            </div>
            <div className="modal-footer">
                <button className={"btn-secondary"} onClick={() => toggle(false)}>Cancel</button>
                <button className={"btn-primary"} onClick={() => createTask()}>Create</button>
            </div>
        </div>)
}

export default inject((stores: any) => ({
    taskStore: stores.tasksStore
}))(observer(NewTaskModal));
