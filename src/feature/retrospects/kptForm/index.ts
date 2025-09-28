import { KPTFormProvider } from './components/FormProvider';
import { KeepField } from './components/KeepField';
import { ProblemField } from './components/ProblemField';
import { TryField } from './components/TryField';
import { useKPTForm, KPTFormData } from './hooks';

export { useKPTForm };
export type { KPTFormData };
export const KptForm = {
  Provider: KPTFormProvider,
  KeepField: KeepField,
  ProblemField: ProblemField,
  TryField: TryField,
  useKPTForm: useKPTForm,
};
