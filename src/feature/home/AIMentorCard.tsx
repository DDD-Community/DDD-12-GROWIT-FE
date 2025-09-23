import Image from 'next/image';
import { AIMentor } from '@/feature/home/type';
import { AIMentorName } from '@/feature/home/const';
import { ChevronRight } from 'lucide-react';
import { AIAdviceDetailModal } from '@/feature/home/AIAdviceDetailModal';
import { useState } from 'react';

interface AIMentorCardProps {
  aiMentor: AIMentor;
}

export const AIMentorCard = ({ aiMentor }: AIMentorCardProps) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <p className="body-1-bold text-label-neutral">{AIMentorName[aiMentor]}의 조언</p>
      <div className="relative pt-6 pb-8 px-4 rounded-2xl overflow-hidden">
        <Image
          src={`/image/${aiMentor}.png`}
          alt="background"
          fill
          className="object-cover object-top aspect-square"
          priority={false}
        />
        <div className="flex flex-col gap-5 relative z-50">
          <div className="w-3/4">
            <h2 className="headline-1-bold text-white">혁신은 단순함에서 시작돼</h2>
            <span className="text-sm text-label-neutral">네 작업은 뼈대는 있지만 브랜드 결이 약해 보여.</span>
          </div>
          <button
            className="flex items-center gap-2 body-2-normal text-label-neutral"
            onClick={() => setShowModal(true)}
          >
            자세히보기 <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      <AIAdviceDetailModal open={showModal} onClose={() => setShowModal(false)} aiMentor={aiMentor} />
    </>
  );
};
