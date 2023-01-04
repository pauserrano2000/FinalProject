import "./Backdrop.css";
import { FC } from "react";

type BackdropProps = {
    onClose: () => void
}
export const Backdrop: FC<BackdropProps>  = ({onClose}) => {
    return <div className="backdrop" onClick={onClose} />;
  };