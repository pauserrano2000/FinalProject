import "./Header.css";
import { FC } from "react";
import { useThemeContext } from "../../Context/theme-context";
import { Nav } from "./Nav/Nav";
import { SwitchTheme } from "./SwitchTheme/SwitchTheme";

export const Header: FC = () => {
  const { isDarkTheme } = useThemeContext();

  return (
    <header className="header-design">
      <h1>App Name</h1>
      <Nav>
        <Nav.Link path="/">
           Home
        </Nav.Link>
        <Nav.Link path="/">
           List
        </Nav.Link>
        <Nav.Link path="/">
           Search
        </Nav.Link>
        <Nav.Link path="/">
           Add
        </Nav.Link>
      </Nav>
      <SwitchTheme/> 
    </header>
  )
}


