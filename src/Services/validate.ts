// It does not allow numbers, symbols, or other special characters to be included in the name.
export const validateName = (value: string): boolean => {
    const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    return nameRegex.test(value);
};

// e. g. test@example.com
export const validateEmail = (value: string): boolean => {
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z0-9\-]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(value);
};

// At least 8 characters and at least 1 uppercase letter, 1 lowercase letter and 1 number
export const validatePassword = (value: string): boolean => {
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return passwordRegex.test(value);
};

