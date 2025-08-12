'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { CompletedTaskBox } from '@/composite/retrospect/done/components/CompletedTaskBox';
import { getCompletedRetrospects, CompletedRetrospects } from '@/composite/retrospect/done/api';
import FlexBox from '@/shared/components/foundation/FlexBox';
import { Accordion } from '@/shared/components/layout/Accordion';
import Image from 'next/image';
import { RetrospectLocked } from '@/composite/retrospect/inProgress/components/RetrospectLocked';
import { RetrospectBox } from '@/composite/retrospect/inProgress/components/RetrospectBox';

const RetrospectDetailPage = () => {
  const params = useParams();
  const retrospectId = params.id as string;
  const [retrospectInfo, setRetrospectInfo] = useState<CompletedRetrospects | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRetrospectInfo = async () => {
      try {
        setIsLoading(true);
        // 임시로 더미 데이터 생성 (실제로는 API에서 해당 id의 회고 정보를 가져와야 함)
        const mockRetrospect: CompletedRetrospects = {
          id: retrospectId,
          isCompleted: true,
          goal: {
            id: retrospectId,
            name: `목표 ${retrospectId}`,
            duration: {
              startDate: '2023/7/1',
              endDate: '2025/8/31',
            },
          },
        };
        setRetrospectInfo(mockRetrospect);
      } catch (error) {
        console.error('Error fetching retrospect info:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (retrospectId) {
      fetchRetrospectInfo();
    }
  }, [retrospectId]);

  if (isLoading) {
    return (
      <div className="md:p-12">
        <h1 className="title-3-bold text-label-normal px-4 py-4 md:p-5">회고 상세</h1>
        <div className="w-screen border border-b border-line-normal"></div>

        <main className="w-full max-w-3xl mx-auto">
          <div className="p-5 space-y-5 w-full">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-700 rounded w-1/3 mb-4"></div>
              <div className="h-64 bg-gray-700 rounded"></div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="md:p-12">
      <h1 className="title-3-bold text-label-normal px-4 py-4 md:p-5">회고 상세</h1>
      <div className="w-screen border border-b border-line-normal"></div>

      <main className="w-full max-w-3xl mx-auto">
        <div className="p-5 space-y-5 w-full">
          {/* 상단에 CompletedTaskBox 표시 */}
          {retrospectInfo && (
            <CompletedTaskBox
              id={retrospectInfo.id}
              isCompleted={retrospectInfo.isCompleted}
              content={retrospectInfo.goal.name}
              duration={retrospectInfo.goal.duration}
            />
          )}

          {/* 회고 상세 내용 */}
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
        </div>
      </main>
    </div>
  );
};

export default RetrospectDetailPage;
