import Image from 'next/image';
import FlexBox from '@/shared/components/foundation/FlexBox';
import { Accordion } from '@/shared/components/layout/Accordion';
import { RetrospectLocked } from '@/composite/retrospect/inProgress/components/RetrospectLocked';

export const EntireRetrospect = () => {
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
      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-4 pt-6">
          <Image src="/avatar.png" alt="avatar" width={64} height={64} />
          <RetrospectLocked title="목표 진행 과정 요약" />
        </div>
        <FlexBox className="gap-4">
          <div className="w-[72px] h-[64px]" />
          <RetrospectLocked title="그로냥의 조언" />
        </FlexBox>
        <FlexBox className="gap-4">
          <Image src="/message.svg" alt="message" width={64} height={64} />
          <RetrospectLocked title="나의 회고" />
        </FlexBox>
      </div>
    </Accordion>
  );
};
