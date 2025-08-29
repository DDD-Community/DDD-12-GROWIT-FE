import FlexBox from '@/shared/components/foundation/FlexBox';

interface LockedWeeklyRetrospectProps {
  week: number;
  weeklyGoal: string;
}

// 미래 주차 컴포넌트 (기존 LockedWeeklyRetrospectBox)
export const LockedWeeklyRetrospectBox = ({ week, weeklyGoal }: LockedWeeklyRetrospectProps) => {
  return (
    <div className={`flex gap-3 flex-1 w-full bg-elevated-normal p-5 rounded-lg mt-4 shadow-xs`}>
      {/* 왼쪽 아이콘 + 선 */}
      <div className="flex flex-col items-center gap-4">
        <div className="heading-2-bold border border-label-normal text-label-normal py-1 px-3 rounded-full">{week}</div>
        <div className={`bg-line-normal w-0.5`}></div>
      </div>

      {/* 오른쪽 내용 */}
      <div className="flex flex-col flex-1 gap-3 pt-1">
        <FlexBox className="gap-2">
          <p className="headline-1-bold text-label-normal">{week}주차</p>
        </FlexBox>
        <FlexBox className="w-full rounded-lg gap-4 body-1-bold">
          <span className="text-label-alternative">주차 목표</span>
          <span className="text-label-neutral body-1-normal">"{weeklyGoal}"</span>
        </FlexBox>
        <FlexBox className="bg-gray-800 py-2 px-4 w-full rounded-lg gap-4">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M6.41667 10.084V6.41732C6.41667 5.20174 6.89955 4.03595 7.75909 3.17641C8.61864 2.31687 9.78442 1.83398 11 1.83398C12.2156 1.83398 13.3814 2.31687 14.2409 3.17641C15.1004 4.03595 15.5833 5.20174 15.5833 6.41732V10.084M4.58333 10.084H17.4167C18.4292 10.084 19.25 10.9048 19.25 11.9173V18.334C19.25 19.3465 18.4292 20.1673 17.4167 20.1673H4.58333C3.57081 20.1673 2.75 19.3465 2.75 18.334V11.9173C2.75 10.9048 3.57081 10.084 4.58333 10.084Z"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="stroke-label-normal opacity-70"
            />
          </svg>
          <p className="text-sm md:label-1-normal text-label-normal opacity-70">
            {week}주차 도달 시, 작성할 수 있습니다
          </p>
        </FlexBox>
      </div>
    </div>
  );
};
