import "./ProfileSettings.css";
import { FC } from "react";
import { Form } from "../../Components/Form/Form";
import { useInput } from "../../Hooks/useInput";
import { useThemeContext } from "../../Context/theme-context";
import { useNotification } from "../../Hooks/useNotification";
import { validateName, validateEmail, validatePassword } from "../../Services/validate";

export const ProfileSettings: FC = () => {
  const { Theme } = useThemeContext();
  const { showSuccesNotification, showErrorNotification } = useNotification();
  
  const firstNameInput = useInput(validateName);
  const lastNameInput = useInput(validateName);
  const emailInput = useInput(validateEmail);
  const passwordInput = useInput(validatePassword);

  let formIsValid = false;
  if (firstNameInput.isValid && lastNameInput.isValid && emailInput.isValid && passwordInput.isValid) {
    formIsValid = true;
  }

  const updateHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("update");
  }
  return (
    <main className="profile-settings">
      <div className="profile-settings-wrapper">
        <h1 className={`heading ${Theme}-heading `}>
          PROFILE SETTINGS
        </h1>
        <Form onSubmit={updateHandler}>
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
            errorText="Include numbers and capital letters (8+ characters)"
          />
          <Form.Submit
            disabled={!formIsValid}
            text="Update"
          />
        </Form>
      </div>
    </main>
  );
};