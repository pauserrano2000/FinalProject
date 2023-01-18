import React, { FC, PropsWithChildren, useState, useContext, useCallback } from "react";
import { type UserDataFE } from "../Services/apicalls-mapper";
import { getInitials } from "../Utils/utils";

type UserContextObj = {
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    isUpToDate: boolean;
    initials: string | null;
    populateUserData: (userData: UserDataFE) => void;
    resetUserData: () => void;
}

const UserContext = React.createContext<UserContextObj>({
    firstName: null,
    lastName: null,
    email: null,
    isUpToDate: false,
    initials: null,
    populateUserData: (userData: UserDataFE) => {},
    resetUserData: () => {},
});

export const UserContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const [firstName, setFirstName] = useState<string | null>(null);
    const [lastName, setLastName] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [isUpToDate, setIsUpToDate] = useState(false);

    const initials = getInitials(firstName,lastName);
    
    const populateUserData = useCallback((userData: UserDataFE) => {
        setFirstName(userData.firstName);
        setLastName(userData.lastName);
        setEmail(userData.email);
        setIsUpToDate(true);
    },[])

    const resetUserData = () => {
        setFirstName(null);
        setLastName(null);
        setEmail(null);
        setIsUpToDate(false);
    }

    const contextValue: UserContextObj = {
        firstName,
        lastName,
        email,
        initials,
        isUpToDate,
        populateUserData,
        resetUserData,
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