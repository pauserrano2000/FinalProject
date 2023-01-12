export const cleanAxiosResponse = (response: any) => {
  // Removes unnecessary properties from the response
  const { data } = response;
  return data;
};

export const hydrateFEAuthToken = (
  cleanResponse: any
): string | { errorTitle: string; errorMessage: string } => {
  // Modifies the response to match the front-end's needs
  if (cleanResponse.length === 1) {
    return cleanResponse[0].id.toString();
  } else if (cleanResponse.length === 0) {
    return {
      errorTitle: "The credentials do not match any existing account",
      errorMessage: "Check again that the email or password are correct",
    };
  } else {
    return {
      errorTitle: "More than one user in db with same credentials",
      errorMessage: "The admin should check this...",
    };
  }
};

export type UserData = {
  firstName: string;
  lastName: string;
  email: string;
};

export const hydrateFEUserData = (cleanResponse: any): UserData => {
  // Modifies the response to match the front-end's needs
  return {
    firstName: cleanResponse.firstName,
    lastName: cleanResponse.lastName,
    email: cleanResponse.email,
  };
};
