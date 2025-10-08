import { Modal } from '@/shared/components/feedBack/Modal';
import DatePanel from '@/shared/components/input/DatePanel';
import { TextArea } from '@/shared/components/input/TextArea';
import Button from '@/shared/components/input/Button';
import { Todo } from '@/shared/type/Todo';
import { useState, useEffect } from 'react';
import { putTodo } from '../api/api';
import { useToast } from '@/shared/components/feedBack/toast';
import DatePicker from '@/shared/components/input/DatePicker';
import { Goal } from '@/shared/type/goal';

interface EditTodoModalProps {
  open: boolean;
  todo: Todo | null;
  goal: Goal;
  onClose: () => void;
  onSubmit: (updated: Todo) => void;
}

export const EditTodoModal = ({ open, todo, goal, onClose, onSubmit }: EditTodoModalProps) => {
  const [content, setContent] = useState(todo?.content || '');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [contentError, setContentError] = useState<string | null>(null);
  const { showToast } = useToast();

  // Goal의 시작일과 종료일을 Date 객체로 변환
  const startDate = new Date(goal.duration.startDate);
  const endDate = new Date(goal.duration.endDate);

  useEffect(() => {
    setContent(todo?.content || '');
    setSelectedDate(todo?.date ? new Date(todo.date) : undefined);
    setContentError(null);
  }, [todo]);

  const handleSubmit = async () => {
    if (!todo) return;

    // 유효성 검사
    if (!content.trim()) {
      setContentError('내용을 입력해주세요.');
      return;
    }

    if (content.length < 5) {
      setContentError('5글자 이상 입력해주세요.');
      return;
    }

    if (!selectedDate) {
      showToast('날짜를 선택해주세요.', 'warning');
      return;
    }

    setIsLoading(true);
    setContentError(null);

    try {
      // 날짜를 YYYY-MM-DD 형식으로 변환
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const day = String(selectedDate.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;

      const updatedTodoResponse = await putTodo({
        todoId: todo.id,
        content: content.trim(),
        date: formattedDate,
      });

      // TodoResponse를 Todo로 변환
      const updatedTodo: Todo = {
        ...todo,
        content: content.trim(),
        date: formattedDate,
      };

      showToast('투두가 성공적으로 수정되었습니다.', 'success');
      onSubmit(updatedTodo);

      onClose();
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || '투두 수정에 실패했습니다.';
      showToast(errorMessage, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setContent(value);

    // 에러 초기화
    if (contentError) {
      setContentError(null);
    }
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="투두 수정"
      renderContent={() => (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <DatePicker
              selectedDate={selectedDate}
              onDateSelect={handleDateSelect}
              minDate={startDate}
              maxDate={endDate}
              placeholder="날짜 선택"
            />
            <p className="text-xs text-gray-400">
              {goal.duration.startDate} ~ {goal.duration.endDate} 기간 내에서 선택해주세요
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <TextArea
              className="min-w-[274px] md:min-w-[496px]"
              maxLength={30}
              value={content}
              onChange={handleContentChange}
              placeholder="내용을 입력하세요"
              isError={!!contentError}
              errorMessage={contentError}
            />
          </div>
        </div>
      )}
      renderFooter={() => (
        <div className="flex w-full gap-2">
          <Button size="xl" variant="secondary" text="취소" onClick={onClose} disabled={isLoading} />
          <Button
            size="xl"
            text={isLoading ? '수정 중...' : '수정 완료'}
            onClick={handleSubmit}
            disabled={isLoading || !content.trim() || !selectedDate}
          />
        </div>
      )}
    />
  );
};
