import "./ProfileSettings.css";
import { FC } from "react";
import { useThemeContext } from "../../Context/theme-context";

export const ProfileSettings: FC = () => {
  const { Theme } = useThemeContext();

  return (
    <main className="settings">
      <h1 className={`heading ${Theme}-heading `}>
        PROFILE SETTINGS</h1>
    </main>
  );
};