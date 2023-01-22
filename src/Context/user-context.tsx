import React, { FC, PropsWithChildren, useState, useContext, useCallback } from "react";
import { type UserDataFE, type ImageDataFE } from "../Services/apicalls-mapper";
import { getInitials } from "../Utils/utils";

type UserContextObj = {
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    favorites: ImageDataFE[];
    isUpToDate: boolean;
    initials: string | null;
    populateUserData: (userData: UserDataFE) => void;
    resetUserData: () => void;
}

const UserContext = React.createContext<UserContextObj>({
    firstName: null,
    lastName: null,
    email: null,
    favorites: [],
    isUpToDate: false,
    initials: null,
    populateUserData: (userData: UserDataFE) => {},
    resetUserData: () => {},
});

export const UserContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const [firstName, setFirstName] = useState<string | null>(null);
    const [lastName, setLastName] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [favorites, setFavorites] = useState<ImageDataFE[]>([]);
    const [isUpToDate, setIsUpToDate] = useState(false);

    const initials = getInitials(firstName,lastName);
    
    const populateUserData = useCallback((userData: UserDataFE) => {
        setFirstName(userData.firstName);
        setLastName(userData.lastName);
        setEmail(userData.email);
        setFavorites(userData.favorites);
        setIsUpToDate(true);
    },[])

    const resetUserData = () => {
        setFirstName(null);
        setLastName(null);
        setEmail(null);
        setFavorites([]);
        setIsUpToDate(false);
    }

    const contextValue: UserContextObj = {
        firstName,
        lastName,
        email,
        favorites,
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