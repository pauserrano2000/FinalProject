import "./LogIn.css";
import { FC } from "react";
import { Modal } from "../../Components/Modal/Modal";
import { Form } from "../../Components/Form/Form";
import { useInput } from "../../Hooks/useInput";
import { useThemeContext } from "../../Context/theme-context";
import { useAuthContext } from "../../Context/auth-context";
import { useNavigate } from "react-router-dom";
import { Callout } from "../../Components/Callout/Callout";
import { ReactComponent as Logo } from "../../Assets/smallLogo.svg"
import { validateEmail, validatePassword } from "../../Services/validate";

export const LogIn: FC = () => {
  const { Theme } = useThemeContext();
  const { login } = useAuthContext();
  const navigate = useNavigate()

  const emailInput = useInput(validateEmail);
  const passwordInput = useInput(validatePassword);

  const loginHandler = () => {
    login("1")
    navigate("/search")
  }

  let formIsValid = false;
  if (emailInput.isValid && passwordInput.isValid) {
    formIsValid = true;
  }

  return (
    <div className="login">
      <Modal onClose={() => navigate("/")}>
        <div className={`login-modal ${Theme}-login-modal`}>
          <Logo className={`small-logo ${Theme}-small-logo`} />
          <h1 className={`login-title ${Theme}-login-title`}>
            Log in to ImageHub
          </h1>
          <Form>
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
              onSubmit={loginHandler}
              disabled={!formIsValid}
              text="Sign in"
            />
          </Form>
          <Callout to="/signup" textLink="Create an account">
            New to ImageHub?
          </Callout>
        </div>
      </Modal >
    </div>

  );
};