import { useState } from 'react';

export const useInput = (validate: (value: string) => boolean) => {
  const [value, setValue] = useState<string>('');
  const [isTouched, setIsTouched] = useState<boolean>(false);

  const isValid = validate(value);
  const hasError = isTouched && !isValid;

  const ChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const BlurHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsTouched(true);
  };

  const reset = () => {
    setValue('');
    setIsTouched(false);
  };

  return {
    value,
    isValid,
    hasError,
    ChangeHandler,
    BlurHandler,
    reset
  };
};
