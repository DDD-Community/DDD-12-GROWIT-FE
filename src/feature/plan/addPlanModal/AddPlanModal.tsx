'use client';

import { useState } from 'react';
import { Modal } from '@/shared/components/feedBack/Modal';
import { InputField } from '@/shared/components/input/InputField';
import Button from '@/shared/components/input/Button';

interface AddPlanModalProps {
  onSubmit?: (data: PlanFormData) => void;
  selectedPlanIndex: number;
  selectedPlanContent: string;
}

interface PlanFormData {
  title: string;
  description: string;
}

export const AddPlanModal = ({ onSubmit, selectedPlanContent, selectedPlanIndex = 1 }: AddPlanModalProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<PlanFormData>({
    title: '',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title.trim()) {
      onSubmit?.(formData);
      setFormData({ title: '', description: '' });
      setOpen(false);
    }
  };

  const handleCancel = () => {
    setFormData({ title: '', description: '' });
    setOpen(false);
  };

  const displayGoal = selectedPlanIndex || `${selectedPlanIndex}주차 목표를 입력해주세요`;
  const displayInfo = selectedPlanContent || '';

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center justify-between w-full p-4 bg-elevated-normal rounded-lg hover:bg-elevated-alternative transition-colors duration-200 border border-line-normal"
      >
        <div className="flex flex-col items-start">
          <span className="text-label-alternative text-xs font-medium">주차 목표</span>
          <span className="text-label-normal text-sm mt-1 truncate max-w-[200px]">
            {displayInfo ? `'${displayInfo}'` : displayGoal}
          </span>
        </div>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-label-alternative"
        >
          <path
            d="M6 12L10 8L6 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <Modal
        open={open}
        onClose={handleCancel}
        title="새 계획 추가"
        renderContent={() => (
          <form onSubmit={handleSubmit} className="space-y-4 min-w-[300px] md:min-w-[500px]">
            <div>
              <InputField
                label=""
                placeholder="ex. 책 100페이지 읽기"
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
          </form>
        )}
        renderFooter={() => (
          <Button text={'목표 추가'} size="xl" onClick={handleSubmit} disabled={!formData.title.trim()} />
        )}
      />
    </>
  );
};
