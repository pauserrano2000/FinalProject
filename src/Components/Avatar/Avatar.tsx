import React, { FC } from "react";
import { useThemeContext } from "../../Context/theme-context";
import { useUserContext } from "../../Context/user-context";
import { Avatar as MantineAvatar } from '@mantine/core';
import { UserDataFE } from "../../Services/apicalls-mapper";
import { getInitials } from "../../Utils/utils";

type AvatarProps = {
    size?: number;
    radius?: "md" | number;
    user?: UserDataFE;
}

export const Avatar: FC<AvatarProps> = React.memo(({ size = 45, radius = "md", user }) => {
    const { theme } = useThemeContext();
    const { avatar, initials, email } = useUserContext();
    if (user) {
        return (
            <MantineAvatar
                variant="outline"
                radius={radius}
                size={size}
                color={theme === "dark" ? 'gray.0' : 'dark.9'}
                src={user.avatar ?? null}
                alt={user.email ?? "??"}
            >
                {user.avatar ? null : (getInitials(user.firstName, user.lastName) ?? "??")}
            </MantineAvatar>
        )
    } else {
        return (
            <MantineAvatar
                variant="outline"
                radius={radius}
                size={size}
                color={theme === "dark" ? 'gray.0' : 'dark.9'}
                src={avatar ?? null}
                alt={email ?? "??"}
            >
                {avatar ? null : (initials ?? "??")}
            </MantineAvatar>
        )
    }
})



