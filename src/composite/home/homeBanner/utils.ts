import { GrorongMood } from '@/model/advice/types';
import { BANNER_STORAGE_KEY, MOOD_TO_VIDEO_PREFIX, VIDEO_COUNT } from './constants';

type StoredBannerIndex = {
  date: string;
  indices: Record<GrorongMood, number>;
};

/**
 * 오늘 날짜를 YYYY-MM-DD 형식으로 반환
 */
const getTodayString = (): string => {
  return new Date().toISOString().split('T')[0];
};

/**
 * 0부터 max-1까지의 랜덤 정수 반환
 */
const getRandomIndex = (max: number): number => {
  return Math.floor(Math.random() * max);
};

/**
 * 하루에 한 번 랜덤으로 선택된 인덱스를 반환
 * localStorage에 저장하여 같은 날에는 동일한 인덱스 유지
 */
export const getDailyRandomIndex = (mood: GrorongMood): number => {
  if (typeof window === 'undefined') {
    return 0;
  }

  const today = getTodayString();
  const stored = localStorage.getItem(BANNER_STORAGE_KEY);

  if (stored) {
    try {
      const parsed: StoredBannerIndex = JSON.parse(stored);

      if (parsed.date === today && parsed.indices[mood] !== undefined) {
        return parsed.indices[mood];
      }
    } catch {
      // 파싱 실패 시 새로 생성
    }
  }

  // 새로운 날이거나 저장된 값이 없는 경우
  const newIndices: Record<GrorongMood, number> = {
    HAPPY: getRandomIndex(VIDEO_COUNT),
    NORMAL: getRandomIndex(VIDEO_COUNT),
    SAD: getRandomIndex(VIDEO_COUNT),
  };

  const newStored: StoredBannerIndex = {
    date: today,
    indices: newIndices,
  };

  localStorage.setItem(BANNER_STORAGE_KEY, JSON.stringify(newStored));

  return newIndices[mood];
};

/**
 * mood와 인덱스를 기반으로 비디오 URL 생성
 * 형식: {CLOUDFRONT_VIDEO_URL}/home-banner/Closeness%20{high|low|mad}-{01~06}.mp4
 */
export const getVideoUrl = (mood: GrorongMood, index: number): string => {
  const baseUrl = process.env.NEXT_PUBLIC_CLOUDFRONT_VIDEO_URL;
  const prefix = MOOD_TO_VIDEO_PREFIX[mood];
  const paddedIndex = String(index + 1).padStart(2, '0');

  return `${baseUrl}/home-banner/Closeness%20${prefix}-${paddedIndex}.mp4`;
};
