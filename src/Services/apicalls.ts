import axios from "axios";
import {
  cleanAxiosResponse,
  hydrateFEGetAuthToken,
  hydrateFECreateUser,
  hydrateFEUpdateUser,
  hydrateFEGetUserData,
  hydrateFESearchImages,
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

// page	Page number to retrieve. (Optional; default: 1)
// per_page	Number of items per page. (Optional; default: 10)
// order_by	How to sort the photos. (Optional; default: relevant). Valid values are latest and relevant.
// color	Filter results by color. Optional. Valid values are: black_and_white, black, white, yellow, orange, red, purple, magenta, green, teal, and blue.
export const searchImages = async (query: string) => {
  const response = await axios.get(
    `${API_URL.UNSPLASH}/search/photos/?client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`,{
      params: { query },
    }
);
  console.log(response);
  console.log(response.headers["x-ratelimit-remaining"]);
  const cleanResponse = cleanAxiosResponse(response);
  console.log(hydrateFESearchImages(cleanResponse));
  return hydrateFESearchImages(cleanResponse);
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
};

export const createUser = async (user: UserData) => {
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

export const generateImageFromDescription = async (description: string) => {
  const response = await axios.post(API_URL.DALL_E, {
    prompt: description,
    model: "image-alpha-001",
    api_key: "YOUR_API_KEY_HERE",
  });
  const cleanResponse = cleanAxiosResponse(response);
  return cleanResponse.data.url;
};
