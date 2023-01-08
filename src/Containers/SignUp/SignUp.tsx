import "./SignUp.css";
import { FC, useState } from "react";
import { Modal } from "../../Components/Modal/Modal";
import { Form } from "../../Components/Form/Form";
import { useInput } from "../../Hooks/useInput";
import { useThemeContext } from "../../Context/theme-context";
import { useAuthContext } from "../../Context/auth-context";
import { useNavigate } from "react-router-dom";
import { showNotification } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons';
import { Callout } from "../../Components/Callout/Callout";
import { ReactComponent as Logo } from "../../Assets/smallLogo.svg"
import { validateName, validateEmail, validatePassword } from "../../Services/validate";

export const SignUp: FC = () => {
  const { Theme } = useThemeContext();
  const { login } = useAuthContext();
  const navigate = useNavigate()

  const firstNameInput = useInput(validateName);
  const lastNameInput = useInput(validateName);
  const emailInput = useInput(validateEmail);
  const passwordInput = useInput(validatePassword);

  const signupHandler = () => {
    showNotification({
      color: 'green',
      icon: <IconCheck />,
      title: 'Account succesfully created',
      message: 'You are able to log in now',
      autoClose: 5000,
    })
    navigate("/search")
  }

  let formIsValid = false;
  if (firstNameInput.isValid && lastNameInput.isValid && emailInput.isValid && passwordInput.isValid) {
    formIsValid = true;
  }


  return (
    <Modal onClose={() => navigate("/")}>
      <main className={`signup-modal ${Theme}-signup-modal`}>
        <Logo className="small-logo" />
        <h1 className={`signup-title ${Theme}-signup-title`}>
          Sign up to ImageHub
        </h1>
        <Form>
          <Form.Input
            label="First name"
            type="text"
            id="first"
            value={firstNameInput.value}
            onChange={firstNameInput.ChangeHandler}
            onBlur={firstNameInput.BlurHandler}
            hasError={firstNameInput.hasError}
            errorText="Numbers and some special characters not allowed"
          />
          <Form.Input
            label="Last name"
            type="text"
            id="last"
            value={lastNameInput.value}
            onChange={lastNameInput.ChangeHandler}
            onBlur={lastNameInput.BlurHandler}
            hasError={lastNameInput.hasError}
            errorText="Numbers and some special characters not allowed"
          />
          <Form.Input
            label="Email address"
            type="email"
            id="email"
            value={emailInput.value}
            onChange={emailInput.ChangeHandler}
            onBlur={emailInput.BlurHandler}
            hasError={emailInput.hasError}
            errorText="E.g. example@example.com"
          />
          <Form.Input
            label="Password"
            type="password"
            id="password"
            value={passwordInput.value}
            onChange={passwordInput.ChangeHandler}
            onBlur={passwordInput.BlurHandler}
            hasError={passwordInput.hasError}
            errorText="At least 8 characters, with numbers, lowercase and uppercase letters"
          />
          <Form.Submit
            onSubmit={signupHandler}
            disabled={!formIsValid}
            text="Sign up"
          />
        </Form>
        <Callout to="/login" textLink="Log in">
          Already have an account?
        </Callout>
      </main>
    </Modal >



  );
};