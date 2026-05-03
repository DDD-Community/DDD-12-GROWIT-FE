import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { authService } from '@/shared/lib/auth';
import { AuthToken } from '@/shared/type/authToken';
import { ROUTES } from '../constants/routes';

interface TokenResponse {
  data: AuthToken;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 20000,
});

// Request interceptor
axiosInstance.interceptors.request.use(
  config => {
    const accessToken = authService.getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Token refresh queue mechanism to prevent race conditions
let isRefreshing = false;
let failedQueue: Array<{ resolve: (token: string) => void; reject: (error: unknown) => void }> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else if (token) {
      resolve(token);
    }
  });
  failedQueue = [];
};

// Response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;

    // 403 errors (unauthorized access)
    if (error.response?.status === 403) {
      authService.logout();
      if (typeof window !== 'undefined') {
        window.location.href = ROUTES.LOGIN;
      }
      return Promise.reject(error);
    }

    // 499 errors (프로모션 코드 입력 - 기간제)
    if (error.response?.status === 499) {
      if (typeof window !== 'undefined') {
        window.location.href = ROUTES.PROMOTION;
      }
      return Promise.reject(error);
    }

    // 401 errors (token expired)
    if (error.response?.status === 401 && originalRequest) {
      // If a refresh is already in progress, queue this request
      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return axiosInstance(originalRequest);
        });
      }

      isRefreshing = true;

      try {
        // Try to refresh the token
        const refreshToken = authService.getRefreshToken();
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        const { data } = await axios.post<TokenResponse>(`${API_BASE_URL}/auth/reissue`, { refreshToken });
        const { accessToken, refreshToken: newRefreshToken } = data.data;

        // Update tokens
        authService.refreshTokens({ accessToken, refreshToken: newRefreshToken });

        // Process queued requests with new token
        processQueue(null, accessToken);

        // Retry the original request with new token
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Process queued requests with error
        processQueue(refreshError, null);

        // If refresh fails, clear tokens and redirect to auth
        authService.logout();
        // 서버 사이드에서는 window 객체가 없으므로 클라이언트에서만 리다이렉트
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export const apiClient = {
  get: <T>(url: string, config?: AxiosRequestConfig) => axiosInstance.get<T>(url, config),
  post: <T, U = unknown>(url: string, data?: U, config?: AxiosRequestConfig) =>
    axiosInstance.post<T>(url, data, config),
  put: <T, U = unknown>(url: string, data?: U, config?: AxiosRequestConfig) => axiosInstance.put<T>(url, data, config),
  delete: <T>(url: string, config?: AxiosRequestConfig) => axiosInstance.delete<T>(url, config),
  patch: <T, U = unknown>(url: string, data?: U, config?: AxiosRequestConfig) =>
    axiosInstance.patch<T>(url, data, config),
};
