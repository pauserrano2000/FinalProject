import React, { FC } from "react";
import { useThemeContext } from "../../../Context/theme-context";
import { ActionIcon } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons';

export const SwitchTheme: FC = React.memo(() => {
    const { Theme, switchThemeHandler } = useThemeContext();
    return (
        <ActionIcon
            variant="outline"
            color={Theme === "dark" ? 'yellow.5' : 'indigo.9'}
            onClick={switchThemeHandler}
            title="Switch to light/dark theme"
            size="md"
        >
            {Theme === "dark" ? <IconSun size={20} /> : <IconMoonStars size={20} />}
        </ActionIcon>
    )
})