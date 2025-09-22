import { AIMentor } from './type';
import { GrorongIntimacyLevel } from './type';

export const AIMentorName: Record<AIMentor, string> = {
  timcook: '팀쿡',
  warrenbuffett: '워렌 버핏',
  kongqiu: '공자',
};

export const GrorongMessage: Record<GrorongIntimacyLevel, string[]> = {
  상: ['오다 주웠다', '너가 최고야!', '역시 넌 나를 실망시키지 않아'],
  중: ['꾸준한 너에게 주는 내 마음이야', '더 열정열정열정!!!', '시작이 반이다'],
  하: ['요즘은 왜 이리 안와..?', '너 기다리다 목 빠질 뻔했어', '너 기다리다 돌 됬어'],
};

export const GrorongIntimacyLevelImage: Record<GrorongIntimacyLevel, Record<string, string>> = {
  상: {
    '오다 주웠다': '/image/grorong-intimacy-high-heart.png',
    '너가 최고야!': '/image/grorong-intimacy-high-heart.png',
    '역시 넌 나를 실망시키지 않아': '/image/grorong-intimacy-high-happy.png',
  },
  중: {
    '꾸준한 너에게 주는 내 마음이야': '/image/grorong-intimacy-medium-heart.png',
    '더 열정열정열정!!!': '/image/grorong-intimacy-medium-muscle.png',
    '시작이 반이다': '/image/grorong-intimacy-medium-winter.png',
  },
  하: {
    '요즘은 왜 이리 안와..?': '/image/grorong-intimacy-low-sad.png',
    '너 기다리다 목 빠질 뻔했어': '/image/grorong-intimacy-low-hurt.png',
    '너 기다리다 돌 됬어': '/image/grorong-intimacy-low-stone.png',
  },
};

export const GrorongIntimacyLevelBackground: Record<GrorongIntimacyLevel, Record<string, string>> = {
  상: {
    '오다 주웠다': '/image/winter-bg.png',
    '너가 최고야!': '/image/counting-star.png',
    '역시 넌 나를 실망시키지 않아': '/image/counting-star.png',
  },
  중: {
    '꾸준한 너에게 주는 내 마음이야': '/image/winter-bg.png',
    '더 열정열정열정!!!': '/image/winter-bg.png',
    '시작이 반이다': '/image/winter-bg.png',
  },
  하: {
    '요즘은 왜 이리 안와..?': '/image/intimacy-low-bg.png',
    '너 기다리다 목 빠질 뻔했어': '/image/intimacy-low-bg.png',
    '너 기다리다 돌 됬어': '/image/intimacy-low-bg.png',
  },
};
