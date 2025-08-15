export const HEADER_CONFIG = {
  hideHeaderPages: ['/home', '/home/create-goal'],
  hideBackButtonPages: ['/home'],
  pageTitles: {
    '/home': '홈',
    '/mypage': '마이페이지',
    '/onboarding': '온보딩',
    '/home/create-goal': '목표 생성하기',
  } as Record<string, string>,
} as const;
