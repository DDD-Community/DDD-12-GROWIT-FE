import { Modal } from '@/shared/components/feedBack/Modal';
import { TextArea } from '@/shared/components/input/TextArea';
import Button from '@/shared/components/navigation/Button';
import { Todo } from '@/shared/type/Todo';
import { deleteTodo } from '../api';
import { useState } from 'react';
import { useToast } from '@/shared/components/feedBack/toast';

interface DeleteTodoModalProps {
  open: boolean;
  todo: Todo | null;
  onClose: () => void;
  onDelete: (todo: Todo) => void;
}

const DeleteTodoModal = ({ open, todo, onClose, onDelete }: DeleteTodoModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();

  const handleDelete = async () => {
    if (!todo) return;

    setIsLoading(true);
    try {
      await deleteTodo(todo.id);
      showToast('투두가 성공적으로 삭제되었습니다.', 'success');
      onDelete(todo);
      onClose();
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || '투두 삭제에 실패했습니다.';
      showToast(errorMessage, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="해당 투두를 삭제하겠습니까?"
      renderContent={() => (
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="bg-elevated-normal border border-line-normal rounded-md px-3 py-2 flex items-center gap-2">
              <span className="text-label-normal text-base">
                {todo?.date ? new Date(todo.date).toLocaleDateString('ko-KR').slice(2) : ''}
              </span>
            </div>
          </div>
          <TextArea className="min-w-[274px] md:min-w-[496px]" value={todo?.content || ''} readOnly />
        </div>
      )}
      renderFooter={() => (
        <div className="flex w-full gap-2">
          <Button size="xl" variant="secondary" text="취소" onClick={onClose} disabled={isLoading} />
          <Button
            size="xl"
            variant="primary"
            text={isLoading ? '삭제 중...' : '삭제'}
            onClick={handleDelete}
            disabled={isLoading}
          />
        </div>
      )}
    />
  );
};

export default DeleteTodoModal;
