'use client';

import { useEffect, createContext, useContext, ReactNode, useState } from 'react';
import { Goal } from '@/shared/type/goal';
import { FormProvider, useForm, useFormContext, Controller } from 'react-hook-form';
import { useFetchPostCreateGoal } from '@/feature/goal/confimGoal/hook';
import { ChevronRight } from 'lucide-react';
import { CheckCircleIcon, XCircleIcon } from '@/shared/constants/icons';
import { formatDateToYYYYMMDD } from '../createGoalFormElement/utils';
import { convertFormDataToGoal } from './helper';
import { InputUnderline } from '@/shared/components/input/InputUnderline';
import { CellButton } from '@/shared/components/input/CellButton';
import DateSelectorPanel from '@/feature/todo/weeklyTodoList/components/DateSelectorPanel';

interface EditGoalContextType {
  editGoalState: ReturnType<typeof useFetchPostCreateGoal>;
}

const EditGoalContext = createContext<EditGoalContextType | undefined>(undefined);

// EditGoal 상태를 사용하는 훅
export const useEditGoalState = () => {
  const context = useContext(EditGoalContext);
  if (context === undefined) {
    throw new Error('useEditGoalState must be used within an EditGoalFormProvider');
  }
  return context.editGoalState;
};

interface EditGoalFormProviderProps {
  children: React.ReactNode;
  initValue?: Goal;
}

interface EditGoalFormContainerProps {
  children: React.ReactNode;
  onSubmit?: (data: Goal) => void;
}

const Provider = ({ children, initValue }: EditGoalFormProviderProps) => {
  const formData = convertFormDataToGoal(initValue);

  const methods = useForm<Goal>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: formData,
  });

  useEffect(() => {
    if (initValue) {
      const newFormData = convertFormDataToGoal(initValue);
      methods.reset(newFormData);
    }
  }, [initValue]);

  return (
    <FormProvider {...methods}>
      <EditGoalStateProvider>{children}</EditGoalStateProvider>
    </FormProvider>
  );
};

const EditGoalStateProvider = ({ children }: { children: ReactNode }) => {
  const editGoalState = useFetchPostCreateGoal();

  return <EditGoalContext.Provider value={{ editGoalState }}>{children}</EditGoalContext.Provider>;
};

const FormContainer = ({ children, onSubmit }: EditGoalFormContainerProps) => {
  const { handleSubmit } = useFormContext<Goal>();

  return (
    <form className="flex flex-1 flex-col" onSubmit={onSubmit ? handleSubmit(onSubmit) : undefined}>
      {children}
    </form>
  );
};

const Name = () => {
  const {
    watch,
    register,
    formState: { errors },
  } = useFormContext<Goal>();

  return (
    <InputUnderline
      label="최종 목표"
      placeholder="목표 이름을 입력해주세요."
      isError={!!errors.name}
      maxLength={40}
      errorMessage={errors.name?.message as string}
      value={watch('name')}
      {...register('name', { required: '목표 이름을 입력해주세요.' })}
    />
  );
};

const SelectStartDate = () => {
  const [openDatePanel, setOpenDatePanel] = useState(false);
  const { watch, setValue } = useFormContext<Goal>();
  const today = new Date();
  const startDateValue = watch('duration.startDate');
  const startDate = new Date(startDateValue);

  return (
    <>
      <CellButton
        type="button"
        onClick={() => {
          setOpenDatePanel(openDatePanel => !openDatePanel);
        }}
        renderLeftSide={() => (
          <div className="flex items-center gap-2">
            <CheckCircleIcon />
            <span className="label-1-normal text-text-primary">시작일</span>
          </div>
        )}
        renderRightSide={() => (
          <div className="flex items-center gap-2 text-text-strong">
            <span className="label-1-normal">{startDateValue}</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        )}
      />
      {openDatePanel && (
        <DateSelectorPanel
          selectedDate={startDate}
          focusedDate={startDate}
          onDateSelect={date => setValue('duration.startDate', formatDateToYYYYMMDD(date))}
          onFocusedDateChange={date => setValue('duration.startDate', formatDateToYYYYMMDD(date))}
          minDate={today}
        />
      )}
    </>
  );
};

const SelectEndDate = () => {
  const [openDatePanel, setOpenDatePanel] = useState(false);
  const { watch, setValue } = useFormContext<Goal>();
  const startDateValue = watch('duration.startDate');
  const startDate = new Date(startDateValue);
  const endDateValue = watch('duration.endDate');
  const endDate = new Date(endDateValue);

  return (
    <>
      <CellButton
        type="button"
        onClick={() => {
          setOpenDatePanel(openDatePanel => !openDatePanel);
        }}
        renderLeftSide={() => (
          <div className="flex items-center gap-2">
            <XCircleIcon />
            <span className="label-1-normal text-text-primary">종료일</span>
          </div>
        )}
        renderRightSide={() => (
          <div className="flex items-center gap-2 text-text-strong">
            <span className="label-1-normal">{endDateValue}</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        )}
      />
      {openDatePanel && (
        <DateSelectorPanel
          selectedDate={endDate}
          focusedDate={endDate}
          onDateSelect={date => {
            setValue('duration.endDate', formatDateToYYYYMMDD(date));
          }}
          onFocusedDateChange={date => {
            setValue('duration.endDate', formatDateToYYYYMMDD(date));
          }}
          minDate={new Date(startDate.getTime() + 24 * 60 * 60 * 1000)} // 시작일 + 1일
        />
      )}
    </>
  );
};

export const EditGoalFormElement = {
  Provider,
  FormContainer,
  Name,
  SelectStartDate,
  SelectEndDate,
};
