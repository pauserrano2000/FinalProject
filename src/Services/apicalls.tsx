import axios from "axios";
import { type ImageDataFE } from "./apicalls-mapper";
import { Configuration, OpenAIApi } from "openai";

import {
  cleanAxiosResponse,
  hydrateFEGetAuthToken,
  hydrateFECreateUser,
  hydrateFEUpdateUser,
  hydrateFEGetUserData,
  hydrateFESearchImages,
  hydrateFECreateImages,
  cleanOpenAIApiResponse,
} from "./apicalls-mapper";

enum API_URL {
  JSON_SERVER = "http://localhost:3000",
  DALL_E = "https://api.openai.com/v1/images/generations",
  UNSPLASH = "https://api.unsplash.com",
}

export const getAuthToken = async (email: string, password: string) => {
  const response = await axios.get(`${API_URL.JSON_SERVER}/users`, {
    params: { email, password },
  });
  const cleanResponse = cleanAxiosResponse(response);
  return hydrateFEGetAuthToken(cleanResponse);
};

export const getUserData = async (token: string) => {
  const response = await axios.get(`${API_URL.JSON_SERVER}/users/${token}`);
  const cleanResponse = cleanAxiosResponse(response);
  return hydrateFEGetUserData(cleanResponse);
};

export const searchImages = async (
  query: string,
  page: number, //Page number to retrieve
  perPage: number //Number of items per page
) => {
  const response = await axios.get(
    `${API_URL.UNSPLASH}/search/photos/?client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`,
    {
      params: { query, page, per_page: perPage },
    }
  );
  const cleanResponse = cleanAxiosResponse(response);
  return hydrateFESearchImages(cleanResponse);
};

const configuration = new Configuration({
	apiKey: process.env.REACT_APP_DALL_E_API_KEY_3,
});
const openai = new OpenAIApi(configuration);

export const createImages = async (prompt: string) => {
  const response = await openai.createImage({
    prompt: prompt,
    n: 4,
    size: "1024x1024",
  });
  const cleanResponse = cleanOpenAIApiResponse(response);
  console.log(hydrateFECreateImages(prompt, cleanResponse));
  return hydrateFECreateImages(prompt, cleanResponse);
};

const emailExists = async (email: string) => {
  // Checks if the email already exists in the database (this should do it a real backend)
  const response = await axios.get(`${API_URL.JSON_SERVER}/users`, {
    params: { email: email },
  });
  const cleanResponse = cleanAxiosResponse(response);
  const emailExists = !(cleanResponse.length === 0);
  return emailExists;
};

export type UserData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar?: string;
  favorites?: ImageDataFE[];
};

export const createUser = async (user: UserData) => {
  user.avatar = ""; //default value if not seted
  user.favorites = []; //default value if not seted
  // If the email doesn't already exist, makes a POST request to create a new user
  const isEmailValid = !(await emailExists(user.email));
  if (isEmailValid) {
    const response = await axios.post(`${API_URL.JSON_SERVER}/users`, user);
    return hydrateFECreateUser(response);
  }
  return false;
};

export type UpdateUserData = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  avatar?: string;
};

export const updateUser = async (token: string, update: UpdateUserData) => {
  // Checks if the user is trying to update the email
  if (update.email) {
    const isEmailValid = !(await emailExists(update.email));
    if (isEmailValid) {
      const response = await axios.patch(
        `${API_URL.JSON_SERVER}/users/${token}`,
        update
      );
      return hydrateFEUpdateUser(response);
    }
    return false;
  } else {
    const response = await axios.patch(
      `${API_URL.JSON_SERVER}/users/${token}`,
      update
    );
    return hydrateFEUpdateUser(response);
  }
};

export type UpdateFavoritesData = {
  favorites: ImageDataFE[];
};

export const updateFavorites = async (
  token: string,
  update: UpdateFavoritesData
) => {
  const response = await axios.patch(
    `${API_URL.JSON_SERVER}/users/${token}`,
    update
  );
  return hydrateFEUpdateUser(response);
};

