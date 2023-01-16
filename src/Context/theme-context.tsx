import React, { FC, PropsWithChildren, useState, useContext } from "react";

type ThemeContextObj = {
    theme: "light" | "dark";
    switchThemeHandler: () => void;
}

const ThemeContext = React.createContext<ThemeContextObj>({
    theme: "light",
    switchThemeHandler: () => { },
});

export const ThemeContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const [theme, setTheme] = useState<"light" | "dark">("light");
    const switchThemeHandler = () => {
        setTheme(prevState =>
            prevState === "light" ? "dark" : "light");
    }
    const contextValue: ThemeContextObj = {
        theme,
        switchThemeHandler,
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
