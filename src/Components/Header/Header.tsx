import "./Header.css";
import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useThemeContext } from "../../Context/theme-context";
import { useAuthContext } from "../../Context/auth-context";
import { useUserContext } from "../../Context/user-context";
import { MainNavigation } from "./MainNavigation/MainNavigation";
import { SwitchTheme } from "./SwitchTheme/SwitchTheme";
import { MenuDropdown } from "./MenuDropdown/MenuDropdown";
import { ReactComponent as Logo } from "../../Assets/logo.svg"
import { IconLogout, IconSettings } from "../Icons/Icons"

export const Header: FC = () => {
  const { theme } = useThemeContext();
  const { isLoggedIn, logout } = useAuthContext();
  const { resetUserData } = useUserContext();
  const navigate = useNavigate()

  const logoutHandler = () => {
    logout();
    resetUserData();
    navigate("/");
  }

  return (
    <header className={`header ${isLoggedIn ? "logged-" : ""}${theme}-header `}>
      <div className="header__logo-wrapper">
        <Logo className={`header__logo ${theme}-header__logo `} />
      </div>

      <MainNavigation>
        {isLoggedIn && <>
          <MainNavigation.Link to="/search">
            Search
          </MainNavigation.Link>
          <MainNavigation.Link to="/image-creator">
            Image Creator
          </MainNavigation.Link>
          <MainNavigation.Link to="/favorites">
            Favorites
          </MainNavigation.Link>
        </>}
      </MainNavigation>

      <div className="header__button-wrapper">
        {!isLoggedIn && <>
          <Link
            className={`header__link ${theme}-header__link`} to="/login">
            Log in
          </Link>
          <Link
            className={`header__link signup-header__link ${theme}-header__link`} to="/signup">
            Sign up
          </Link>
        </>}
        {isLoggedIn && <>
          <MenuDropdown>
            <MenuDropdown.Option onClick={() => navigate("/profile-settings")}>
              <IconSettings size={22} />
              Profile settings
            </MenuDropdown.Option>
            <MenuDropdown.Option onClick={logoutHandler}>
              <IconLogout size={22} />
              Log out
            </MenuDropdown.Option>
          </MenuDropdown>
        </>}
        <SwitchTheme />
      </div>
    </header>

  )
}


