import "./Search.css";
import { FC } from "react";
import { useThemeContext } from "../../Context/theme-context";

export const Search: FC = () => {
  const { theme } = useThemeContext();

  return (
    <main className="search">
      <h1 className={`heading ${theme}-heading `}>
        SEARCH</h1>
    </main>
  );
};