'use client';

import { useToast } from '@/shared/components/feedBack/toast';
import { TextArea } from '@/shared/components/input/TextArea';
import Button from '@/shared/components/input/Button';
import { Accordion } from '@/shared/components/layout/Accordion';
import { useCallback, useState } from 'react';
import { useFetchAddRetrospect } from '../hooks';
import { Goal } from '@/shared/type/goal';

interface RetrospectSection {
  type: 'keep' | 'problem' | 'try';
  title: string;
  content: string;
  isExpanded: boolean;
}

interface WeeklyRetrospectPageProps {
  goal: Goal;
  planId: string;
  weekIndex: number;
  showPopUp: () => void;
  onClose: () => void;
}

export const UpdateRetrospectPage = ({ goal, planId, weekIndex, showPopUp, onClose }: WeeklyRetrospectPageProps) => {
  const { showToast } = useToast();
  const [sections, setSections] = useState<RetrospectSection[]>([
    {
      type: 'keep',
      title: 'Keep (잘한 점)',
      content: '',
      isExpanded: true,
    },
    {
      type: 'problem',
      title: 'Problem (아쉬운 점)',
      content: '',
      isExpanded: true,
    },
    {
      type: 'try',
      title: 'Try (다음에 시도하고 싶은 것)',
      content: '',
      isExpanded: true,
    },
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { addRetrospect } = useFetchAddRetrospect({
    onSuccess: () => {
      showToast('회고 작성이 완료되었습니다.', 'success');
      onClose();
    },
    onError: err => {
      showToast('회고 작성에 실패했습니다.', 'error');
      console.error('회고 작성 실패:', err);
    },
  });

  const updateSectionContent = (index: number, content: string) => {
    setSections(prev => prev.map((section, i) => (i === index ? { ...section, content } : section)));
  };

  const isFormValid = () => {
    return sections.every(section => section.content.length >= 10);
  };

  const handleSubmit = useCallback(async () => {
    if (!isFormValid() || isSubmitting || !goal || !planId) return;

    setIsSubmitting(true);

    try {
      await addRetrospect({
        goalId: goal.id,
        planId: planId,
        kpt: {
          keep: sections[0].content,
          problem: sections[1].content,
          tryNext: sections[2].content,
        },
      });
      showPopUp();
    } catch (error) {
      console.error('회고 제출 실패:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [sections, isSubmitting, goal, planId, addRetrospect]);

  return (
    <div className="fixed inset-0 z-50 min-h-screen bg-[#1B1C1E] text-white">
      {/* 헤더 */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <button onClick={onClose} className="p-2 hover:bg-gray-700 rounded-full transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-lg font-semibold">{weekIndex}주차 회고</h1>
        <div className="w-10" /> {/* 공간 확보 */}
      </div>

      {/* 메인 컨텐츠 */}
      <div className="p-4 space-y-4">
        {sections.map((section, sectionIndex) => (
          <Accordion
            key={section.type}
            renderTitle={() => <p className="headline-1-bold text-label-normal px-2">{section.title}</p>}
          >
            <TextArea
              value={section.content}
              onChange={e => updateSectionContent(sectionIndex, e.target.value)}
              placeholder="이번 주 목표 달성 과정과 개선점에 대해 작성해주세요 (10글자 이상)"
              maxLength={200}
              isError={section.content.length > 0 && section.content.length < 10}
              className="px-2"
            />
          </Accordion>
        ))}
      </div>
      <footer className="p-4">
        <Button
          text="작성 완료"
          size="xl"
          onClick={handleSubmit}
          disabled={!isFormValid() || isSubmitting}
          className="w-full text-black"
        />
      </footer>
    </div>
  );
};
