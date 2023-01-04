import "./Search.css";
import { FC } from "react";
import { useThemeContext } from "../../Context/theme-context";

export const Search: FC = () => {
  const { Theme } = useThemeContext();

  return (
    <main className="search">
      <h1 className={`heading ${Theme}-heading `}>
        SEARCH</h1>
    </main>
  );
};