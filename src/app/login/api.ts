import { AuthToken } from '@/shared/type/authToken';
import { apiClient } from '@/shared/lib/apiClient';

interface TokenResponse {
  data: AuthToken;
}

export async function postLoginApi(email: string, password: string): Promise<AuthToken> {
  const { data } = await apiClient.post<TokenResponse>('/auth/signin', { email, password });
  return data.data;
}
