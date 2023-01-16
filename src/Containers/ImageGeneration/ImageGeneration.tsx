import "./ImageGeneration.css";
import { FC } from "react";
import { useThemeContext } from "../../Context/theme-context";

export const ImageGeneration: FC = () => {
  const { theme } = useThemeContext();

  return (
    <main className="image-generation">
      <h1 className={`heading ${theme}-heading `}>
        Image Generation</h1>
    </main>
  );
};