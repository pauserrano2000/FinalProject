import "./ImageGeneration.css";
import { FC } from "react";
import { useThemeContext } from "../../Context/theme-context";

export const ImageGeneration: FC = () => {
  const { Theme } = useThemeContext();

  return (
    <main className="image-generation">
      <h1 className={`heading ${Theme}-heading `}>
        Image Generation</h1>
    </main>
  );
};