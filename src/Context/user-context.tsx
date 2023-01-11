import React, { FC, PropsWithChildren, useState, useContext, useCallback } from "react";
import { type UserData } from "../Services/apicalls";

type UserContextObj = {
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    isUpToDate: boolean;
    initials: string | null;
    populateUserData: (userData: UserData) => void;
}

const UserContext = React.createContext<UserContextObj>({
    firstName: null,
    lastName: null,
    email: null,
    isUpToDate: false,
    initials: null,
    populateUserData: (userData: UserData) => {},
});

export const UserContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const [firstName, setFirstName] = useState<string | null>(null);
    const [lastName, setLastName] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [isUpToDate, setIsUpToDate] = useState(false);

    const initials = (firstName && firstName?.charAt(0) + (lastName && lastName?.charAt(0))) ?? null;
    
    const populateUserData = useCallback((userData: UserData) => {
        setFirstName(userData.firstName);
        setLastName(userData.lastName);
        setEmail(userData.email);
        setIsUpToDate(true);
    },[])

    //todo: set uptodate false

    const contextValue: UserContextObj = {
        firstName,
        lastName,
        email,
        initials,
        isUpToDate,
        populateUserData,
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