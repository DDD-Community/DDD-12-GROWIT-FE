import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const mockAxiosInstance: AxiosInstance = axios.create({
  // Mock API는 MSW가 처리하므로 baseURL을 설정하지 않음
  // baseURL: MOCK_API_BASE_URL, // 이 줄을 제거
  timeout: 5000,
  // CORS 관련 설정
  withCredentials: false,
});

// Mock API용 Request interceptor (인증 로직 없음)
mockAxiosInstance.interceptors.request.use(
  config => {
    console.log('Mock API Request:', {
      method: config.method?.toUpperCase(),
      url: config.url,
      headers: config.headers,
      data: config.data,
    });

    // Mock API는 인증이 필요하지 않으므로 Authorization 헤더를 추가하지 않음

    // CORS 관련 헤더 추가
    config.headers['Content-Type'] = 'application/json';
    config.headers['Accept'] = 'application/json';

    return config;
  },
  error => {
    console.error('Mock API Request Error:', error);
    return Promise.reject(error);
  }
);

// Mock API용 Response interceptor (토큰 갱신 로직 없음)
mockAxiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log('Mock API Response:', {
      status: response.status,
      statusText: response.statusText,
      url: response.config.url,
      data: response.data,
    });
    return response;
  },
  error => {
    // Mock API 에러는 단순히 reject만 하고 토큰 삭제나 리다이렉트는 하지 않음
    console.error('Mock API Response Error:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      url: error.config?.url,
      data: error.response?.data,
      message: error.message,
    });
    return Promise.reject(error);
  }
);

export const mockApiClient = {
  get: <T>(url: string, config?: AxiosRequestConfig) => mockAxiosInstance.get<T>(url, config),
  post: <T, U = unknown>(url: string, data?: U, config?: AxiosRequestConfig) =>
    mockAxiosInstance.post<T>(url, data, config),
  put: <T, U = unknown>(url: string, data?: U, config?: AxiosRequestConfig) =>
    mockAxiosInstance.put<T>(url, data, config),
  delete: <T>(url: string, config?: AxiosRequestConfig) => mockAxiosInstance.delete<T>(url, config),
  patch: <T, U = unknown>(url: string, data?: U, config?: AxiosRequestConfig) =>
    mockAxiosInstance.patch<T>(url, data, config),
};
