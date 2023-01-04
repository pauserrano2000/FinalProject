import React, { FC, PropsWithChildren, useState, useContext } from "react";

type ThemeContextObj = {
    Theme: "light" | "dark";
    switchThemeHandler: () => void;
}

const ThemeContext = React.createContext<ThemeContextObj>({
    Theme: "light",
    switchThemeHandler: () => { },
});

export const ThemeContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const [Theme, setTheme] = useState<"light" | "dark">("light");
    const switchThemeHandler = () => {
        setTheme(prevState =>
            prevState === "light" ? "dark" : "light");
    }
    const contextValue: ThemeContextObj = {
        Theme,
        switchThemeHandler
    }

    return (
        <ThemeContext.Provider value={contextValue}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useThemeContext = () => {
    return useContext(ThemeContext)
};
