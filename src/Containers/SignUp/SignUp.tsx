import "./SignUp.css";
import { FC, useState } from "react";
import { Modal } from "../../Components/Modal/Modal";
import { useAuthContext } from "../../Context/auth-context";
import { Navigate, useNavigate } from "react-router-dom";

export const SignUp: FC = () => {
  const { login } = useAuthContext();
  const navigate = useNavigate()
  
  const loginHandler = () => {
    login("1")
    navigate("/search")
 }

  return (
    <div className="signup">
      <Modal onClose={() => navigate("/")}>
        <h1>Este es el modal de sign up<button onClick={loginHandler}>login</button></h1>
      </Modal>
      

    </div>
  );
};