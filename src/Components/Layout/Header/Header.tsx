import "./Header.css";
import { FC } from "react";
import { Link } from "react-router-dom";
import { useThemeContext } from "../../../Context/theme-context";
import { MainNavigation } from "./MainNavigation/MainNavigation";
import { SwitchTheme } from "./SwitchTheme/SwitchTheme";

export const Header: FC = () => {
  const { isDarkTheme } = useThemeContext();

  return (
    <header className="header">
      <Link to="/">
        <div className="logo" >App Name</div>
      </Link>
      <MainNavigation>
        <MainNavigation.Link path="/">
          Home
        </MainNavigation.Link>
        <MainNavigation.Link path="/">
          List
        </MainNavigation.Link>
        <MainNavigation.Link path="/">
          Search
        </MainNavigation.Link>
        <MainNavigation.Link path="/">
          Add
        </MainNavigation.Link>
      </MainNavigation>
      <button className="login">
        Log in
      </button>
      <button className="signup">
        Sign up
      </button>
      <SwitchTheme />
    </header>

  )
}


