import "./LogIn.css";
import { FC, useState } from "react";
import { Modal } from "../../Components/Modal/Modal";
import { useAuthContext } from "../../Context/auth-context";
import { Navigate, useNavigate } from "react-router-dom";

export const LogIn: FC = () => {
  const { login } = useAuthContext();
  const navigate = useNavigate()

  const loginHandler = () => {
    login("1")
    navigate("/search")
 }
  return (
    <div className="login">
      <Modal onClose={() => navigate("/")}>
        <h1>Este es el modal de log in<button onClick={loginHandler}>login</button></h1>
      </Modal>
      

    </div>
  );
};