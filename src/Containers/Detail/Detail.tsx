import "./Detail.css";
import { FC } from "react";
import { useThemeContext } from "../../Context/theme-context";

export const Detail: FC = () => {
  const { Theme } = useThemeContext();

  return (
    <main className="detail">
      <h1 className={`heading ${Theme}-heading `}>
        DETAIL</h1>
    </main>
  );
};