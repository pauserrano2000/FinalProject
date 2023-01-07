import "./Welcome.css";
import { FC } from "react";
import { useThemeContext } from "../../Context/theme-context";

export const Welcome: FC = () => {
  const { Theme } = useThemeContext();

  return (
    <main className="welcome">
      <h1 className={`headline ${Theme}-headline`}>
        Find the Perfect Image for Your Design with ImageHub
      </h1>
      <p className={`overview ${Theme}-overview`}>
        Welcome to ImageHub, the ultimate destination for finding the perfect image for your design projects.
        Our wide selection of high-quality, free, copyright-free stock images makes it easy to find exactly what
        you need. And if you can't find exactly what you're looking for, our AI-powered generators allow you to
        create custom images on the fly. Plus, with our favorites feature, you can easily save and download
        your favorite images for later use. Elevate your designs with ImageHub.
      </p>
    </main>
  );
};
