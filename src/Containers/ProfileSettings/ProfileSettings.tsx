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
  const passwordInput1 = useInput(validatePassword);
  const passwordInput2 = useInput(validatePassword);

  let formPasswordIsValid = false;
  if (passwordInput1.isValid && passwordInput2.isValid && passwordInput1.value === passwordInput2.value) {
    formPasswordIsValid = true;
  }

  const updateHandler = async (event: React.FormEvent<HTMLFormElement>, key: keyof UpdateUserData, input: Input, altReset?: () => void) => {
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
      if (altReset) { //for password2
        altReset();
      }
      if (isUpdated) {
        resetUserData(); //todo changeeeeee
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
      <div className={`profile-settings__top ${theme}-profile-settings__top`}>
        <Avatar size={170} radius={23} />
        <div className="profile-settings__user">
          <p className="profile-settings__user__name">
            {`${firstName} ${lastName}`}
          </p>
          <p className="profile-settings__user__email">
            {email}
          </p>
        </div>
      </div>
      <div className="profile-settings__forms">
        <div className="profile-settings__forms__info">
          <h2 className={`profile-settings__forms__heading ${theme}-profile-settings__forms__heading`}>
            Edit personal info
          </h2>
          <Form direction="row" onSubmit={(event) => updateHandler(event, "firstName", firstNameInput)}>
            <Form.Input
              label="First name"
              type="text"
              id="firstName"
              value={firstNameInput.value}
              placeholder={firstName!}
              onChange={firstNameInput.changeHandler}
              onBlur={firstNameInput.blurHandler}
              hasError={firstNameInput.hasError}
              errorText="Numbers and some special characters not allowed"
            />
            <Form.Submit disabled={!firstNameInput.isValid}>
              <IconEdit size={22} />
            </Form.Submit>
          </Form>
          <Form direction="row" onSubmit={(event) => updateHandler(event, "lastName", lastNameInput)}>
            <Form.Input
              label="Last name"
              type="text"
              id="lastName"
              value={lastNameInput.value}
              placeholder={lastName!}
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
              placeholder={email!}
              onChange={emailInput.changeHandler}
              onBlur={emailInput.blurHandler}
              hasError={emailInput.hasError}
              errorText="E.g. example@example.com"
            />
            <Form.Submit disabled={!emailInput.isValid}>
              <IconEdit size={22} />
            </Form.Submit>
          </Form>
        </div>
        <div className="profile-settings__forms__password">
          <h2 className={`profile-settings__forms__heading ${theme}-profile-settings__forms__heading`}>
            Change password
          </h2>
          <Form onSubmit={(event) => updateHandler(event, "password", passwordInput1, passwordInput2.reset)}>
            <Form.Input
              type="password"
              id="password"
              value={passwordInput1.value}
              placeholder={"Introduce the new password"}
              onChange={passwordInput1.changeHandler}
              onBlur={passwordInput1.blurHandler}
              hasError={passwordInput1.hasError}
              errorText="Include numbers and capital letters (8+ characters)"
            />
            <Form.Input
              type="password"
              id="password"
              value={passwordInput2.value}
              placeholder={"Introduce it again"}
              onChange={passwordInput2.changeHandler}
              onBlur={passwordInput2.blurHandler}
              hasError={(passwordInput1.value !== passwordInput2.value) && (!passwordInput1.hasError)}
              errorText="Check again if it's the same password"
            />
            <Form.Submit disabled={!formPasswordIsValid}>
              <IconEdit size={22} />
            </Form.Submit>
          </Form>
        </div>
      </div>
    </main>
  );
};