import "./MenuDropdown.css";
import { FC, PropsWithChildren, useState, useRef, useEffect } from "react";
import { useThemeContext } from "../../../Context/theme-context";
import { useUserContext } from "../../../Context/user-context";
import { Avatar } from "../../Avatar/Avatar";

type OptionProps = {
    onClick: () => void;
}

const Option: FC<PropsWithChildren<OptionProps>> = ({ children, onClick }) => {
    const { theme } = useThemeContext();

    return (
        <button
            className={`option ${theme}-option`}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export const MenuDropdown = ({ children }: PropsWithChildren) => {
    const { theme } = useThemeContext();
    const { firstName, lastName, email } = useUserContext();
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
            setTimeout(setIsVisible, 10, false);
        }
    }
    const clickTargetHandler = () => {
        setIsVisible(prevState => !prevState);
    }

    return (
        <div className="dropdown">
            <button className="target" onClick={clickTargetHandler}>
                <Avatar size={45}/>
            </button>
            {isVisible &&
                <div className={`dropdown-content ${theme}-dropdown-content`}>
                    <div ref={ref} className="user-info">
                        <p className="user-info-name">
                            {`${firstName} ${lastName}`}
                        </p>
                        <p className="user-info-email">
                            {email}
                        </p>
                    </div>
                    {children}
                </div>}
        </div>
    );
}

MenuDropdown.Option = Option