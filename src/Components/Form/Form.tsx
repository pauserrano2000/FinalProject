import "./Form.css";
import { FC, PropsWithChildren } from 'react';
import { useThemeContext } from "../../Context/theme-context";

type InputProps = {
    label?: string;
    type: string;
    id: string;
    value: string;
    placeholder?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
    hasError: boolean;
    errorText: string;
}

type SubmitProps = {
    disabled: boolean;
}

type FormProps = {
    direction?: "row" | "column"
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const Input: FC<InputProps> = ({
    label,
    type,
    id,
    value,
    placeholder,
    onChange,
    onBlur,
    hasError,
    errorText
}) => {
    const { theme } = useThemeContext();
    return (
        <div className="input-wrapper">
            {label &&
                <label className={`label ${theme}-label`} htmlFor={id}>
                    {label}
                </label>
            }
            <input
                className={`input ${theme}-input ${hasError ? "invalid-input" : ""}`}
                type={type}
                id={id}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                placeholder={placeholder}
            />
            {hasError && (
                <p className="error-text">{errorText}</p>
            )}
        </div>
    )
}

const Submit: FC<PropsWithChildren<SubmitProps>> = ({ children, disabled}) => {
    return (
        <button className="submit" type="submit" disabled={disabled}>
            {children}
        </button>
    );
};


export const Form = ({ children, direction="column", onSubmit }: PropsWithChildren<FormProps>) => {
    return (
        <form className={`form ${direction}-form`} onSubmit={onSubmit}>
            {children}
        </form>
    );
};

Form.Input = Input;
Form.Submit = Submit;