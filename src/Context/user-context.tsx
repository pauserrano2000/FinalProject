import React, { FC, PropsWithChildren, useState, useContext } from "react";
import { getUserData } from "../Services/apicalls";

type UserContextObj = {
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    initials: string | null;
    fetchUserData: (token: string) => Promise<boolean>;
}

const UserContext = React.createContext<UserContextObj>({
    firstName: null,
    lastName: null,
    email: null,
    initials: null,
    fetchUserData: async (token: string) => false,
});

export const UserContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const [firstName, setFirstName] = useState<string | null>(null);
    const [lastName, setLastName] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const initials = (firstName && firstName?.charAt(0) + (lastName && lastName?.charAt(0))) ?? null;
    
    const fetchUserData = async (token: string) => {
       const userData = await getUserData(token);
       if (userData) {
        setFirstName(userData.firstName);
        setLastName(userData.lastName);
        setEmail(userData.email);
        return true;
       }
       else { 
        return false;
       }
    }

    const contextValue: UserContextObj = {
        firstName,
        lastName,
        email,
        initials,
        fetchUserData,
    }

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => {
    return useContext(UserContext)
};