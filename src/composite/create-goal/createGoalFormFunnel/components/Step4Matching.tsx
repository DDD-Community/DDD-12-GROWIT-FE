import { MentorCharacterCard, MentorCharacterType } from '@/feature/goal/mentorCharacterCard';
import { useFunnelHeader } from '@/shared/components/layout/FunnelHeader';
import { FunnelNextButton } from '@/shared/components/layout/FunnelNextButton';
import { useEffect, useState, useRef } from 'react';
import { Modal } from '@/shared/components/feedBack/Modal';
import Button from '@/shared/components/input/Button';
import { CreateGoalResponseData } from '@/feature/goal/confimGoal/api';
import { useFormContext } from 'react-hook-form';
import { GoalFormData } from '@/shared/type/form';

interface CreateGoalState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: string | null;
  data: CreateGoalResponseData | null;
  createGoal: (data: any) => Promise<any>;
}

interface Step4MatchingProps {
  onNext: () => void;
  onBack: () => void;
  createGoalState: CreateGoalState;
}

export const Step4Matching = ({ onNext, onBack, createGoalState }: Step4MatchingProps) => {
  const hasInitialized = useRef(false);
  const { hideHeader } = useFunnelHeader();
  const { watch } = useFormContext<GoalFormData>();
  const [showErrorModal, setShowErrorModal] = useState(false);

  const { isLoading, isError, error, data, createGoal } = createGoalState;

  useEffect(() => {
    hideHeader();
  }, []);

  useEffect(() => {
    if (!hasInitialized.current) {
      hasInitialized.current = true;
      const formData = watch();
      createGoal(formData);
    }
  }, [createGoal, watch]);

  useEffect(() => {
    if (isError) {
      setShowErrorModal(true);
    }
  }, [isError]);

  const handleGoBack = () => {
    setShowErrorModal(false);
    onBack();
  };

  // 로딩 상태일 때 로딩 페이지 표시
  if (isLoading) {
    return (
      <div className="flex flex-1 flex-col h-full bg-[#1B1C1E]">
        {/* 헤더 영역 */}
        <div className="flex flex-col items-center gap-2 px-2 py-12">
          <h1 className="text-[22px] text-[#F7F7F8] font-bold text-center leading-[1.36] tracking-[-0.43%]">
            알맞는 멘토를
            <br />
            찾는 중이야!
          </h1>
        </div>

        {/* 메인 컨텐츠 영역 - 로딩 애니메이션 */}
        <div className="flex-1 flex flex-col items-center justify-center px-5">
          <div className="flex flex-1 justify-center">
            <div className="relative">
              {/* 로딩 박스 */}
              <div className="w-[275px] h-[325px] bg-[#0F0F10] rounded-[24px] flex items-center justify-center shadow-[0px_0px_80px_0px_rgba(53,217,66,0.5)]">
                <span className="text-[45px] font-bold text-[#F7F7F8] leading-[1.36] tracking-[-1.94%]">?</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 에러 상태일 때는 Modal만 표시하고 나머지는 숨김
  if (isError) {
    return (
      <div className="flex flex-col h-full">
        {/* 에러 Modal */}
        <Modal
          open={showErrorModal}
          onClose={() => setShowErrorModal(false)}
          renderContent={() => (
            <div className="text-center">
              <p className="text-[#F7F7F8] text-base leading-[1.5] mb-4">
                {error || '목표 생성 중 오류가 발생했습니다.'}
              </p>
              <p className="text-[rgba(194,196,200,0.88)] text-sm leading-[1.5]">
                이전 단계로 돌아가서 정보를 확인해주세요.
              </p>
            </div>
          )}
          renderFooter={() => <Button size="ml" onClick={handleGoBack} text="이전 단계로" className="w-full" />}
        />
      </div>
    );
  }

  // 성공 상태일 때 기존 UI 표시
  return (
    data && (
      <div className="flex flex-col h-full">
        {/* 헤더 영역 */}
        <div className="flex flex-col items-center gap-2 px-2 py-12">
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
            <MentorCharacterCard
              mentorCharacter={(data?.mentor as MentorCharacterType) || MentorCharacterType.TIM_COOK}
            />
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
    )
  );
};
