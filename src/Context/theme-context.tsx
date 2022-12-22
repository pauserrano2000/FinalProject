import React, { FC, PropsWithChildren, useState, useContext } from "react";


const ThemeContext = React.createContext({
    isDarkTheme: false,
    switchHandler: () => {},
});

export const ThemeContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const [isDarkTheme, setIsDarkTheme] = useState(false)
    const switchHandler = () => {
        setIsDarkTheme(prevState => !prevState);
    }
    const contextValue = {
        isDarkTheme,
        switchHandler
    }
    return (
        <ThemeContext.Provider value={contextValue}>
            {children}
        </ThemeContext.Provider>
    )
}

//We will use this to connect our containers/components to the theme context
export const useThemeContext = () => {
    return useContext(ThemeContext)
};
