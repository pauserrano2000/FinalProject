import { Badge as MantineBadge } from '@mantine/core';
import { FC, PropsWithChildren } from "react";

export const Badge: FC<PropsWithChildren> = ({ children }) => {
    return (
        <MantineBadge variant="gradient" size="lg" gradient={{ from: 'blue.7', to: 'cyan.5' }}>
            {children}
        </MantineBadge>

    )
};