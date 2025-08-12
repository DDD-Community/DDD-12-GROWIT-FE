import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCompletedRetrospects, CompletedRetrospects } from './api';
import FlexBox from '@/shared/components/foundation/FlexBox';
import { CompletedTaskBox } from './components/CompletedTaskBox';

export const CompletedTasks = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [completedTasks, setCompletedTasks] = useState<CompletedRetrospects[]>([]);

  useEffect(() => {
    setIsLoading(true);
    const fetchCompletedRetrospects = async () => {
      const data = await getCompletedRetrospects(2025);
      setCompletedTasks(data);
    };
    fetchCompletedRetrospects();
    setIsLoading(false);
  }, []);

  // 회고 상세페이지로 이동하는 함수
  const handleNavigateToRetrospect = (taskId: string) => {
    router.push(`/retrospect/${taskId}`);
  };

  return (
    <FlexBox direction="col" className="gap-4">
      {completedTasks.length > 0 && !isLoading ? (
        completedTasks.map(task => (
          <CompletedTaskBox
            key={task.id}
            id={task.id}
            isCompleted={task.isCompleted}
            content={task.goal.name}
            duration={task.goal.duration}
            onNavigation={() => handleNavigateToRetrospect(task.id)}
          />
        ))
      ) : (
        <div className="body-1-normal flex justify-center items-center text-label-neutral">완료한 목표가 없습니다</div>
      )}
    </FlexBox>
  );
};
