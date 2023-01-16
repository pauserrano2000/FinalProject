import "./Detail.css";
import { FC } from "react";
import { useThemeContext } from "../../Context/theme-context";

export const Detail: FC = () => {
  const { theme } = useThemeContext();

  return (
    <main className="detail">
      <h1 className={`heading ${theme}-heading `}>
        DETAIL</h1>
    </main>
  );
};