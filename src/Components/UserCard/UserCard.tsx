import { FC } from 'react';
import './UserCard.css';
import { UserDataFE } from '../../Services/apicalls-mapper';
import { useThemeContext } from "../../Context/theme-context";
import { Avatar } from '../Avatar/Avatar';

type UserCardProps = {
    user: UserDataFE;
}

export const UserCard: FC<UserCardProps> = ({ user }) => {
    const { theme } = useThemeContext();
    return (
        <li className={`user-card ${theme}-user-card`}>
            <Avatar user={user} size={70} radius={15} />
            <p className={`user-card__p ${theme}-user-card__p`}>
                {`Full name: ${user.firstName} ${user.lastName}`}
            </p>
            <p className={`user-card__p ${theme}-user-card__p`}>
                {`Email: ${user.email}`}
            </p>
            <p className={`user-card__p ${theme}-user-card__p`}>
                {`Total favorites: ${user.favorites.length}`}
            </p>

        </li>
    );
};
