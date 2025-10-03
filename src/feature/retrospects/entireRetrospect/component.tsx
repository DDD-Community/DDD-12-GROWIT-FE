import Image from 'next/image';
import { useEffect } from 'react';
import FlexBox from '@/shared/components/foundation/FlexBox';
import { Accordion } from '@/shared/components/layout/Accordion';
import { AISummaryBox } from './components/AISummaryBox';
import { AISummaryButton } from './components/AISummaryButton';
import { usePostRetrospectAI, useGetRetrospectAI } from './hook';
import Badge from '@/shared/components/display/Badge';
import { GoalRetrospect } from '@/composite/retrospect/done/type';

interface EntireRetrospectProps {
  goalId?: string;
  goalRetrospect: GoalRetrospect | null;
}

export const EntireRetrospect = ({ goalId = '', goalRetrospect = null }: EntireRetrospectProps) => {
  const { isLoading, isSuccess, postAISummary } = usePostRetrospectAI();
  const { AISummary, refetch } = useGetRetrospectAI(goalRetrospect?.id || '');

  // 성공했을 때 데이터 새로고침
  useEffect(() => {
    if (isSuccess && refetch) {
      refetch();
    }
  }, [isSuccess, refetch]);

  return (
    <Accordion
      renderTitle={() => (
        <FlexBox className="flex gap-4">
          <p className="heading-2-bold text-label-normal">전체회고</p>
          <div className="py-1 px-3 bg-purple-500/20 rounded-xl">
            <label className="label-1-normal bg-gradient-to-r from-blue-500 to-accent-pink bg-clip-text text-transparent">
              AI
            </label>
          </div>
        </FlexBox>
      )}
    >
      {AISummary ? (
        <AISummaryBox goalId={goalId} AISummary={AISummary} />
      ) : (
        <div className="flex flex-col gap-4">
          {/** 목표 진행 과정 요약 데이터가 없을 경우 */}
          <div className="flex items-start gap-4 pt-6">
            <Image src="/character.png" alt="growit-character" width={100} height={100} />

            <div className="flex flex-col gap-4 w-full bg-elevated-assistive py-5 px-6 pb-8 rounded-lg relative">
              <p className="headline-1-bold text-label-normal">AI 인사이트</p>
              <label className="text-primary-normal">회고 작성 전에, 이번 목표에 대한 AI 요약 및 조언을 받아봐!</label>
              <div className="flex flex-col py-3 px-4 w-full rounded-lg gap-4 blur-sm ">
                <FlexBox className="flex gap-4">
                  <Badge type={'default'} size={'sm'} label="주간 투두 완료율" />
                  <span className="body-1-bold text-brand-neon">30%</span>
                </FlexBox>
                <p className="label-1-normal text-label-normal opacity-70">
                  GROWIT MVP 개발과 사회문제 해결형 서비스 기획, 스타트업·VC 트렌드 리서치를 병행하며 실행력과 전략적
                  감각을 개발하면서 4주 목표를 실행했습니다.
                </p>
              </div>
              <div className="absolute inset-0 flex items-center justify-center pt-16">
                <AISummaryButton
                  text="AI 분석 시작"
                  onClick={() => postAISummary(goalId)}
                  status={isLoading ? 'loading' : isSuccess ? 'success' : 'idle'}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </Accordion>
  );
};
