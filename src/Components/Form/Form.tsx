import "./Form.css";
import React, { FC, PropsWithChildren } from 'react';
import { useThemeContext } from "../../Context/theme-context";

type InputProps = {
    label: string;
    type: string;
    id: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
    hasError: boolean;
    errorText: string;
}

type SubmitProps = {
    disabled: boolean;
    text: string;
}

type FormProps = {
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const Input: FC<InputProps> = ({
    label,
    type,
    id,
    value,
    onChange,
    onBlur,
    hasError,
    errorText
}) => {
    const { theme } = useThemeContext();
    return (
        <div className="input-wrapper">
            <label className={`label ${theme}-label`} htmlFor={id}>
                {label}
            </label>
            <input
                className={`input ${theme}-input ${hasError ? "invalid-input" : ""}`}
                type={type}
                id={id}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
            />
            {hasError && (
                <p className="error-text">{errorText}</p>
            )}
        </div>
    )
}

const Submit: React.FC<SubmitProps> = ({ disabled, text }) => {
    return (
        <button className="submit" type="submit" disabled={disabled}>
            {text}
        </button>
    );
};


export const Form = ({ children, onSubmit }: PropsWithChildren<FormProps>) => {
    return (
        <form className="form" onSubmit={onSubmit}>
            {children}
        </form>
    );
};

Form.Input = Input;
Form.Submit = Submit;