import "./Welcome.css";
import { FC } from "react";
import { useThemeContext } from "../../Context/theme-context";
import { Link, Outlet } from "react-router-dom";

export const Welcome: FC = () => {
  const { Theme } = useThemeContext();

  return (
    <main className="welcome">
      <div className="welcome-wrapper">
        <h1 className={`headline ${Theme}-headline`}>
          Find the
          <span className="headline-gradient">
            Perfect Image
          </span>
          for Your Design
        </h1>
        <p className={`overview ${Theme}-overview`}>
          Our wide selection of high-quality, free, copyright-free stock images makes it easy
          to find the perfect image for your design projects. Can't find exactly what you're
          looking for? Use our AI-powered generators to create custom images on the fly.
          Save and download your favorites with our favorites feature. Elevate your designs
          with ImageHub!
        </p>
        <div className="link-wrapper">
          <Link
            className="call-to-action signup-call-to-action" to="/signup">
            Get started
          </Link>
          <a
            className="call-to-action github-call-to-action" href="https://github.com/pauserrano2000/FinalProject">
            GitHub
          </a>
        </div>
      </div>

      <Outlet/> {/* It renders the signup or login modal depending on the route */ }
    </main>

  );
};
