import axios from 'axios';

const baseURL = 'https://talkwithme.r-e.kr';

const api = axios.create({
  baseURL,
  timeout: 3000,
});

export const get = async (endpoint: string) => {
  try {
    const response = await api.get(endpoint);
    return response;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const post = async (endpoint: string, data: any) => {
  try {
    const response = await api.post(endpoint, data);
    return response;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};

export default api;
