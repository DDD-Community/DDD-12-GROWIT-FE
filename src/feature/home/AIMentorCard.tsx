import Image from 'next/image';
import { AIMentor } from './type';
import { AIMentorNames } from '@/feature/home/const';
import { ChevronRight } from 'lucide-react';
import { AIAdviceDetailModal } from '@/feature/home/AIAdviceDetailModal';
import { useState } from 'react';
import { AIMentorAdvice } from '@/model/aiMentor/type';
import { getAIMentorModalBackground, getAIMentorImage, getAIMentorModalCharacter } from './utils';

interface AIMentorCardProps {
  aiMentor: AIMentor;
  aiMentorAdvice: AIMentorAdvice;
}

export const AIMentorCard = ({ aiMentor, aiMentorAdvice }: AIMentorCardProps) => {
  const [showModal, setShowModal] = useState(false);
  const aiMentorName = AIMentorNames[aiMentor] || '팀쿡';
  const imagePath = getAIMentorImage(aiMentor);
  const modalCharacterPath = getAIMentorModalCharacter(aiMentor);
  const modalBackgroundPath = getAIMentorModalBackground(aiMentor);

  return (
    <>
      <p className="body-1-bold text-label-neutral">{aiMentorName}의 조언</p>
      <div className="relative pt-6 max-w-md min-h-[180px] px-4 rounded-2xl overflow-hidden">
        <Image src={imagePath} alt="ai-mentor-advice" fill className={`object-cover object-top`} />
        <div className="flex flex-col gap-3 relative z-50">
          <h2 className="headline-1-bold text-white">{aiMentorAdvice.message}</h2>
          <button
            className="flex items-center gap-2 body-2-normal text-label-neutral"
            onClick={() => setShowModal(true)}
          >
            자세히보기 <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      <AIAdviceDetailModal
        open={showModal}
        onClose={() => setShowModal(false)}
        aiMentorName={aiMentorName}
        aiMentorAdvice={aiMentorAdvice}
        characterPath={modalCharacterPath}
        bgPath={modalBackgroundPath}
      />
    </>
  );
};
