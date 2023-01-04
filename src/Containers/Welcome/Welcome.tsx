import "./Welcome.css";
import { FC } from "react";
import { useThemeContext } from "../../Context/theme-context";

export const Welcome: FC = () => {
  const { Theme } = useThemeContext();

  return (
    <main className="welcome">
      <h1 className={`heading ${Theme}-heading `}>
        WELCOMEEEEEE ALI </h1>
    </main>
  );
};
