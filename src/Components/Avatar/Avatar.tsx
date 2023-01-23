import React, { FC } from "react";
import { useThemeContext } from "../../Context/theme-context";
import { useUserContext } from "../../Context/user-context";
import { Avatar as MantineAvatar} from '@mantine/core';

type AvatarProps = {
  size?: number;
  radius?: "md" | number
}

export const Avatar: FC<AvatarProps> = React.memo(({size=45, radius="md"}) => {
    const { theme } = useThemeContext();
    const { avatar, initials, email } = useUserContext();
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
})