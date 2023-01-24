import React, { FC, PropsWithChildren, useState, useContext} from "react";


type AuthContextObj = {
    token: string | null;
    isLoggedIn: boolean;
    isAdmin: boolean | null;
    login: (token: string, isAdmin: boolean) => void;
    logout: () => void;
}

const AuthContext = React.createContext<AuthContextObj>({
    token: null, //authentication token
    isLoggedIn: false,
    isAdmin: null,
    login: (token: string, isAdmin: boolean) => { },
    logout: () => { },
});

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const initialToken = localStorage.getItem("token"); //just when the component is mounted
    const [token, setToken] = useState<string | null>(initialToken);
    const initialIsAdmin= localStorage.getItem("isAdmin"); //just when the component is mounted
    const [isAdmin, setIsAdmin] = useState<boolean | null>(Boolean(initialIsAdmin));
    const isLoggedIn = !!token;

    const loginHandler = (token: string, isAdmin: boolean) => {
        setToken(token);
        setIsAdmin(isAdmin);
        localStorage.setItem('token',token);
        localStorage.setItem('isAdmin',isAdmin.toString());
    }

    const logoutHandler = () => {
        setToken(null);
        setIsAdmin(null);
        localStorage.removeItem('token');
        localStorage.removeItem('isAdmin');
    }

    const contextValue = {
        token,
        isLoggedIn,
        isAdmin,
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
