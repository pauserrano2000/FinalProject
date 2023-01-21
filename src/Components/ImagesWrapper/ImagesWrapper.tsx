import "./ImagesWrapper.css";
import { FC, PropsWithChildren } from 'react';

export const ImagesWrapper: FC<PropsWithChildren> = ({children}) => {
    return( 
        <ul className="images-wrapper">
            {children}
        </ul>
    )
};