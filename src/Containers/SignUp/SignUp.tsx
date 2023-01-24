import "./SignUp.css";
import { FC } from "react";
import { Modal } from "../../Components/Modal/Modal";
import { Form } from "../../Components/Form/Form";
import { useInput } from "../../Hooks/useInput";
import { useThemeContext } from "../../Context/theme-context";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../Hooks/useNotification";
import { Callout } from "../../Components/Callout/Callout";
import { ReactComponent as Logo } from "../../Assets/smallLogo.svg"
import { validateName, validateEmail, validatePassword } from "../../Services/validate";
import { createUser } from "../../Services/apicalls";
import { capitalizeFirstLetter } from "../../Utils/utils";
import { IconUserPlus } from "../../Components/Icons/Icons";

export const SignUp: FC = () => {
  const { theme } = useThemeContext();
  const navigate = useNavigate()
  const { showSuccesNotification, showErrorNotification } = useNotification();

  const firstNameInput = useInput(validateName);
  const lastNameInput = useInput(validateName);
  const emailInput = useInput(validateEmail);
  const passwordInput = useInput(validatePassword);

  let formIsValid = false;
  if (firstNameInput.isValid && lastNameInput.isValid && emailInput.isValid && passwordInput.isValid) {
    formIsValid = true;
  }

  const signupHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const user = {
      firstName: capitalizeFirstLetter(firstNameInput.value),
      lastName: capitalizeFirstLetter(lastNameInput.value),
      email: emailInput.value,
      password: passwordInput.value,
    };
    try {
      const isCreated = await createUser(user)
      if (isCreated) {
        showSuccesNotification({
          title: "Account succesfully created",
          message: "You are able to log in now",
        });
        navigate("/");
      } else {
        emailInput.reset()
        showErrorNotification({
          title: "The introduced email already exists in our database",
          message: "Do you already have an account created?"
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
      <main className={`signup ${theme}-signup`}>
        <Logo className="signup__small-logo" />
        <h1 className={`signup__title ${theme}-signup__title`}>
          Sign up to ImageHub
        </h1>
        <Form onSubmit={signupHandler}>
          <Form.Input
            label="First name"
            type="text"
            id="firstName"
            value={firstNameInput.value}
            onChange={firstNameInput.changeHandler}
            onBlur={firstNameInput.blurHandler}
            hasError={firstNameInput.hasError}
            errorText="Numbers and some special characters not allowed"
          />
          <Form.Input
            label="Last name"
            type="text"
            id="lastName"
            value={lastNameInput.value}
            onChange={lastNameInput.changeHandler}
            onBlur={lastNameInput.blurHandler}
            hasError={lastNameInput.hasError}
            errorText="Numbers and some special characters not allowed"
          />
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
            <IconUserPlus size={22} />
            Sign up
          </Form.Submit>
        </Form>
        <Callout to="/login" textLink="Log in">
          Already have an account?
        </Callout>
      </main>
    </Modal >
  );
};