import axios from "axios";

const JSON_SERVER_API_URL = "http://localhost:3000";

export const getAuthToken = async (
  email: string,
  password: string
): Promise<string | null> => {
  try {
    const response = await axios.get(`${JSON_SERVER_API_URL}/users`, {
      params: { email, password },
    });
    if (response.data.length > 0) {
      return response.data[0].id.toString();
    } else {
      console.log("The credentials are not correct");
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
}

export const getUserData = async (token: string): Promise<UserData | null> => {
  try {
    const response = await axios.get(`${JSON_SERVER_API_URL}/users/${token}`);
    if (response.data !== null) {
      return {
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        email: response.data.email,
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

export interface User extends UserData {
  password: string;
}

export const createUser = async (user: User): Promise<boolean> => {
  try {
    // Checks if the email already exists in the database
    const existingUserResponse = await axios.get(
      `${JSON_SERVER_API_URL}/users`,
      {
        params: { email: user.email },
      }
    );
    if (existingUserResponse.data.length > 0) {
      console.log("Email already exists");
      return false;
    } else {
      // If the email doesn't already exist, makes a POST request to create a new user
      const response = await axios.post(`${JSON_SERVER_API_URL}/users`, user);
      return true;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};

const DALL_E_API_URL = "https://api.openai.com/v1/images/generations";

export const generateImageFromDescription = async (description: string) => {
  const response = await axios.post(DALL_E_API_URL, {
    prompt: description,
    model: "image-alpha-001",
    api_key: "YOUR_API_KEY_HERE",
  });
  return response.data.data.url;
};

const UNSPLASH_API_URL = "https://api.unsplash.com";

export const searchPhotos = (query: string) => {
  return axios.get(`${UNSPLASH_API_URL}/search/photos`, {
    params: { query },
    headers: {
      Authorization: `Client-ID YOUR_ACCESS_KEY`,
    },
  });
};
