import React from "react";
import {ModalModel} from "../../Models/ModalModel";
import {inject, observer} from "mobx-react";
import {ModalsList} from "./ModalsList";

type props = {
    modalStore?: any
}


const ModalContainer = ({modalStore}: props) => {
    let modals: ModalModel[] = [];
    if (modalStore) {
        modals = modalStore.modals;
    }

    const toggleModal = (modalName: string): void => {
        modalStore.toggleModal(modalName, false);
    }
    return (
        <div className={'ModalContainer'}>
            {modals.map((modal: ModalModel) => {
                if (modal.isOpen) {
                    const Component = ModalsList[modal.modalName];
                    const data = modal.data;
                    return (
                        <div className={"modal-backdrop"} key={modal.modalName} >
                            <div className={`modal ${modal.modalName}`}>
                                <Component data={data} toggle={() => toggleModal(modal.modalName)}/>
                            </div>
                        </div>)
                }

                return (<React.Fragment key={modal.modalName}/>);
            })}
        </div>
    )
}

export default inject((stores: any) => ({modalStore: stores.modalStore}))(observer(ModalContainer))
