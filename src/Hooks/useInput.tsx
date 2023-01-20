import { useState, useCallback } from 'react';

export type Input = {
  value: string;
  isValid: boolean;
  hasError: boolean;
  changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  blurHandler: (event: React.FocusEvent<HTMLInputElement, Element>) => void;
  reset: () => void;
}

export const useInput = (validate: (value: string) => boolean) => {
  const [value, setValue] = useState<string>('');
  const [isTouched, setIsTouched] = useState<boolean>(false);

  const isValid = validate(value);
  const hasError = isTouched && !isValid && value!=="";

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const blurHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsTouched(true);
  };

  const reset = useCallback( () => {
    setValue('');
    setIsTouched(false);
  }, [] )

  return {
    value,
    isValid,
    hasError,
    changeHandler,
    blurHandler,
    reset
  };
};
