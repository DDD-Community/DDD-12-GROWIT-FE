import FlexBox from '@/shared/components/foundation/FlexBox';
import Badge from '@/shared/components/display/Badge';
import Button from '@/shared/components/input/Button';
import { useState } from 'react';
import { TextArea } from '@/shared/components/input/TextArea';
import { postAddRetrospect } from '../../addRetroSpect/api';
import { GTM_BUTTON_NAME, GTM_EVENTS } from '@/shared/constants/gtm-events';
import { useGTMActions } from '@/shared/hooks/useGTM';

interface MissedWeeklyRetrospect {
  goalId?: string;
  plan: any;
}

// 지나간 주차 미작성 컴포넌트 (새로 추가)
export const MissedWeeklyRetrospectBox = ({ goalId, plan }: MissedWeeklyRetrospect) => {
  const { trackButtonClick } = useGTMActions();
  const [isEditable, setIsEditable] = useState(false);
  const [weeklyRetrospect, setWeeklyRetrospect] = useState({
    keep: '',
    problem: '',
    tryNext: '',
  });

  const addWeeklyRetrospect = async () => {
    if (goalId) {
      await postAddRetrospect({ goalId: goalId, planId: plan.id, kpt: weeklyRetrospect });
    }
    setIsEditable(false);
  };

  const handleClickNewReview = () => {
    trackButtonClick({
      eventName: GTM_EVENTS.WEEKLY_REVIEW_CLICK,
      buttonName: GTM_BUTTON_NAME.NEW_REVIEW,
    });
    setIsEditable(true);
  };

  return (
    <div className={`flex gap-3 flex-1 w-full bg-elevated-normal p-5 rounded-lg mt-4 shadow-xs`}>
      {/* 왼쪽 아이콘 + 선 */}
      <div className="flex flex-col items-center gap-4">
        <div className="heading-2-bold border border-red-500 text-red-500 p-2 rounded-full">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M11.5283 3.52925C11.7886 3.2689 12.2106 3.2689 12.471 3.52925C12.7313 3.7896 12.7313 4.21161 12.471 4.47195L8.94233 8.0006L12.471 11.5292C12.7313 11.7896 12.7313 12.2116 12.471 12.472C12.2106 12.7323 11.7886 12.7323 11.5283 12.472L7.99962 8.94331L4.47098 12.472C4.21063 12.7323 3.78862 12.7323 3.52827 12.472C3.26792 12.2116 3.26792 11.7896 3.52827 11.5292L7.05692 8.0006L3.52827 4.47195C3.26792 4.21161 3.26792 3.7896 3.52827 3.52925C3.78862 3.2689 4.21063 3.2689 4.47098 3.52925L7.99962 7.05789L11.5283 3.52925Z"
              className="fill-red-500"
            />
          </svg>
        </div>
        <div className={`bg-line-normal w-0.5`}></div>
      </div>

      {/* 오른쪽 내용 */}
      <div className="flex flex-col flex-1 gap-3 pt-1">
        <FlexBox className="gap-2">
          <p className="headline-1-bold text-label-normal">{plan.weekOfMonth}주차</p>
          <Badge type="default" size="sm" textColor="text-red-400" color="bg-red-500/20" label="미작성" />
        </FlexBox>
        <FlexBox className="w-full rounded-lg gap-4 body-1-bold">
          <span className="text-label-alternative">주차 목표</span>
          <span className="text-label-neutral body-1-normal">"{plan.content}"</span>
        </FlexBox>
        <FlexBox direction="col" className="py-3 px-4 w-full rounded-lg gap-4">
          {isEditable ? (
            <FlexBox direction="col" className="gap-4 w-full">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-green-500">Keep (잘한 점)</label>
                <TextArea
                  placeholder="이번 주에 잘한 점을 작성해주세요."
                  className="min-h-[80px] w-full"
                  value={weeklyRetrospect.keep}
                  onChange={e => setWeeklyRetrospect(prev => ({ ...prev, keep: e.target.value }))}
                  onClick={e => e.preventDefault()}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-red-500">Problem (문제점)</label>
                <TextArea
                  placeholder="이번 주에 발생한 문제점을 작성해주세요."
                  className="min-h-[80px] w-full"
                  value={weeklyRetrospect.problem}
                  onChange={e => setWeeklyRetrospect(prev => ({ ...prev, problem: e.target.value }))}
                  onClick={e => e.preventDefault()}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-blue-500">Try Next (다음에 시도할 것)</label>
                <TextArea
                  placeholder="다음 주에 시도해볼 개선점을 작성해주세요."
                  className="min-h-[80px] w-full"
                  value={weeklyRetrospect.tryNext}
                  onChange={e => setWeeklyRetrospect(prev => ({ ...prev, tryNext: e.target.value }))}
                  onClick={e => e.preventDefault()}
                />
              </div>
              <FlexBox className="ml-auto w-[72px]">
                <Button size="sm" text="완료" variant="tertiary" onClick={addWeeklyRetrospect} />
              </FlexBox>
            </FlexBox>
          ) : (
            <>
              <p className="text-sm md:body-1-normal text-label-neutral">
                지난 주 회고가 아직 작성되지 않았어요. 간단히 경험을 기록해보세요.
              </p>
              <div className="w-32">
                <Button size={'ml'} text="회고 작성하기" onClick={handleClickNewReview} />
              </div>
            </>
          )}
        </FlexBox>
      </div>
    </div>
  );
};
