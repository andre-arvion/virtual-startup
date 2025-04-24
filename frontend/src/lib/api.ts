import axios from 'axios';
import { Project, ProjectCreate } from '@/types';
import useStore from '../store/useStore';

const API_URL = 'http://localhost:8000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Important for sending/receiving cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

export const auth = {
  async login(email: string, password: string): Promise<LoginResponse> {
    const formData = new URLSearchParams();
    formData.append('username', email); // OAuth2 expects 'username' not 'email'
    formData.append('password', password);

    console.log('Attempting login...');
    const response = await api.post<LoginResponse>('/auth/login', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    
    console.log('Login response:', {
      status: response.status,
      headers: response.headers,
      cookies: document.cookie
    });
    
    return response.data;
  },

  async logout(): Promise<void> {
    console.log('Logging out...');
    await api.post('/auth/logout');
    console.log('Logged out, cookies:', document.cookie);
  },

  async validateToken(): Promise<boolean> {
    try {
      // Use projects endpoint instead of /users/me
      await api.get('/projects/', { params: { skip: 0, limit: 1 } });
      return true;
    } catch (error) {
      return false;
    }
  }
};

// Request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log('Request:', {
      method: config.method,
      url: config.url,
      headers: config.headers,
      withCredentials: config.withCredentials,
      cookies: document.cookie
    });
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor to handle 401 Unauthorized
api.interceptors.response.use(
  (response) => {
    console.log('Response:', {
      status: response.status,
      url: response.config.url,
      headers: response.headers,
      cookies: document.cookie
    });
    return response;
  },
  (error) => {
    console.error('Response error:', {
      status: error.response?.status,
      url: error.config?.url,
      headers: error.response?.headers,
      data: error.response?.data,
      cookies: document.cookie
    });
    
    if (error.response?.status === 401) {
      console.log('401 error detected, logging out...');
      const logout = useStore.getState().logout;
      logout();
    }
    return Promise.reject(error);
  }
);

export const projects = {
  async list(skip: number = 0, limit: number = 100) {
    console.log('Fetching projects list...');
    const response = await api.get<Project[]>(`/projects?skip=${skip}&limit=${limit}`);
    return response.data;
  },

  async get(id: number) {
    const response = await api.get<Project>(`/projects/${id}`);
    return response.data;
  },

  async create(data: ProjectCreate) {
    const response = await api.post<Project>('/projects', data);
    return response.data;
  },

  async update(id: number, data: Partial<Project>) {
    const response = await api.patch<Project>(`/projects/${id}`, data);
    return response.data;
  },

  async delete(id: number) {
    await api.delete(`/projects/${id}`);
  },
};

export default api; 