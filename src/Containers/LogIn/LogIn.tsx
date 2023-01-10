import "./LogIn.css";
import { FC } from "react";
import { Modal } from "../../Components/Modal/Modal";
import { Form } from "../../Components/Form/Form";
import { useInput } from "../../Hooks/useInput";
import { useThemeContext } from "../../Context/theme-context";
import { useAuthContext } from "../../Context/auth-context";
import { useUserContext } from "../../Context/user-context";
import { useNavigate } from "react-router-dom";
import { showNotification } from '@mantine/notifications';
import { IconX } from '@tabler/icons';
import { Callout } from "../../Components/Callout/Callout";
import { ReactComponent as Logo } from "../../Assets/smallLogo.svg"
import { validateEmail, validatePassword } from "../../Services/validate";
import { getAuthToken } from "../../Services/apicalls";

export const LogIn: FC = () => {
  const { Theme } = useThemeContext();
  const { login } = useAuthContext();
  const { fetchUserData } = useUserContext();
  const navigate = useNavigate()

  const emailInput = useInput(validateEmail);
  const passwordInput = useInput(validatePassword);

  const loginHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const authToken = await getAuthToken(emailInput.value, passwordInput.value);
    if (authToken) {
      fetchUserData(authToken);
      login(authToken);
      navigate("/search")
    }
    else {
      emailInput.reset()
      passwordInput.reset()
      showNotification({
        title: "The introduced credentials are not correct",
        message: "Check again that the email exists on our database or that the password is correct",
        color: "red",
        autoClose: 5000,
        icon: <IconX  />,
        styles: (theme) => ({
          root: { backgroundColor: theme.colors.red[5], borderColor: theme.colors.red[5] },
          title: { color: theme.white },
          description: { color: theme.white },
        }),
      })
    }
  }

  let formIsValid = false;
  if (emailInput.isValid && passwordInput.isValid) {
    formIsValid = true;
  }

  return (
    <Modal onClose={() => navigate("/")}>
      <main className={`login-modal ${Theme}-login-modal`}>
        <Logo className="small-logo" />
        <h1 className={`login-title ${Theme}-login-title`}>
          Log in to ImageHub
        </h1>
        <Form onSubmit={loginHandler}>
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
            errorText="Include numbers and capital letters (8+ characters)"
          />
          <Form.Submit
            disabled={!formIsValid}
            text="Log in"
          />
        </Form>
        <Callout to="/signup" textLink="Create an account">
          New to ImageHub?
        </Callout>
      </main>
    </Modal >
  );
};