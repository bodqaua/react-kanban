import {action, makeAutoObservable, observable} from "mobx";
import {ModalModel} from "../Models/ModalModel";

class ModalStore {
    modals: ModalModel[] = [
        {modalName: 'EditTaskModal', data: {}, isOpen: false},
        {modalName: 'NewTaskModal', data: {}, isOpen: false},
        {modalName: 'ViewTaskModal', data: {}, isOpen: false},
    ]
    constructor() {
        makeAutoObservable(this, {
            modals: observable,
            toggleModal: action,
            closeAll: action
        })
    }

    toggleModal(modalName: string, isOpen: boolean, data: any = {}): void {
        const index = this.modals.findIndex((modal: ModalModel) => modal.modalName === modalName);
        this.modals[index].data = isOpen ? data : {};
        this.modals[index].isOpen = isOpen;
    }

    closeAll() {
        this.modals.forEach((modal: ModalModel) => {modal.isOpen = true});
    }
}

const store = new ModalStore();
export default store;
