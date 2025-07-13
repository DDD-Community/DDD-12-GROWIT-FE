import { Modal } from '@/shared/components/feedBack/Modal';
import DatePanel from '@/shared/components/input/DatePanel';
import { TextArea } from '@/shared/components/input/TextArea';
import Button from '@/shared/components/navigation/Button';
import { Todo } from '@/shared/type/Todo';
import { useState, useEffect } from 'react';

interface EditTodoModalProps {
  open: boolean;
  todo: Todo | null;
  onClose: () => void;
  onSubmit: (updated: Todo) => void;
}

const EditTodoModal = ({ open, todo, onClose, onSubmit }: EditTodoModalProps) => {
  const [content, setContent] = useState(todo?.content || '');

  useEffect(() => {
    setContent(todo?.content || '');
  }, [todo]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="투두 수정"
      renderContent={() => (
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="bg-elevated-normal border border-line-normal rounded-md px-3 py-2 flex items-center gap-2">
              <span className="text-label-normal text-base">
                {todo?.date ? new Date(todo.date).toLocaleDateString('ko-KR').slice(2) : ''}
              </span>
            </div>
          </div>
          <TextArea
            maxLength={30}
            value={content}
            onChange={e => setContent(e.target.value)}
            className="mt-2"
            placeholder="내용을 입력하세요"
          />
        </div>
      )}
      renderFooter={() => <Button size="xl" text="수정 완료" onClick={() => todo && onSubmit({ ...todo, content })} />}
    />
  );
};

export default EditTodoModal;
