import "./Welcome.css";
import { FC } from "react";
import { useThemeContext } from "../../Context/theme-context";
import { Link, Outlet } from "react-router-dom";
import { IconBrandGithub } from "../../Components/Icons/Icons";

export const Welcome: FC = () => {
  const { theme } = useThemeContext();

  return (
    <main className="welcome">
      <div className="welcome__wrapper">
        <h1 className={`welcome__headline ${theme}-welcome__headline`}>
          Find the
          <span className="welcome__headline__gradient">
            Perfect Image
          </span>
          for your design
        </h1>
        <div className="welcome__overview__wrapper">
          <p className={`welcome__overview ${theme}-welcome__overview`}>
            Our wide selection (+3.48 million) of high-quality, free, copyright-free stock images makes it easy
            to find the perfect image for your design projects. Can't find exactly what you're
            looking for? Use our AI-powered generators to create custom images on the fly.
            Save and download your favorites with our favorites feature. Elevate your designs
            with ImageHub!
          </p>
          <video className="welcome__video" controls autoPlay id="video">
            <source src={process.env.PUBLIC_URL + "/videos/welcome.mp4"} type="video/mp4" />
          </video>
        </div>
        <div className="welcome__link-wrapper">
          <Link
            className="welcome__call-to-action welcome__signup-call-to-action" to="/signup">
            Get started
          </Link>
          <a
            className="welcome__call-to-action welcome__github-call-to-action"
            href="https://github.com/pauserrano2000/FinalProject"
            target="_blank" rel="noreferrer">
            <IconBrandGithub />
            GitHub
          </a>
        </div>
      </div>

      <Outlet /> {/* It renders the signup or login modal depending on the route */}
    </main>

  );
};
