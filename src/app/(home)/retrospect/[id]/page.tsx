'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { CompletedTaskBox } from '@/composite/retrospect/done/components/CompletedTaskBox';
import { getCompletedRetrospects, CompletedRetrospects } from '@/composite/retrospect/done/api';
import FlexBox from '@/shared/components/foundation/FlexBox';

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
          <div className="bg-elevated-normal rounded-lg p-6 shadow-xs">
            <h2 className="heading-2-bold text-label-normal mb-4">회고 상세 페이지</h2>
            <p className="body-1-normal text-label-neutral">여기에 회고 상세 내용이 표시됩니다.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RetrospectDetailPage;
