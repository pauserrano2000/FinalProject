export const cleanAxiosResponse = (response: any) => {
  // Removes unnecessary properties from the response
  const { data } = response;
  return data;
};

export const hydrateFEGetAuthToken = (
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

export type UserDataFE = {
  firstName: string;
  lastName: string;
  email: string;
};

export const hydrateFEGetUserData = (cleanResponse: any): UserDataFE => {
  // Modifies the response to match the front-end's needs
  return {
    firstName: cleanResponse.firstName,
    lastName: cleanResponse.lastName,
    email: cleanResponse.email,
  };
};

export type ImageDataFE = {
  id: number;
  url: string;
};

export const hydrateFESearchImages = (cleanResponse: any): ImageDataFE[] => {
  // Modifies the response to match the front-end's needs
  const { results } = cleanResponse; //todo total and total_pages data
  const images = results.map((image: any) => {
    return {
      id: image.id,
      url: image.urls.raw,
      description: image.description,
      altDescription: image.alt_description,
      tags: image.tags.map((tag: any) => tag.title),
    };
  });
  return images;
};

export const hydrateFECreateUser = (response: any): boolean => {
  // Modifies the response to match the front-end's needs
  return response.statusText === "Created";
};

export const hydrateFEUpdateUser = (response: any): boolean => {
  // Modifies the response to match the front-end's needs
  return response.statusText === "OK";
};

