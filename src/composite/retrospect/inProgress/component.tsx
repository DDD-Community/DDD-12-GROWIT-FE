'use client';

import Image from 'next/image';
import FlexBox from '@/shared/components/foundation/FlexBox';
import { Accordion } from '@/shared/components/layout/Accordion';
import { RetrospectLocked } from './components/RetrospectLocked';
import { RetrospectBox } from './components/RetrospectBox';
import { RoadMap } from '@/shared/components/display/RoadMap';

export const InProgress = () => {
  return (
    <>
      <RoadMap />
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
      <Accordion
        renderTitle={() => (
          <FlexBox className="flex gap-2">
            <p className="heading-2-bold text-label-normal">주간회고</p>
          </FlexBox>
        )}
      >
        <RetrospectBox
          week={1}
          isLocked={false}
          isCompleted={true}
          isThisWeek={false}
          weeklyGoal="컴포넌트 라이브러리 분석"
          content="MVP 구조 설계와 비즈니스 모델 구상에 몰입하면서, 내가 구상한 아이디어가 단순한 기획을 넘어 실제 서비스로
          구현될 수 있다는 가능성과 자신감을 얻었다. 동시에 기술적 구현을 위한 구체적인 역량과 리소스 부족, 개발
          우선순위 설정에 대한 기준이 모호하다는 점에서 현실적인 한계와 불안을 함께 마주ㅣ"
        />
        <RetrospectBox
          week={2}
          isLocked={false}
          isCompleted={false}
          isThisWeek={true}
          weeklyGoal="컴포넌트 라이브러리 분석"
          content="MVP 구조 설계와 비즈니스 모델 구상에 몰입하면서, 내가 구상한 아이디어가 단순한 기획을 넘어 실제 서비스로
          구현될 수 있다는 가능성과 자신감을 얻었다. 동시에 기술적 구현을 위한 구체적인 역량과 리소스 부족, 개발
          우선순위 설정에 대한 기준이 모호하다는 점에서 현실적인 한계와 불안을 함께 마주ㅣ"
        />
        <RetrospectBox
          week={3}
          isLocked={true}
          isCompleted={true}
          isThisWeek={false}
          weeklyGoal="컴포넌트 라이브러리 분석"
          content="MVP 구조 설계와 비즈니스 모델 구상에 몰입하면서, 내가 구상한 아이디어가 단순한 기획을 넘어 실제 서비스로
          구현될 수 있다는 가능성과 자신감을 얻었다. 동시에 기술적 구현을 위한 구체적인 역량과 리소스 부족, 개발
          우선순위 설정에 대한 기준이 모호하다는 점에서 현실적인 한계와 불안을 함께 마주ㅣ"
        />
        <RetrospectBox
          week={4}
          isLocked={true}
          isCompleted={true}
          isThisWeek={false}
          weeklyGoal="컴포넌트 라이브러리 분석"
          content="MVP 구조 설계와 비즈니스 모델 구상에 몰입하면서, 내가 구상한 아이디어가 단순한 기획을 넘어 실제 서비스로
          구현될 수 있다는 가능성과 자신감을 얻었다. 동시에 기술적 구현을 위한 구체적인 역량과 리소스 부족, 개발
          우선순위 설정에 대한 기준이 모호하다는 점에서 현실적인 한계와 불안을 함께 마주ㅣ"
        />
      </Accordion>
    </>
  );
};
