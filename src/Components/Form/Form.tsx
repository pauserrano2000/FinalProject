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
    onSubmit: (event: React.MouseEvent<HTMLButtonElement>) => void;
    disabled: boolean;
    text: string;
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
    const { Theme } = useThemeContext();
    return (
        <div className={`input-wrapper ${Theme}-input-wrapper`}>
            <label className={`label ${Theme}-label`} htmlFor={id}>
                {label}
            </label>
            <input
                className={`input ${Theme}-input ${hasError ? "invalid-input" : ""}`}
                type={type}
                id={id}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
            />
            {hasError && (
                <p className='error-text'>{errorText}</p>
            )}
        </div>
    )
}

const Submit: React.FC<SubmitProps> = ({ onSubmit, disabled, text }) => {
    const { Theme } = useThemeContext();
    return (
        <button className={`submit ${Theme}-submit`} onClick={onSubmit} disabled={disabled}>
            {text}
        </button>
    );
};


export const Form = ({ children }: PropsWithChildren) => {
    const { Theme } = useThemeContext();
    return (
        <form className={`form ${Theme}-form`}>
            {children}
        </form>
    );
};

Form.Input = Input;
Form.Submit = Submit;