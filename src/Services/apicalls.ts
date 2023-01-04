import axios from "axios";


export const getToken = async (email: string, password:string  ) => {
    const token = "999"
    return token ;
  };

const DALL_E_API_ENDPOINT = 'https://api.openai.com/v1/images/generations';

export const generateImageFromDescription = async (description: string) => {
  const response = await axios.post(DALL_E_API_ENDPOINT, {
    prompt: description,
    model: 'image-alpha-001',
    api_key: 'YOUR_API_KEY_HERE',
  });
  return response.data.data.url;
};

const API_URL = 'https://api.unsplash.com';

export const searchPhotos = (query: string) => {
  return axios.get(`${API_URL}/search/photos`, {
    params: { query },
    headers: {
      Authorization: `Client-ID YOUR_ACCESS_KEY`,
    },
  });
};