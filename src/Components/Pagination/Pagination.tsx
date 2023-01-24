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
                aria-label="pagination"
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
                getItemAriaLabel={(page) => {
                    switch (page) {
                        case 'dots':
                            return 'dots element aria-label';
                        case 'prev':
                            return 'previous page button aria-label';
                        case 'next':
                            return 'next page button aria-label';
                        case 'first':
                            return 'first page button aria-label';
                        case 'last':
                            return 'last page button aria-label';
                        default:
                            return `${page} item aria-label`;
                    }
                }}

            />
        </div>

    )
};