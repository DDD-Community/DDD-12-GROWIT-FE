import { GrorongImage, AIMentorImage, AIMentorModalBackground, AIMentorModalCharacter } from '@/feature/home/const';
import { Mood } from '@/feature/home/const';
import { AIMentor } from './type';

export const DEFAULT_GRORONG_IMAGE = '/home/intimacy-normal-heart.png';
export const getGrorongImage = (mood: Mood, message: string): string => {
  const moodImages = GrorongImage[mood];
  if (!moodImages) {
    return DEFAULT_GRORONG_IMAGE;
  }

  const imagePath = moodImages[message];
  if (!imagePath) {
    return DEFAULT_GRORONG_IMAGE;
  }

  return imagePath;
};

const DEFAULT_AIMENTOR_IMAGE = '/home/timcook-home.png';
const DEFAULT_AIMENTOR_MODAL_CHARACTER = '/home/timcook-modal-character.png';
const DEFAULT_AIMENTOR_MODAL_BACKGROUND = '/home/timcook-modal-bg.png';

export const getAIMentorImage = (aiMentor: AIMentor): string => {
  if (!aiMentor) {
    return DEFAULT_AIMENTOR_IMAGE;
  }

  return AIMentorImage[aiMentor];
};

export const getAIMentorModalCharacter = (aiMentor: AIMentor): string => {
  if (!aiMentor) {
    return DEFAULT_AIMENTOR_MODAL_CHARACTER;
  }

  return AIMentorModalCharacter[aiMentor];
};
export const getAIMentorModalBackground = (aiMentor: AIMentor): string => {
  if (!aiMentor) {
    return DEFAULT_AIMENTOR_MODAL_BACKGROUND;
  }

  return AIMentorModalBackground[aiMentor];
};
