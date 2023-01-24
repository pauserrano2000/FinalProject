import "./LogIn.css";
import { FC } from "react";
import { Modal } from "../../Components/Modal/Modal";
import { Form } from "../../Components/Form/Form";
import { useInput } from "../../Hooks/useInput";
import { useThemeContext } from "../../Context/theme-context";
import { useAuthContext } from "../../Context/auth-context";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../Hooks/useNotification";
import { Callout } from "../../Components/Callout/Callout";
import { ReactComponent as Logo } from "../../Assets/smallLogo.svg"
import { validateEmail, validatePassword } from "../../Services/validate";
import { getAuthToken } from "../../Services/apicalls";
import { IconLogin } from "../../Components/Icons/Icons";

export const LogIn: FC = () => {
  const { theme } = useThemeContext();
  const { login } = useAuthContext();
  const navigate = useNavigate();
  const { showSuccesNotification, showErrorNotification } = useNotification();

  const emailInput = useInput(validateEmail);
  const passwordInput = useInput(validatePassword);

  let formIsValid = false;
  if (emailInput.isValid && passwordInput.isValid) {
    formIsValid = true;
  }

  const loginHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const authToken = await getAuthToken(emailInput.value, passwordInput.value);
      if ((typeof authToken === 'string')) {
        showSuccesNotification({
          title: "Welcome to ImageHub",
          message: "Entering in a few seconds...",
          loading: true,
        });
        setTimeout(login, 3000, authToken);
        navigate("/search")
      } else {
        passwordInput.reset()
        showErrorNotification({
          title: authToken.errorTitle,
          message: authToken.errorMessage,
        });
      }
    } catch (error) {
      console.log(error);
      showErrorNotification({
        title: "The server is not working, http requests failing",
        message: "The admin should check this...",
      });
    }
  }

  return (
    <Modal onClose={() => navigate("/")}>
      <main className={`login ${theme}-login`}>
        <Logo className="login__small-logo" />
        <h1 className={`login__title ${theme}-login__title`}>
          Log in to ImageHub
        </h1>
        <Form onSubmit={loginHandler}>
          <Form.Input
            label="Email address"
            type="email"
            id="email"
            value={emailInput.value}
            onChange={emailInput.changeHandler}
            onBlur={emailInput.blurHandler}
            hasError={emailInput.hasError}
            errorText="E.g. example@example.com"
          />
          <Form.Input
            label="Password"
            type="password"
            id="password"
            value={passwordInput.value}
            onChange={passwordInput.changeHandler}
            onBlur={passwordInput.blurHandler}
            hasError={passwordInput.hasError}
            errorText="Include numbers and capital letters (8+ characters)"
          />
          <Form.Submit disabled={!formIsValid}>
            <IconLogin size={22} />
            Log in
          </Form.Submit>
        </Form>
        <Callout to="/signup" textLink="Create an account">
          New to ImageHub?
        </Callout>
      </main>
    </Modal >
  );
};