import axios, { AxiosRequestConfig } from 'axios';
import { tokenController } from './token';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export async function postLoginApi(email: string, password: string) {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/login`, { email, password });
    // 성공 시 토큰 저장
    const { accessToken, refreshToken } = response.data;
    tokenController.setTokens(accessToken, refreshToken);
    return response.data;
  } catch (error: unknown) {
    throw error;
  }
}

export async function postReissueTokenApi() {
  try {
    const refreshToken = tokenController.getRefreshToken();
    const response = await axios.post(`${API_BASE_URL}/api/reissue`, { refreshToken });
    const { accessToken, refreshToken: newRefreshToken } = response.data;
    tokenController.setTokens(accessToken, newRefreshToken);
    return response.data;
  } catch (error: unknown) {
    throw error;
  }
}

export async function requestWithAuth<T = unknown>(config: AxiosRequestConfig): Promise<T> {
  try {
    const accessToken = tokenController.getAccessToken();
    const headers = {
      ...(config.headers || {}),
      Authorization: `Bearer ${accessToken}`,
    };
    const response = await axios({ ...config, headers });
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
      const retryResponse = await axios({ ...config, headers });
      return retryResponse.data;
    }
    throw error;
  }
} 