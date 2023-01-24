import "./UsersWrapper.css";
import { FC, PropsWithChildren } from 'react';

export const UsersWrapper: FC<PropsWithChildren> = ({children}) => {
    return( 
        <ul className="users-wrapper">
            {children}
        </ul>
    )
};