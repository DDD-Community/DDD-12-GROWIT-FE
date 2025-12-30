'use client';

import { useRef, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { cn } from '@/shared/lib/utils';
import type { TodoFormData } from '../../../types';

const MAX_LENGTH = 34;

interface TodoInputProps {
  /** 자동 포커스 여부 */
  autoFocus?: boolean;
}

/** Todo 입력 컴포넌트 */
export const TodoInput = ({ autoFocus = false }: TodoInputProps) => {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<TodoFormData>();
  const inputRef = useRef<HTMLInputElement>(null);

  const content = watch('content');
  const contentError = errors.content;

  // UI 상태 계산 (컴포넌트 내부에서 계산)
  const hasContentError = !!contentError;
  const contentLength = content?.length ?? 0;

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
      <div
        className={cn(
          'border-b-2 pb-2 transition-colors',
          hasContentError ? 'border-status-negative' : 'border-white focus-within:border-brand-neon'
        )}
      >
        <input
          ref={inputRef}
          type="text"
          value={content ?? ''}
          onChange={e => {
            const newValue = e.target.value.slice(0, MAX_LENGTH);
            setValue('content', newValue, { shouldValidate: true });
          }}
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
      <div className="flex justify-between mt-1">
        {hasContentError ? (
          <span className="label-2-medium text-status-negative">{contentError?.message}</span>
        ) : (
          <span />
        )}
        <span className="label-2-medium text-label-alternative">
          ({contentLength}/{MAX_LENGTH})
        </span>
      </div>
    </div>
  );
};
