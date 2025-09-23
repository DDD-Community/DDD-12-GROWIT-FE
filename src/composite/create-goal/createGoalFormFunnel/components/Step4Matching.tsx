import { MentorCharacterCard, MentorCharacterType } from '@/feature/goal/mentorCharacterCard';
import { FunnelNextButton } from '@/shared/components/layout/FunnelNextButton';

interface Step4MatchingProps {
  onNext: () => void;
}

export const Step4Matching = ({ onNext }: Step4MatchingProps) => {
  return (
    <div className="flex flex-col h-full">
      {/* 헤더 영역 */}
      <div className="flex flex-col items-center gap-2 px-2 py-4">
        <span className="text-[22px] text-[rgba(194,196,200,0.88)] leading-relaxed">
          <span className="bg-gradient-to-r from-[#80F50E] via-[#78C1F1] to-[#CCADFD] bg-clip-text text-transparent font-bold">
            AI 멘토 매칭
          </span>
          <span>을 성공했어요!</span>
        </span>
        <p className="text-[rgba(194,196,200,0.88)] text-base font-normal leading-[1.5] tracking-[0.0057em] text-center">
          카드를 클릭해보세요
        </p>
      </div>

      {/* 메인 컨텐츠 영역 */}
      <div className="flex-1 flex flex-col items-center justify-center px-5">
        <div className="flex justify-center">
          <MentorCharacterCard mentorCharacter={MentorCharacterType.WARREN_BUFFETT} />
        </div>
      </div>

      {/* 하단 설명 */}
      <div className="flex justify-center items-center px-5 py-5">
        <p className="text-[rgba(194,196,200,0.88)] text-base font-normal leading-[1.5] tracking-[0.0057em] text-center">
          이번 목표가 완료될때까지
          <br />
          AI 멘토의 조언을 받아볼 수 있어요
        </p>
      </div>

      {/* 다음 버튼 */}
      <div className="h-[84px]">
        <FunnelNextButton onClick={onNext} />
      </div>
    </div>
  );
};
