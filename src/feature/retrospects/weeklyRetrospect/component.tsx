import { RetrospectBox } from '@/composite/retrospect/inProgress/components/RetrospectBox';
import FlexBox from '@/shared/components/foundation/FlexBox';
import { Accordion } from '@/shared/components/layout/Accordion';

export const WeeklyRetrospect = () => {
  return (
    <>
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
