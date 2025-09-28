import { useForm, UseFormReturn } from 'react-hook-form';

export interface KPTFormData {
  keep: string;
  problem: string;
  tryNext: string;
}

interface UseKPTFormOptions {
  defaultValues?: Partial<KPTFormData>;
  mode?: 'onChange' | 'onBlur' | 'onSubmit' | 'onTouched' | 'all';
}

export const useKPTForm = (options?: UseKPTFormOptions): UseFormReturn<KPTFormData> => {
  return useForm<KPTFormData>({
    defaultValues: {
      keep: '',
      problem: '',
      tryNext: '',
      ...options?.defaultValues,
    },
    mode: options?.mode || 'onChange',
    resolver: async data => {
      const errors: Record<string, any> = {};

      // Keep 검증
      if (!data.keep || data.keep.trim().length === 0) {
        errors.keep = { message: 'Keep 항목을 입력해주세요.' };
      } else if (data.keep.trim().length < 10) {
        errors.keep = { message: '10글자 이상 작성해주세요.' };
      }

      // Problem 검증
      if (!data.problem || data.problem.trim().length === 0) {
        errors.problem = { message: 'Problem 항목을 입력해주세요.' };
      } else if (data.problem.trim().length < 10) {
        errors.problem = { message: '10글자 이상 작성해주세요.' };
      }

      // Try 검증
      if (!data.tryNext || data.tryNext.trim().length === 0) {
        errors.tryNext = { message: 'Try 항목을 입력해주세요.' };
      } else if (data.tryNext.trim().length < 10) {
        errors.tryNext = { message: '10글자 이상 작성해주세요.' };
      }

      return {
        values: data,
        errors: Object.keys(errors).length > 0 ? errors : {},
      };
    },
  });
};
