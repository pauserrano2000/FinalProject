import "./ImagesWrapper.css";
import { FC, PropsWithChildren } from 'react';

export const ImagesWrapper: FC<PropsWithChildren> = ({children}) => {
    return( 
        <div className="images-wrapper">
            {children}
        </div>
    )
};