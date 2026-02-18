export const UserQueryKeys = {
  all: () => ['user'],
  onboardStatus: () => ['user', 'onboardStatus'],
  userInfo: () => ['user', 'info'],
} as const;
