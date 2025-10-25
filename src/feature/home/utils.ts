import { AIMentorImage, AIMentorModalBackground, AIMentorModalCharacter } from '@/feature/home/const';
import { AIMentor } from './type';

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
