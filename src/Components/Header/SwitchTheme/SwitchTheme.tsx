import React, { FC } from "react";
import { useThemeContext } from "../../../Context/theme-context";
import { ActionIcon } from '@mantine/core';
import { IconSun, IconMoonStars } from '../../Icons/Icons';

export const SwitchTheme: FC = React.memo(() => {
    const { theme, switchThemeHandler } = useThemeContext();
    return (
        <ActionIcon
            variant="outline"
            color={theme === "dark" ? 'yellow.5' : 'blue'}
            onClick={switchThemeHandler}
            title={`Switch to ${theme === "dark" ? 'light' : 'dark'} theme`}
            size="md"
        >
            {theme === "dark" ? <IconSun size={20} /> : <IconMoonStars size={20} />}
        </ActionIcon>
    )
})