export interface OnboardingStep {
  id: string;
  guideMessage: string;
  subMessage: string;
  desktopImage: string;
  mobileImage: string;
  altText: string;
  characterImage?: string;
}

export const onboardingSteps: OnboardingStep[] = [
  {
    id: 'step1',
    guideMessage: `매일 아침, 너에게 힘이 되는\n격언 한 마디를 전할게 ☕`,
    subMessage: '작은 다짐이 큰 변화를 만든다는 걸 보여주자!',
    desktopImage: '/onboard/desktop-1.png',
    mobileImage: '/onboard/mobile-1.png',
    altText: '온보딩 스텝 1',
    characterImage: '/image/grorong-excited-m.png',
  },
  {
    id: 'step2',
    guideMessage: '최종 목표까지 얼마나 왔는지 \n주간으로 확인해봐 🚀',
    subMessage: '최종 목표 종료까지 같이 가보자!',
    desktopImage: '/onboard/desktop-2.png',
    mobileImage: '/onboard/mobile-2.png',
    altText: '온보딩 스텝 2',
    characterImage: '/image/grorong-curious-m.png',
  },
  {
    id: 'step3',
    guideMessage: '목표를 이루기 위해 투두를 추가해봐! 🌱',
    subMessage: '투두를 완료할 때마다 목표 행성이 조금씩 \n선명하게 드러날거야',
    desktopImage: '/onboard/desktop-3.png',
    mobileImage: '/onboard/mobile-3.png',
    altText: '온보딩 스텝 3',
    characterImage: '/image/grorong-welcome-m.png',
  },
  {
    id: 'step4',
    guideMessage: '지금매일 작지만 특별한 미션을 줄게 💪',
    subMessage: '하루하루 실천하면 목표에 점점 가까워질거야!',
    desktopImage: '/onboard/desktop-4.png',
    mobileImage: '/onboard/mobile-4.png',
    altText: '온보딩 스텝 4',
    characterImage: '/image/grorong-welcome-m.png',
  },
];
