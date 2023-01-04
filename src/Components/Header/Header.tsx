import "./Header.css";
import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useThemeContext } from "../../Context/theme-context";
import { useAuthContext } from "../../Context/auth-context";
import { MainNavigation } from "./MainNavigation/MainNavigation";
import { SwitchTheme } from "./SwitchTheme/SwitchTheme";
import { MenuDropdown } from "./MenuDropdown/MenuDropdown";
import { ReactComponent as Logo} from "../../Assets/logo.svg"

export const Header: FC = () => {
  const { Theme } = useThemeContext();
  const { isLoggedIn, logout } = useAuthContext();
  const navigate = useNavigate()

  const logoutHandler = () => {
     logout()
     navigate("/")
  }

  return (
    <header className="header">
      <Link className="logo-wrapper" to={isLoggedIn ? "/search" : "/"}>
        <Logo className={`logo ${Theme}-logo `}/>
      </Link>

      <MainNavigation>
        {isLoggedIn && <>
          <MainNavigation.Link to="/search">
            Search
          </MainNavigation.Link>
          <MainNavigation.Link to="/image-generation">
            Image Generation
          </MainNavigation.Link>
          <MainNavigation.Link to="/favorites">
            Favorites
          </MainNavigation.Link>
        </>}
      </MainNavigation>

      <div className="button-wrapper">
        {!isLoggedIn && <>
          <Link
            className={`link ${Theme}-link`} to="/login">
            Log in
          </Link>
          <Link
            className={`link signup-link ${Theme}-link`} to="/signup">
            Sign up
          </Link>
        </>}
        {isLoggedIn && <>
          <MenuDropdown>
             <MenuDropdown.Option onClick={logoutHandler}>
                Log out
             </MenuDropdown.Option>
             <MenuDropdown.Option onClick={()=>navigate("/")}>
                Profile settings
             </MenuDropdown.Option>
          </MenuDropdown>
        </>}
        <SwitchTheme />
      </div>
    </header>

  )
}


