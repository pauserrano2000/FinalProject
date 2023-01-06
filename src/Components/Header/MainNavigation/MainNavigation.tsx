import "./MainNavigation.css";
import { FC, PropsWithChildren } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useThemeContext } from "../../../Context/theme-context";

type LinkProps = {
  to: string;
}

const Link: FC<PropsWithChildren<LinkProps>> = ({ children, to }) => {
  const { Theme } = useThemeContext();

  return (
    <li>
      <NavLink
        className={({ isActive }) =>
          `${isActive ? "navlink active" : "navlink"} ${Theme}-navlink`
        }
        to={to}
      >
        {children}
      </NavLink>
    </li>
  )
}

export const MainNavigation = ({ children }: PropsWithChildren) => {

  return (
    <nav className="main-navigation">
      <ul className="navlink-wrapper">
        {children}
      </ul>
    </nav>
  )
}

MainNavigation.Link = Link