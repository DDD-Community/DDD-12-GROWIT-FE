'use client';

import { FormProvider, UseFormReturn } from 'react-hook-form';
import { KPTFormData } from '../hooks';

interface KPTFormProviderProps {
  form: UseFormReturn<KPTFormData>;
  onSubmit?: (data: KPTFormData) => void;
  children: React.ReactNode;
}

export const KPTFormProvider = ({ form, onSubmit, children }: KPTFormProviderProps) => {
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // 새로고침 방지
    if (onSubmit) {
      form.handleSubmit(onSubmit)(e);
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleFormSubmit} className="space-y-5">
        {children}
      </form>
    </FormProvider>
  );
};
