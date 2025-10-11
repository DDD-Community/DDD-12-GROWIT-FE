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
      <div className="flex items-center gap-2">
        <p className="body-1-bold bg-[linear-gradient(90deg,rgba(128,245,14,1)_0%,rgba(120,193,241,1)_40%,rgba(204,173,253,1)_100%)] bg-clip-text text-transparent">
          {aiMentorName}의 조언
        </p>
        <Image src="/home/planet.svg" alt="planet" width={24} height={24} priority={true} className="w-6 h-5" />
      </div>
      <div className="relative pt-6 max-w-md min-h-[180px] px-4 rounded-2xl overflow-hidden">
        <Image
          src={imagePath}
          alt="ai-mentor-advice"
          fill
          className={`object-cover object-top`}
          sizes="100%"
          priority
        />
        <div className="flex flex-col gap-2 relative z-50">
          <h2 className="headline-2-bold text-white">{aiMentorAdvice.message}</h2>
          <p className="text-xs text-label-neutral text-pretty max-w-[200px]">{aiMentorAdvice.kpt.tryNext}</p>
          <button
            className="flex items-center gap-2 headline-2-bold text-label-neutral mt-2"
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
