import "./TopWrapper.css";
import { FC, PropsWithChildren } from 'react';
import { useThemeContext } from "../../Context/theme-context";

type TopWrapperProps = {
    direction?: "column" |"row";
  }
export const TopWrapper: FC<PropsWithChildren<TopWrapperProps>> = ({children, direction="column"}) => {
    const { theme } = useThemeContext();
    return( 
        <div className={`top-wrapper-${direction} ${theme}-top-wrapper`}>
            {children}
        </div>
    )
};