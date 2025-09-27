export enum MentorCharacterType {
  TIM_COOK = 'TIM_COOK',
  CONFUCIUS = 'CONFUCIUS',
  WARREN_BUFFETT = 'WARREN_BUFFETT',
}

export interface MentorCharacterData {
  id: string;
  name: string;
  tagline: string;
  description: string;
  profileImage: string;
  stats: {
    label: string;
    value: string;
  }[];
  tags: string[];
  type: 'study' | 'lifestyle' | 'career';
}