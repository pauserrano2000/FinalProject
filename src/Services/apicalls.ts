import axios from "axios";
import {
  cleanAxiosResponse,
  hydrateFEAuthToken,
  hydrateFEUserData,
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
  return hydrateFEAuthToken(cleanResponse);
};

export const getUserData = async (token: string) => {
  const response = await axios.get(`${API_URL.JSON_SERVER}/users/${token}`);
  const cleanResponse = cleanAxiosResponse(response);
  return hydrateFEUserData(cleanResponse);
};

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export const createUser = async (user: User): Promise<boolean> => {
  // Checks if the email already exists in the database
  const response = await axios.get(`${API_URL.JSON_SERVER}/users`, {
    params: { email: user.email },
  });
  const cleanResponse = cleanAxiosResponse(response);
  const isEmailValid = cleanResponse.length === 0;
  // If the email doesn't already exist, makes a POST request to create a new user
  if (isEmailValid) {
    const response = await axios.post(`${API_URL.JSON_SERVER}/users`, user);
    return response.statusText === "Created";
  }
  return false;
};

export const generateImageFromDescription = async (description: string) => {
  const response = await axios.post(API_URL.DALL_E, {
    prompt: description,
    model: "image-alpha-001",
    api_key: "YOUR_API_KEY_HERE",
  });
  const cleanedResponse = cleanAxiosResponse(response);
  return cleanedResponse.data.url;
};

export const searchPhotos = (query: string) => {
  return axios.get(`${API_URL.UNSPLASH}/search/photos`, {
    params: { query },
    headers: {
      Authorization: `Client-ID YOUR_ACCESS_KEY`,
    },
  });
};
