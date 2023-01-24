import "./Admin.css";
import React, { FC, useState, useEffect, useCallback } from "react";
import { useNotification } from "../../Hooks/useNotification";
import { useThemeContext } from "../../Context/theme-context";
import { Loading } from "../../Components/Loading/Loading";
import { NotFound } from "../../Components/NotFound/NotFound";
import { UsersWrapper } from "../../Components/UsersWrapper/UsersWrapper";
import { UserCard } from "../../Components/UserCard/UserCard";
import { TopWrapper } from "../../Components/TopWrapper/TopWrapper";
import { type UserDataFE } from "../../Services/apicalls-mapper";
import { getUsersData } from "../../Services/apicalls";

export const Admin: FC = () => {
    const { theme } = useThemeContext();
    const { showErrorNotification } = useNotification();

    const [users, setUsers] = useState<null | UserDataFE[]>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    const fetchUsersData = useCallback(async () => {
        try {
            setIsLoading(true);
            setUsers(await getUsersData());
            setHasError(false);
            setTimeout(() => setIsLoading(false), 150); //Little delay (design decision)
        } catch (error) {
            setIsLoading(false)
            console.error(error);
            setHasError(true);
            showErrorNotification({
                title: "Http requests to load users data failing",
                message: "The stored token or isAdmin has been modified or the server is down",
            });
        }
    }, [showErrorNotification])

    useEffect(() => { //executes twice initially in developement mode due to React.Strict
        fetchUsersData();
    }, [fetchUsersData]);

    return (
        <main className="admin">
            <TopWrapper>
                <h1 className="admin__h1">
                    Admin panel, here you can see all users information
                </h1>
                <div className="admin__info">
                    {!isLoading && users?.length !== 0 && (
                        <p className={`admin__info__p ${theme}-admin__info__p`}>
                            Total users: {users?.length}
                        </p>
                    )}
                </div>
            </TopWrapper>
            {isLoading && <Loading />}
            {hasError &&
                <NotFound>
                    Http requests to load users data failing (json-server not working...)
                </NotFound>}
            {!isLoading && users && (<>
                <UsersWrapper>
                    {users.map((user) => (
                        <UserCard
                            key={user.email}
                            user={user}
                        />
                    ))}
                </UsersWrapper>
            </>
            )}
        </main>
    );
};