import React from 'react';
import { Z_INDEX } from '@/shared/lib/z-index';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { InputField } from '@/shared/components/input/InputField';
import { ButtonHTMLAttributes } from 'react';
import { AdviceFormSchema } from '../AdviceSubmitFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { ADVICE_STYLE_SELECT_ITEMS } from '@/composite/advice/constants';
import { useAdviceFormContext, useAdviceStyleSelectContext } from '../hooks/useAdviceFormContext';
import { BottomSheet } from '@/shared/components/feedBack/BottomSheet';
import type { AdviceChatRequest, AdviceStyle } from '@/model/advice/types';
/**
 * 조언(일기) 제출 폼
 * 현재는 목표별로 조언을 제출하지 않기 때문에 폼 제출에 사용할 목표는 진행중인 목표 중 첫 번째 목표로 고정합니다.
 */

type AdviceFormRootProps = {
  goalId?: string;
  children: React.ReactNode;
};
export const AdviceFormRoot = ({ goalId, children }: AdviceFormRootProps) => {
  const { requestAdvice, isSendingRequest, remainingCount } = useAdviceFormContext();
  const formMethods = useForm<AdviceChatRequest>({
    defaultValues: {
      week: 1,
      goalId: goalId,
      userMessage: '',
      adviceStyle: 'BASIC',
    },
    mode: 'onSubmit',
    resolver: zodResolver(AdviceFormSchema),
  });

  const handleRequestAdvice = (input: AdviceChatRequest, e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    if (!goalId || isSendingRequest || remainingCount <= 0) return;
    const adviceChatRequest = {
      week: 1,
      goalId: goalId,
      userMessage: input.userMessage,
      adviceStyle: input.adviceStyle,
    };
    requestAdvice(adviceChatRequest);
    // 사용자 메시지만 초기화
    formMethods.setValue('userMessage', '');
  };

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={e => handleRequestAdvice(formMethods.getValues(), e)}
        className={`bg-elevated-normal flex flex-col gap-y-2 rounded-t-2xl px-5 w-full sticky bottom-0 ${Z_INDEX.SHEET}`}
      >
        {children}
      </form>
    </FormProvider>
  );
};

const AdviceSubmitInput = () => {
  const { register } = useFormContext<AdviceChatRequest>();
  return (
    <InputField version="underline" {...register('userMessage')} placeholder="지금 목표에서 뭐부터 하면 좋을까?" />
  );
};

const AdviceSubmitButton = ({ ...props }: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { formState, watch } = useFormContext<AdviceChatRequest>();
  const { isSendingRequest, remainingCount } = useAdviceFormContext();
  const isDisabled = isSendingRequest || formState.isSubmitting || !watch('userMessage') || remainingCount <= 0;
  const buttonClasses = `${isDisabled ? 'bg-fill-normal cursor-not-allowed' : 'bg-white cursor-pointer'}`;

  return (
    <button
      type="submit"
      {...props}
      disabled={isDisabled}
      className={`shadow-xs rounded-full w-9 h-9 body-1-bold flex items-center justify-center ${buttonClasses}`}
    >
      <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M10.5 1.75L16.625 18.375L10.5 14.875L4.375 18.375L10.5 1.75Z"
          stroke="#0F0F10"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};

const AdviceStyleSelectTrigger = ({ children }: { children: React.ReactNode }) => {
  const { openSheet } = useAdviceStyleSelectContext();
  const { watch } = useFormContext<AdviceChatRequest>();

  return (
    <nav className="w-full flex justify-between items-center pt-5">
      <button
        type="button"
        onClick={e => {
          e.stopPropagation();
          openSheet();
        }}
        className="flex items-center gap-x-2 body-1-normal text-text-strong"
      >
        {ADVICE_STYLE_SELECT_ITEMS[watch('adviceStyle')].title}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      {children}
    </nav>
  );
};

const AdviceStyleSelectSheet = () => {
  const { isSheetOpen, openSheet, closeSheet } = useAdviceStyleSelectContext();
  const adviceStyleValues = Object.values(ADVICE_STYLE_SELECT_ITEMS);
  const adviceStyleKeys = Object.keys(ADVICE_STYLE_SELECT_ITEMS) as AdviceStyle[];

  const { watch, setValue } = useFormContext<AdviceChatRequest>();
  const selectedAdviceStyle = watch('adviceStyle');

  return (
    <BottomSheet isOpen={isSheetOpen} showSheet={openSheet} closeSheet={closeSheet}>
      <BottomSheet.Title>
        <div className="w-full justify-start items-center p-5">
          <button type="button" onClick={closeSheet} className="text-text-strong">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
        </div>
      </BottomSheet.Title>
      <BottomSheet.Content>
        <ul className="w-full flex flex-col gap-y-2 items-center">
          {adviceStyleValues.map((item, index) => {
            const currentKey = adviceStyleKeys[index];
            return (
              <AdviceStyleSelectItem
                key={item.title}
                title={item.title}
                description={item.description}
                isSelected={selectedAdviceStyle === currentKey}
                onSelect={() => {
                  setValue('adviceStyle', currentKey);
                  closeSheet();
                }}
              />
            );
          })}
        </ul>
      </BottomSheet.Content>
    </BottomSheet>
  );
};

type AdviceStyleSelectItemProps = {
  title: string;
  description: string;
  isSelected: boolean;
  onSelect: () => void;
};
function AdviceStyleSelectItem({ title, description, isSelected, onSelect }: AdviceStyleSelectItemProps) {
  return (
    <li onClick={onSelect} className="w-full flex items-center justify-between py-2 px-3.5 cursor-pointer">
      <div className="flex flex-col gap-y-1">
        <p className="body-1-bold text-text-strong">{title}</p>
        <span className="text-text-secondary label-1-normal">{description}</span>
      </div>

      {isSelected && (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M16.0774 4.41107C16.4028 4.08563 16.9304 4.08563 17.2558 4.41107C17.5812 4.73651 17.5812 5.26402 17.2558 5.58946L8.08913 14.7561C7.76369 15.0816 7.23618 15.0816 6.91074 14.7561L2.74408 10.5895C2.41864 10.264 2.41864 9.73651 2.74408 9.41107C3.06951 9.08563 3.59703 9.08563 3.92246 9.41107L7.49994 12.9885L16.0774 4.41107Z"
            fill="#3AEE49"
          />
        </svg>
      )}
    </li>
  );
}

export const AdviceSubmitForm = {
  Root: AdviceFormRoot,
  Input: AdviceSubmitInput,
  Button: AdviceSubmitButton,
  StyleSelectTrigger: AdviceStyleSelectTrigger,
  StyleSelectSheet: AdviceStyleSelectSheet,
};
