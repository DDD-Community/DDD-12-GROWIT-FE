import { Modal } from '@/shared/components/feedBack/Modal';
import { TextArea } from '@/shared/components/input/TextArea';
import Button from '@/shared/components/navigation/Button';
import { Todo } from '@/shared/type/Todo';

interface DeleteTodoModalProps {
  open: boolean;
  todo: Todo | null;
  onClose: () => void;
  onDelete: (todo: Todo) => void;
}

const DeleteTodoModal = ({ open, todo, onClose, onDelete }: DeleteTodoModalProps) => {
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
          <TextArea maxLength={30} value={todo?.content || ''} readOnly className="mt-2" />
        </div>
      )}
      renderFooter={() => (
        <div className="flex w-full gap-2">
          <Button size="xl" variant="secondary" text="취소" onClick={onClose} />
          <Button size="xl" variant="primary" text="삭제" onClick={() => todo && onDelete(todo)} />
        </div>
      )}
    />
  );
};

export default DeleteTodoModal;
