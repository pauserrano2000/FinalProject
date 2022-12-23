import "./MainNavigation.css";
import { FC, PropsWithChildren } from "react";
import { NavLink } from "react-router-dom";
import { useThemeContext } from "../../../../Context/theme-context";

type LinkProps = {
  path: string
}
const Link: FC<PropsWithChildren<LinkProps>> = ({ path, children }) => {
  const { isDarkTheme } = useThemeContext();

  return (
    <li>
      <NavLink
        to={path}
        className={({ isActive }) =>
          `${isActive ? "active-link" : "link"} ${isDarkTheme ? "dark-theme-link" : ""}`
        }
      >
        {children}
      </NavLink>
    </li>
  )
}

export const MainNavigation = ({ children }: PropsWithChildren) => {

  return (
    <nav>
      <ul>
        {children}
      </ul>
    </nav>
  )
}

MainNavigation.Link = Link
