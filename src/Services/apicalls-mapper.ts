export const cleanAxiosResponse = (response: any) => {
  // Removes unnecessary properties from the response
  const { data } = response;
  return data;
};

export const cleanOpenAIApiResponse = (response: any) => {
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

export const hydrateFEGetIsAdmin = (cleanResponse: any): boolean => {
  // Modifies the response to match the front-end's needs
  return cleanResponse.isAdmin;
};

export type ImageDataFE = {
  id: string;
  url: string;
  description: string;
  altDescription: string;
  tags: string[];
};

export type UserDataFE = {
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  favorites: ImageDataFE[];
};

export const hydrateFEGetUsersData = (cleanResponse: any): UserDataFE[] => {
  // Modifies the response to match the front-end's needs
  return cleanResponse.map((user: any) => {
    return {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        avatar: user.avatar,
        favorites: user.favorites
    }
});
};

export const hydrateFEGetUserData = (cleanResponse: any): UserDataFE => {
  // Modifies the response to match the front-end's needs
  return {
    firstName: cleanResponse.firstName,
    lastName: cleanResponse.lastName,
    email: cleanResponse.email,
    avatar: cleanResponse.avatar,
    favorites: cleanResponse.favorites,
  };
};

export const hydrateFESearchImages = (
  cleanResponse: any
): { total: number; pages: number; images: ImageDataFE[] } => {
  // Modifies the response to match the front-end's needs
  const { total, total_pages: pages, results } = cleanResponse;
  const images = results.map((image: any) => {
    return {
      id: image.id,
      url: image.urls.raw,
      description: image.description,
      altDescription: image.alt_description,
      tags: image.tags.map((tag: any) => tag.title),
    };
  });
  return { total, pages, images };
};

export const hydrateFECreateImages = (prompt:string, cleanResponse: any): ImageDataFE[] => {
  // Modifies the response to match the front-end's needs
  const { created, data } = cleanResponse;
  return data.map((image: any, index:number) => {
    return {
      id: created+index,
      url: image.url,
      description: prompt,
      altDescription: "If you are seeing this, probably the ai created image has expired...",
      tags: ["Generated with AI"],
    };
  });
};

export const hydrateFECreateUser = (response: any): boolean => {
  // Modifies the response to match the front-end's needs
  return response.statusText === "Created";
};

export const hydrateFEUpdateUser = (response: any): boolean => {
  // Modifies the response to match the front-end's needs
  return response.statusText === "OK";
};
