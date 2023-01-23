// Checks if the string contains only letters, and allows for spaces, hyphens, and some
// punctuation. It does not allow numbers, symbols, or other special characters.
export const validateName = (value: string): boolean => {
  const nameRegex = /^[a-zA-ZñÑçÇ]+(([',. -][a-zA-ZñÑçÇ ])?[a-zA-ZñÑ]*)*$/;
  return nameRegex.test(value);
};
// Checks if the string is a properly formatted email address, including the local part
// (before the @) and the domain part (after the @) e. g. test@example.com.
export const validateEmail = (value: string): boolean => {
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(value);
};
// At least 8 characters and at least 1 uppercase letter, 1 lowercase letter and 1 number.
export const validatePassword = (value: string): boolean => {
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\dñÑçÇ]{8,}$/;
  return passwordRegex.test(value);
};

// Checks if the string contains only letters, numbers, spaces, hyphens, commas and periods.
export const validateSearch = (value: string): boolean => {
  const searchRegex = /^[a-zA-Z0-9ñÑçÇ ,.-]+$/;
  return searchRegex.test(value);
};

// Checks if The URL begins with either "http://www.", "https://www.", "http://", or "https://", 
// Followed by one or more characters that can be letters or numbers
export const validateURL = (value: string): boolean => {
  const urlRegex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
  return urlRegex.test(value);
};
