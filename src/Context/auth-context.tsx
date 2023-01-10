import React, { FC, PropsWithChildren, useState, useContext } from "react";


type AuthContextObj = {
    token: string | null;
    isLoggedIn: boolean;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = React.createContext<AuthContextObj>({
    token: null, //authentication token
    isLoggedIn: false,
    login: (token: string) => { },
    logout: () => { },
});

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const initialToken = localStorage.getItem("token"); //just when the component is mounted
    const [token, setToken] = useState<string | null>(initialToken);
    const isLoggedIn = !!token;

    const loginHandler = (token: string) => {
        setToken(token);
        localStorage.setItem('token',token);
    }

    const logoutHandler = () => {
        setToken(null);
        localStorage.removeItem('token');
    }

    const contextValue = {
        token,
        isLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
    }
    
    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    return useContext(AuthContext)
};
