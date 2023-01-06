import "./Callout.css";
import { FC, PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import { useThemeContext } from "../../Context/theme-context";

type CalloutProps = {
    to: string;
    textLink: string;
}
export const Callout: FC<PropsWithChildren<CalloutProps>> = ({ children, to, textLink }) => {
    const { Theme } = useThemeContext();
    return (
        <p className={`callout ${Theme}-callout`}>
            {children}
            <Link className={`callout-link ${Theme}-callout-link`} to={to}>
                {textLink}
            </Link>
        </p>
    )
};