import { AIMentor } from '@/feature/home/type';

export type Mood = 'HAPPY' | 'NORMAL' | 'SAD';

export const AIMentorNames: Record<AIMentor, string> = {
  timcook: '팀쿡',
  warrenbuffett: '워렌 버핏',
  confucius: '공자',
};

export const GrorongImage: Record<Mood, Record<string, string>> = {
  HAPPY: {
    '오다 주웠다': '/home/intimacy-high-love.png',
    '너는 뭐든 잘해낼거야': '/home/intimacy-high-cute.png',
    '역시 넌 나를 실망시키지 않아': '/home/counting-star.png',
  },
  NORMAL: {
    '꾸준한 나와주는 네 마음이야': '/home/intimacy-normal-heart.png',
    '더 열정열정열정!!': '/home/intimacy-normal-passion.png',
    '시작이 반이야': '/home/intimacy-normal-peace.png',
  },
  SAD: {
    '요즘은 왜 이리 안와..?': '/home/intimacy-low-sad.png',
    '너 기다리다 목 빠질 뻔했어': '/home/intimacy-low-hurt.png',
    '너 기다리다 돌 됬어': '/home/intimacy-low-stone.png',
  },
};

export const AIMentorImage: Record<AIMentor, string> = {
  timcook: '/home/timcook-home.png',
  warrenbuffett: '/home/warrenbuffett-home.png',
  confucius: '/home/confucius-home.png',
};

export const AIMentorModalCharacter: Record<AIMentor, string> = {
  timcook: '/home/timcook-modal-character.png',
  warrenbuffett: '/home/warrenbuffett-modal-character.png',
  confucius: '/home/confucius-modal-character.png',
};

export const AIMentorModalBackground: Record<AIMentor, string> = {
  timcook: '/home/timcook-modal-bg.png',
  warrenbuffett: '/home/warrenbuffett-modal-bg.png',
  confucius: '/home/confucius-modal-bg.png',
};
