import FlexBox from '@/shared/components/foundation/FlexBox';

interface RetrospectLockedProps {
  title: string;
}
export const RetrospectLocked = ({ title }: RetrospectLockedProps) => {
  return (
    <div className="flex flex-col gap-4 w-full bg-elevated-normal py-5 px-6 pb-8 rounded-lg">
      <p className="headline-1-bold text-label-normal">{title}</p>
      <FlexBox className="bg-inverse-primary/5 py-3 px-4 w-full rounded-lg gap-4">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M6.41667 10.084V6.41732C6.41667 5.20174 6.89955 4.03595 7.75909 3.17641C8.61864 2.31687 9.78442 1.83398 11 1.83398C12.2156 1.83398 13.3814 2.31687 14.2409 3.17641C15.1004 4.03595 15.5833 5.20174 15.5833 6.41732V10.084M4.58333 10.084H17.4167C18.4292 10.084 19.25 10.9048 19.25 11.9173V18.334C19.25 19.3465 18.4292 20.1673 17.4167 20.1673H4.58333C3.57081 20.1673 2.75 19.3465 2.75 18.334V11.9173C2.75 10.9048 3.57081 10.084 4.58333 10.084Z"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="stroke-label-normal opacity-70"
          />
        </svg>
        <p className="label-1-normal text-label-normal opacity-70">목표 완료시 업데이트 됩니다</p>
      </FlexBox>
    </div>
  );
};
