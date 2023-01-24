import { FC } from 'react';
import { UserDataFE } from '../../Services/apicalls-mapper';
import './UserCard.css';

type UserCardProps = {
    user: UserDataFE;
}

export const UserCard: FC<UserCardProps> = ({ user }) => {

    return (
        <li className="user-card">
            <p className="user-card__info">
               {user.firstName+user.lastName+user.favorites.length+user.email+user.avatar}
            </p>
        </li>
    );
};
