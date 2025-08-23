export interface OnboardingStep {
  id: string;
  guideMessage: string;
  desktopImage: string;
  mobileImage: string;
  altText: string;
  characterDesktopImage?: string;
  characterMobileImage?: string;
}

export const onboardingSteps: OnboardingStep[] = [
  {
    id: 'step1',
    guideMessage: '나만의 성장 기록을 시작해보세요',
    desktopImage: '/onboard/desktop-1.png',
    mobileImage: '/onboard/mobile-1.png',
    altText: '온보딩 스텝 1',
    characterDesktopImage: '/image/grorong-curious-m.png',
    characterMobileImage: '/image/grorong-curious-s.png',
  },
  {
    id: 'step2',
    guideMessage: '매일의 할 일을 체크하고\n성장 과정을 기록해요',
    desktopImage: '/onboard/desktop-2.png',
    mobileImage: '/onboard/mobile-2.png',
    altText: '온보딩 스텝 2',
    characterDesktopImage: '/image/grorong-curious-m.png',
    characterMobileImage: '/image/grorong-curious-s.png',
  },
  {
    id: 'step3',
    guideMessage: '회고를 통해\n더 나은 내일을 만들어가요',
    desktopImage: '/onboard/desktop-3.png',
    mobileImage: '/onboard/mobile-3.png',
    altText: '온보딩 스텝 3',
    characterDesktopImage: '/image/grorong-curious-m.png',
    characterMobileImage: '/image/grorong-curious-s.png',
  },
  {
    id: 'step4',
    guideMessage: '지금 바로 시작해보세요!',
    desktopImage: '/onboard/desktop-4.png',
    mobileImage: '/onboard/mobile-4.png',
    altText: '온보딩 스텝 4',
    characterDesktopImage: '/image/grorong-curious-m.png',
    characterMobileImage: '/image/grorong-curious-s.png',
  },
];

// 동적으로 온보딩 스텝을 추가하는 함수
export function addOnboardingStep(step: OnboardingStep) {
  onboardingSteps.push(step);
}

// 특정 위치에 온보딩 스텝을 삽입하는 함수
export function insertOnboardingStep(index: number, step: OnboardingStep) {
  onboardingSteps.splice(index, 0, step);
}

// 온보딩 스텝을 제거하는 함수
export function removeOnboardingStep(id: string) {
  const index = onboardingSteps.findIndex(step => step.id === id);
  if (index !== -1) {
    onboardingSteps.splice(index, 1);
  }
}

// 온보딩 스텝을 업데이트하는 함수
export function updateOnboardingStep(id: string, updates: Partial<OnboardingStep>) {
  const index = onboardingSteps.findIndex(step => step.id === id);
  if (index !== -1) {
    onboardingSteps[index] = { ...onboardingSteps[index], ...updates };
  }
}
