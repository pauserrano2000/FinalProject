import "./MenuDropdown.css";
import { FC, PropsWithChildren, useState, useRef, useEffect } from "react";
import { useThemeContext } from "../../../Context/theme-context";
import { AvatarButton } from "./AvatarButton/AvatarButton"

type OptionProps = {
    onClick: () => void;
}

const Option: FC<PropsWithChildren<OptionProps>> = ({ children, onClick }) => {
    const { Theme } = useThemeContext();

    return (
        <button
            className={`option ${Theme}-option`}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export const MenuDropdown = ({ children }: PropsWithChildren) => {
    const { Theme } = useThemeContext();
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        document.addEventListener('click', clickOutsideHandler, true);
        return () => {
            document.removeEventListener('click', clickOutsideHandler, true);
        };
    }, []);

    const clickOutsideHandler = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
            setIsVisible(false);
        }
    }
    const clickTargetHandler = () => {
        setIsVisible(prevState => !prevState);
    }

    return (
        <div ref={ref} className="dropdown">
            <button className="target" onClick={clickTargetHandler}>
                <AvatarButton />
            </button>
            {isVisible &&
                <div className={`dropdown-content ${Theme}-dropdown-content`}>
                    {children}
                </div>}
        </div>
    );
}

MenuDropdown.Option = Option