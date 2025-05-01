import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5174/api';

console.log('API URL:', API_URL); // Log the API URL being used

// Create an axios instance for JSON requests
const jsonApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Create an axios instance for multipart/form-data requests
const formDataApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export const profileService = {
  createProfile: async (formData: FormData) => {
    const response = await formDataApi.post('/profiles', formData);
    return response.data;
  },

  updateProfile: async (id: string, formData: FormData) => {
    const response = await formDataApi.put(`/profiles/${id}`, formData);
    return response.data;
  },

  getProfile: async (id: string) => {
    const response = await jsonApi.get(`/profiles/${id}`);
    return response.data;
  },

  getAllProfiles: async () => {
    try {
      console.log('Fetching profiles from:', `${API_URL}/profiles`);
      const response = await jsonApi.get('/profiles');
      console.log('Raw API Response:', response);
      
      if (!response.data) {
        throw new Error('No data received from the API');
      }

      if (Array.isArray(response.data)) {
        console.log('Profiles array:', response.data);
        return { data: response.data };
      } else if (response.data.data && Array.isArray(response.data.data)) {
        console.log('Profiles in data property:', response.data.data);
        return response.data;
      } else {
        console.log('Unexpected response structure:', response.data);
        throw new Error('Unexpected API response structure');
      }
    } catch (error) {
      console.error('Error fetching profiles:', error);
      if (axios.isAxiosError(error)) {
        console.error('Axios error details:', {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        });
      }
      throw error;
    }
  },
};

export const authService = {
  login: async (credentials: { email: string; password: string }) => {
    try {
      console.log('Attempting login with:', { email: credentials.email });
      const response = await jsonApi.post('/auth/login', credentials);
      console.log('Raw login response:', response);
      return response.data;
    } catch (error) {
      console.error('Login service error:', error);
      throw error;
    }
  },

  signup: async (userData: { name: string; email: string; password: string }) => {
    try {
      console.log('Attempting signup with:', { email: userData.email });
      const response = await jsonApi.post('/auth/register', userData);
      console.log('Raw signup response:', response);
      return response.data;
    } catch (error) {
      console.error('Signup service error:', error);
      throw error;
    }
  }
};

// Add response interceptor for logging
jsonApi.interceptors.response.use(
  (response) => {
    console.log('API Response Interceptor:', {
      url: response.config.url,
      status: response.status,
      data: response.data,
    });
    return response;
  },
  (error) => {
    console.error('API Error Interceptor:', {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
    });
    return Promise.reject(error);
  }
);

export default jsonApi; 