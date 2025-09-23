import { MentorCharacterType, MentorCharacterData } from './types';

export const mentorCharactersData: Record<MentorCharacterType, MentorCharacterData> = {
  [MentorCharacterType.TIM_COOK]: {
    id: 'teamcook',
    name: '팀쿡',
    tagline: '위대한 아이디어도\n완벽한 실행 없이는\n의미 없다',
    description: '사이드프로젝트',
    profileImage: '/image/grorong-character-timcook.png',
    stats: [
      { label: '직업', value: '애플 CEO' },
      { label: '나이', value: '60+' },
      { label: '성격', value: '꼼꼼한 전략가' },
      { label: '말투', value: '차분하지만 직설적' },
    ],
    tags: ['#운영 효율화', '#제품 브랜딩', '#실행력'],
    type: 'career',
  },
  [MentorCharacterType.CONFUCIUS]: {
    id: 'gongja',
    name: '공자',
    tagline: '배우고 때때로 익히면\n즐겁지 아니한가',
    description: '스터디',
    profileImage: '/image/grorong-character-confucius.png',
    stats: [
      { label: '직업', value: '철학자 & 스승' },
      { label: '나이', value: '2,500+' },
      { label: '성격', value: '온화하지만 원칙적' },
      { label: '말투', value: '시대정신, 비유적 표현' },
    ],
    tags: ['#학문 퀘스트', '#인내 버프', '#리더십'],
    type: 'study',
  },
  [MentorCharacterType.WARREN_BUFFETT]: {
    id: 'warren',
    name: '워렌 버핏',
    tagline: '10년간 들고 가지\n못할 주식이라면,\n10분도 들고 있지 마라',
    description: '재테크',
    profileImage: '/image/grorong-character-warren.png',
    stats: [
      { label: '직업', value: '투자자' },
      { label: '나이', value: '90+' },
      { label: '성격', value: '유머러스하며 검소함' },
      { label: '말투', value: '명언과 팩폭을 넘나드는' },
    ],
    tags: ['#장기 투자', '#리스크 관리', '#가치판단'],
    type: 'lifestyle',
  },
};
