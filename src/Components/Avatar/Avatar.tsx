import React, { FC } from "react";
import { useThemeContext } from "../../Context/theme-context";
import { useUserContext } from "../../Context/user-context";
import { Avatar as MantineAvatar} from '@mantine/core';

type AvatarProps = {
  size: number;
}

export const Avatar: FC<AvatarProps> = React.memo(({size}) => {
    const { theme } = useThemeContext();
    const { initials, email } = useUserContext();
    return (
        <MantineAvatar
            variant="outline"
            radius="md"
            size={size}
            color={theme === "dark" ? 'gray.0' : 'dark.9'}
            src="avatar.png"
            alt={email ?? "??"}
        >
            {initials ?? "??"}
        </MantineAvatar>
    )
})