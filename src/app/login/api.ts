import { apiClient } from '@/lib/apiClient';
import { tokenController } from '@/app/login/token';
import { AxiosRequestConfig } from 'axios';

interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

export async function postLoginApi(email: string, password: string): Promise<TokenResponse> {
  const response = await apiClient.post<TokenResponse>('/api/login', { email, password });
  const { accessToken, refreshToken } = response.data;
  tokenController.setTokens(accessToken, refreshToken);
  return response.data;
}

export async function postReissueTokenApi(): Promise<TokenResponse> {
  const refreshToken = tokenController.getRefreshToken();
  const response = await apiClient.post<TokenResponse>('/api/reissue', { refreshToken });
  const { accessToken, refreshToken: newRefreshToken } = response.data;
  tokenController.setTokens(accessToken, newRefreshToken);
  return response.data;
}

export async function requestWithAuth<T = unknown>(config: AxiosRequestConfig): Promise<T> {
  try {
    const accessToken = tokenController.getAccessToken();
    const headers = {
      ...(config.headers || {}),
      Authorization: `Bearer ${accessToken}`,
    };
    const response = await apiClient.get<T>(config.url || '', { ...config, headers });
    return response.data;
  } catch (error: any) {
    // 401 에러면 토큰 재발급 후 재시도
    if (error.response?.status === 401) {
      await postReissueTokenApi();
      const accessToken = tokenController.getAccessToken();
      const headers = {
        ...(config.headers || {}),
        Authorization: `Bearer ${accessToken}`,
      };
      const retryResponse = await apiClient.get<T>(config.url || '', { ...config, headers });
      return retryResponse.data;
    }
    throw error;
  }
}
