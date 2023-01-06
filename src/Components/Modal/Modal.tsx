import "./Modal.css";
import { createPortal } from 'react-dom';
import { FC, PropsWithChildren} from "react";
import { Backdrop } from './Backdrop/Backdrop';

type ModalProps = {
    onClose: () => void
}
export const Modal: FC<PropsWithChildren<ModalProps>> = ({ children, onClose }) => {

    const closeHandler = () => {
        onClose();
    };
    return (<>
        {createPortal(
            <Backdrop onClose={closeHandler} />,
            document.getElementById('backdrop-root')!
        )}
        {createPortal(
            <div className="modal">
                {children}
            </div>
            ,
            document.getElementById('modal-root')!
        )}
    </>);
};