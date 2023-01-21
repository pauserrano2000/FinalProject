import "./Loading.css";
import { Loader } from '@mantine/core';
import { FC } from "react";

export const Loading: FC= () => {
    return (
        <div className='loading'>
            <Loader size="xl"/>
        </div>
    )
};