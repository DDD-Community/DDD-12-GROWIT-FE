import { useEffect, useState } from 'react';
import { getCompletedRetrospects } from './api';
import FlexBox from '@/shared/components/foundation/FlexBox';
import { CompletedTaskBox } from './components/CompletedTaskBox';
import { CompletedGoal } from './type';

export const CompletedTasks = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [completedItems, setCompletedItems] = useState<CompletedGoal[]>([]);

  useEffect(() => {
    setIsLoading(true);
    const fetchCompletedRetrospects = async () => {
      const data = await getCompletedRetrospects(2025);
      setCompletedItems(data);
    };
    fetchCompletedRetrospects();
    setIsLoading(false);
  }, []);

  return (
    <FlexBox direction="col" className="gap-4">
      {completedItems.length > 0 && !isLoading ? (
        completedItems.map(item => {
          const currentItem = item;
          let isCompleted = false;
          if (currentItem && currentItem.goalRetrospect) {
            isCompleted = currentItem.goalRetrospect.isCompleted;
          }
          return <CompletedTaskBox key={item.goal.id} completedGoal={item} isCompleted={isCompleted} />;
        })
      ) : (
        <div className="body-1-normal flex justify-center items-center text-label-neutral">완료한 목표가 없습니다</div>
      )}
    </FlexBox>
  );
};
