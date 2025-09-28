'use client';

import { FormProvider, UseFormReturn } from 'react-hook-form';
import { KPTFormData } from '../hooks';

interface KPTFormProviderProps {
  form: UseFormReturn<KPTFormData>;
  onSubmit?: (data: KPTFormData) => void;
  children: React.ReactNode;
}

export const KPTFormProvider = ({ form, onSubmit, children }: KPTFormProviderProps) => {
  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit ? form.handleSubmit(onSubmit) : undefined} className="space-y-5">
        {children}
      </form>
    </FormProvider>
  );
};
