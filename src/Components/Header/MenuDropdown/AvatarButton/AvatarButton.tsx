import React, { FC } from "react";
import { useThemeContext } from "../../../../Context/theme-context";
import { Avatar } from '@mantine/core';

export const AvatarButton: FC = React.memo(() => {
    const { Theme } = useThemeContext();
    return (
        <Avatar
            variant="outline"
            radius="md"
            size={43}
            color={Theme === "dark" ? 'gray.0' : 'dark.9'}
            src="avatar.png"
            alt="User initials"
        >
            IN
        </Avatar>
    )
})