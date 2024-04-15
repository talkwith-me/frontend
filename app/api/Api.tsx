import axios from 'axios';

const baseURL = 'https://talkwithme.r-e.kr';

const api = axios.create({
  baseURL,
  timeout: 3000,
});

const get = async (endpoint: string) => {
  try {
    const response = await api.get(endpoint);
    return response;
  } catch (error) {
    return error.response;
  }
};

const post = async (endpoint: string, data: any) => {
  try {
    const response = await api.post(endpoint, data);
    return response;
  } catch (error) {
    return error.response;
  }
};

const setToken = (token: string) => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default {
  get,
  post,
  setToken
};
