export interface AuthToken {
  accessToken: string;
  refreshToken: string;
}

export interface KakaoAuthToken {
  name: string;
  registrationToken: string;
}

export type AuthMethod = 'KAKAO' | 'EMAIL';
