import React, { FC } from "react";
import { useThemeContext } from "../../../../Context/theme-context";
import { useUserContext } from "../../../../Context/user-context";
import { Avatar } from '@mantine/core';

export const AvatarButton: FC = React.memo(() => {
    const { Theme } = useThemeContext();
    const { initials } = useUserContext();
    return (
        <Avatar
            variant="outline"
            radius="md"
            size={43}
            color={Theme === "dark" ? 'gray.0' : 'dark.9'}
            src="avatar.png"
            alt="User initials"
        >
            {initials ?? "??"}
        </Avatar>
    )
})