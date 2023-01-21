import "./Pagination.css"
import React, { FC } from "react";
import { useThemeContext } from "../../Context/theme-context";
import { Pagination as MantinePagination } from '@mantine/core';

type PaginationProps = {
    currentPage: number;
    onChange: (page: number) => void;
    totalPages: number;
}

export const Pagination: FC<PaginationProps> = ({ currentPage, onChange, totalPages }) => {
    const { theme } = useThemeContext();
    const color = theme === "dark" ? 'white' : 'dark'
    return (
        <div className={`pagination ${theme}-pagination`}>
            <MantinePagination
                page={currentPage}
                onChange={onChange}
                total={totalPages}
                radius="md"
                size="xl"
                styles={(theme) => ({
                    item: {
                        color: color,
                        backgroundColor: "transparent",
                        '&[data-active]': {
                            backgroundImage: theme.fn.gradient({ from: 'blue.7', to: 'cyan.5' }),
                            color: 'white'
                        },
                    },
                })}
            />
        </div>

    )
};