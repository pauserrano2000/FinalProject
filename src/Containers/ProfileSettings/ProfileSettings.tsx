import "./ProfileSettings.css";
import { FC } from "react";
import { Form } from "../../Components/Form/Form";
import { Avatar } from "../../Components/Avatar/Avatar";
import { useInput, type Input } from "../../Hooks/useInput";
import { useThemeContext } from "../../Context/theme-context";
import { useAuthContext } from "../../Context/auth-context";
import { useUserContext } from "../../Context/user-context";
import { useNotification } from "../../Hooks/useNotification";
import { validateName, validateEmail, validatePassword } from "../../Services/validate";
import { updateUser, type UpdateUserData } from "../../Services/apicalls";
import { capitalizeFirstLetter, camelCaseToWords } from "../../Utils/utils";
import { IconEdit } from "../../Components/Icons/Icons"

export const ProfileSettings: FC = () => {
  const { theme } = useThemeContext();
  const { token } = useAuthContext();
  const { firstName, lastName, email, resetUserData } = useUserContext();
  const { showSuccesNotification, showErrorNotification } = useNotification();

  const firstNameInput = useInput(validateName);
  const lastNameInput = useInput(validateName);
  const emailInput = useInput(validateEmail);
  const passwordInput = useInput(validatePassword);

  const updateHandler = async (event: React.FormEvent<HTMLFormElement>, key: keyof UpdateUserData, input: Input) => {
    event.preventDefault();
    const update: UpdateUserData = {}
    if (key === "firstName" || key === "lastName") {
      update[key] = capitalizeFirstLetter(input.value);
    } else {
      update[key] = input.value;
    }
    try {
      const isUpdated = await updateUser(token!, update);
      input.reset();
      if (isUpdated) {
        resetUserData();
        showSuccesNotification({
          title: "User data succesfully updated",
          message: `The new ${camelCaseToWords(key)} has been saved in the db`,
        });
      } else {
        showErrorNotification({
          title: "The introduced email already exists in our database",
          message: "Try with another email"
        });
      }
    }
    catch (error) {
      console.log(error);
      showErrorNotification({
        title: "The server is not working, http requests failing",
        message: "The admin should check this...",
      });
    }
  }

  return (
    <main className="profile-settings">
      <div className="profile-settings-wrapper">
        <div className="user-wrapper">
          <Avatar size={200} />
          <div>
            <h1>
              {`${firstName} ${lastName}`}
            </h1>
            <h2>
              {email}
            </h2>
          </div>
        </div>
        <div className="form-wrapper">
          <Form direction="row" onSubmit={(event) => updateHandler(event, "firstName", firstNameInput)}>
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
            <Form.Submit disabled={!firstNameInput.isValid}>
              <IconEdit size={22}/>
            </Form.Submit>
          </Form>
          <Form direction="row" onSubmit={(event) => updateHandler(event, "lastName", lastNameInput)}>
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
            <Form.Submit disabled={!lastNameInput.isValid}>
              <IconEdit size={22} />
            </Form.Submit>
          </Form>
          <Form direction="row" onSubmit={(event) => updateHandler(event, "email", emailInput)}>
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
            <Form.Submit disabled={!emailInput.isValid}>
              <IconEdit size={22}/>
            </Form.Submit>
          </Form>
          <Form direction="row" onSubmit={(event) => updateHandler(event, "password", passwordInput)}>
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
            <Form.Submit disabled={!passwordInput.isValid}>
              <IconEdit size={22}/>
            </Form.Submit>
          </Form>
        </div>
      </div>
    </main>
  );
};