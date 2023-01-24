import "./NotFound.css";
import { FC, PropsWithChildren } from "react";
import { useThemeContext } from "../../Context/theme-context";


export const NotFound: FC<PropsWithChildren> = ({ children }) => {
    const { theme } = useThemeContext();
    return (
        <p className={`not-found ${theme}-not-found`}>
            {children}
        </p>
    )
};