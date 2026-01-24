import { GrorongMood } from '@/model/advice/types';

export const MOOD_TO_VIDEO_PREFIX: Record<GrorongMood, string> = {
  HAPPY: 'high',
  NORMAL: 'med',
  SAD: 'low',
};

export const VIDEO_COUNT = 6;

export const BANNER_STORAGE_KEY = 'home-banner-daily-index';

export type BannerContent = {
  message: string;
};

export type BannerData = Record<GrorongMood, BannerContent[]>;

/**
 * 영상은 CLOUDFRONT_VIDEO_URL + `/home-banner/Closeness%20{prefix}-{01~06}.mp4` 형식으로 자동 생성됨
 */
export const BANNER_MESSAGES: BannerData = {
  HAPPY: [
    { message: '너 덕분에\n그로롱 성실도 +100' },
    { message: '안녕!\n내 하트를 받아줄래?' },
    { message: '내 친구왔다!\n모두 소리질러~!' },
    { message: '너가 열심히 하니까\n내 맘이 평화로워' },
    { message: '성실한 너를 위해\n꽃다발을 준비했어..' },
    { message: '매일매일이 생일 같아\n너무 고마워!' },
  ],
  NORMAL: [
    { message: '나도 너를 본받아\n열심히 공부하고 있어' },
    { message: '지금처럼 와주면\n그로롱 몸짱될 예정!' },
    { message: '안녕\n너를 봐서 설레!' },
    { message: '너가 와서 신나는\n이 맘을 춤으로 표현할게' },
    { message: '요즘 너의 목표 현황\n완전 꿀잼이야' },
    { message: '너가 온 날은\n나에게 봄날같아' },
  ],
  SAD: [
    { message: '너가 없는 시간은\n365일 겨울같아' },
    { message: '500만년만에 와서\n그로롱 해골 됨' },
    { message: '기다렸는데,,\n외로웠는데,,' },
    { message: '빨리 와서 구해줘\n돌이 되기 직전이야' },
    { message: '안 오는거야?\n나 흑화했어' },
    { message: '네가 없는 거리에는\n내가 할일이 없어서' },
  ],
};
