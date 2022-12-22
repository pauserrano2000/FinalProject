import { FC } from "react";
import { useThemeContext } from "../../../Context/theme-context";
import { Switch } from '@mantine/core';

export const SwitchTheme: FC = () => {
    const { switchHandler } = useThemeContext();

    return (
        <Switch
            onLabel="DARK"
            offLabel="LIGHT"
            size="lg"
            color="dark"
            onChange={switchHandler}
        />
    )
}