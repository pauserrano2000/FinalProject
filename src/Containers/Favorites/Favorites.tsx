import "./Favorites.css";
import { FC } from "react";
import { useThemeContext } from "../../Context/theme-context";

export const Favorites: FC = () => {
  const { Theme } = useThemeContext();

  return (
    <main className="favorites">
      <h1 className={`heading ${Theme}-heading `}>
        FAVORITES</h1>
    </main>
  );
};