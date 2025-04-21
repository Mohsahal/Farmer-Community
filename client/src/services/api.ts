import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5174/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export const profileService = {
  createProfile: async (formData: FormData) => {
    const response = await api.post('/profiles', formData);
    return response.data;
  },

  updateProfile: async (id: string, formData: FormData) => {
    const response = await api.put(`/profiles/${id}`, formData);
    return response.data;
  },

  getProfile: async (id: string) => {
    const response = await api.get(`/profiles/${id}`);
    return response.data;
  },

  getAllProfiles: async () => {
    const response = await api.get('/profiles');
    return response.data;
  },
};

export default api; 