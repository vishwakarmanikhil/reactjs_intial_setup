import axios from 'axios';
import { getApiUrl } from './apiUrls';

const apiUrl = getApiUrl();

const api = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
    // Add any common headers here
  },
});

export const get = async (url, params = {}) => {
  try {
    const response = await api.get(url, { params });
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
};

export const post = async (url, data = {}) => {
  try {
    const response = await api.post(url, data);
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
};

export const put = async (url, data = {}) => {
  try {
    const response = await api.put(url, data);
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
};

export const del = async (url) => {
  try {
    const response = await api.delete(url);
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
};

const handleRequestError = (error) => {
  // Handle error (e.g., log, show a notification, etc.)
  console.error('API request error:', error);
  throw error; // Propagate the error for further handling in components
};

export default api;