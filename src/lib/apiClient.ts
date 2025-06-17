import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { tokenController } from '@/app/login/token';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = tokenController.getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;
    
    // 403 errors (unauthorized access)
    if (error.response?.status === 403) {
      tokenController.clearTokens();
      window.location.href = '/login';
      return Promise.reject(error);
    }

    // 401 errors (token expired)
    if (error.response?.status === 401 && originalRequest) {
      try {
        // Try to refresh the token
        const refreshToken = tokenController.getRefreshToken();
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        const response = await axios.post(`${API_BASE_URL}/api/reissue`, { refreshToken });
        const { accessToken, refreshToken: newRefreshToken } = response.data;
        
        // Update tokens
        tokenController.setTokens(accessToken, newRefreshToken);

        // Retry the original request with new token
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // If refresh fails, clear tokens and redirect to login
        tokenController.clearTokens();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export const apiClient = {
  get: <T>(url: string, config?: AxiosRequestConfig) => axiosInstance.get<T>(url, config),
  post: <T, U = unknown>(url: string, data?: U, config?: AxiosRequestConfig) => axiosInstance.post<T>(url, data, config),
  put: <T, U  = unknown>(url: string, data?: U, config?: AxiosRequestConfig) => axiosInstance.put<T>(url, data, config),
  delete: <T>(url: string, config?: AxiosRequestConfig) => axiosInstance.delete<T>(url, config),
}; 