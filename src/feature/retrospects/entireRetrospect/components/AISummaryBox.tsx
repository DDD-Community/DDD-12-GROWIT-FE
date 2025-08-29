'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { RetrospectBox, RetrospectSummaryBox } from '../../RetrospectBox';
import Button from '@/shared/components/input/Button';
import FlexBox from '@/shared/components/foundation/FlexBox';
import { TextArea } from '@/shared/components/input/TextArea';
import { patchCompletedGoalRetrospect } from '../api';
import { useEffect, useState } from 'react';
import { useToast } from '@/shared/components/feedBack/toast';
import { RetrospectAIResponse } from '../type';
import { apiClient } from '@/shared/lib/apiClient';

interface AISummaryBoxProps {
  AISummary: RetrospectAIResponse;
  goalId: string;
}
// 목표 진행 과정 요약(AI) 데이터가 있을 경우
export const AISummaryBox = ({ AISummary, goalId }: AISummaryBoxProps) => {
  const router = useRouter();
  const [goalRetrospect, setGoalRetrospect] = useState<string>(AISummary.content);
  const [isEditing, setIsEditing] = useState(AISummary.content === undefined || AISummary.content.length === 0);
  const { showToast } = useToast();

  const patchGoalRetrospect = async () => {
    try {
      await patchCompletedGoalRetrospect(AISummary.id, goalRetrospect);
      showToast('회고가 성공적으로 저장되었습니다!', 'success');
    } catch (error) {
      if (error instanceof Error) {
        showToast(error.message, 'error');
      }
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <RetrospectSummaryBox
        title="목표 진행 과정 요약"
        content={AISummary.analysis.summary}
        todoCompletedRate={AISummary.todoCompletedRate}
      />
      <RetrospectBox title="그로냥의 조언">
        <p className="body-1-normal text-label-neutral">{AISummary.analysis.advice}</p>
      </RetrospectBox>
      <RetrospectBox title="이전 기록 돌아보기">
        <div className="w-[137px] flex justify-start items-center">
          <Button
            onClick={() => {
              goalId && router.push(`/retrospect/last/${goalId}`);
            }}
            size={'sm'}
            text="지난 주간 플랜 보기"
          />
        </div>
      </RetrospectBox>
      {/** 나의 회고 */}
      <div className="relative flex flex-col gap-4 w-full bg-[rgba(58,238,73,0.04)] border-2 border-line-normal py-5 px-6 rounded-lg mt-4">
        <p className="headline-1-bold text-label-normal">이번 목표 회고를 작성해주세요</p>

        {!AISummary.content.length || isEditing ? (
          <FlexBox direction="col" className="gap-2 w-full">
            <TextArea
              value={goalRetrospect}
              onChange={e => setGoalRetrospect(e.target.value)}
              placeholder="목표에 대한 회고를 작성해주세요"
              className="w-full"
              maxLength={100}
            />
            <div className="w-[106px] flex items-end justify-end">
              <Button
                onClick={() => {
                  patchGoalRetrospect();
                  setIsEditing(false);
                }}
                variant="secondary"
                size="sm"
                text="작성 완료"
              />
            </div>
          </FlexBox>
        ) : (
          <>
            <p className="body-1-normal text-label-neutral">{goalRetrospect}</p>
            <button
              onClick={() => setIsEditing(true)}
              className="absolute bottom-4 right-4 p-2 rounded-2xl w-[36px] bg-label-button-neutral hover:bg-gray-600 border border-line-normal cursor-pointer"
            >
              <Image src="/pen.svg" alt="correct" width={20} height={20} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};
