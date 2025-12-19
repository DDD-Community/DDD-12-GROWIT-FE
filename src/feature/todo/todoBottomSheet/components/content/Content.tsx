'use client';

import { useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { cn } from '@/shared/lib/utils';
import { FolderIcon, ChevronRightIcon } from '../icons';
import type { TodoFormData } from '../../types';

const MAX_LENGTH = 34;

interface ContentProps {
  groups?: { id: string; name: string }[];
  autoFocus?: boolean;
}

export const Content = ({ groups = [], autoFocus = true }: ContentProps) => {
  const { watch, setValue, register } = useFormContext<TodoFormData>();
  const inputRef = useRef<HTMLInputElement>(null);

  const content = watch('content');
  const groupId = watch('groupId');
  const selectedGroupName = groups.find(g => g.id === groupId)?.name;

  // 마운트 시 입력 필드에 포커스
  useEffect(() => {
    if (autoFocus) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [autoFocus]);

  return (
    <div>
      {/* 텍스트 입력 */}
      <div className="mb-5">
        <div className="border-b border-white focus-within:border-brand-neon pb-2 transition-colors">
          <input
            {...register('content')}
            ref={inputRef}
            type="text"
            value={content ?? ''}
            onChange={e => setValue('content', e.target.value.slice(0, MAX_LENGTH))}
            placeholder="할 일을 입력해주세요"
            className={cn(
              'w-full bg-transparent',
              'body-1-normal text-label-normal',
              'placeholder:text-label-assistive',
              'focus:outline-none'
            )}
            maxLength={MAX_LENGTH}
          />
        </div>
        <div className="flex justify-end mt-1">
          <span className="label-2-medium text-label-alternative">
            ({content?.length ?? 0}/{MAX_LENGTH})
          </span>
        </div>
      </div>

      {/* 그룹 선택 */}
      {groups.length > 0 && (
        <button
          type="button"
          onClick={() => {
            // TODO: 그룹 선택 구현
          }}
          className={cn('w-full flex items-center justify-between', 'bg-fill-primary rounded-lg', 'px-5 py-4')}
        >
          <div className="flex items-center gap-2">
            <FolderIcon />
            <span className="label-1-medium text-label-alternative">그룹</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="label-1-medium text-label-alternative">{selectedGroupName || '선택'}</span>
            <ChevronRightIcon />
          </div>
        </button>
      )}
    </div>
  );
};

export default Content;
