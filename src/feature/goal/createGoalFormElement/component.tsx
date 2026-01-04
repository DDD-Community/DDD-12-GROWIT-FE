'use client';

import { createContext, useContext, ReactNode, useState } from 'react';
import { GoalFormData } from '@/shared/type/form';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { useFetchPostCreateGoal } from '@/feature/goal/confimGoal/hook';
import { InputUnderline } from '@/shared/components/input/InputUnderline';
import DateSelectorPanel from '@/feature/todo/weeklyTodoList/components/DateSelectorPanel';
import { formatDateToYYYYMMDD } from './utils';
import { CellButton } from '@/shared/components/input/CellButton';
import { CheckCircleIcon, XCircleIcon } from '@/shared/constants/icons';
import { ChevronRight } from 'lucide-react';

// CreateGoal 상태를 위한 Context
interface CreateGoalContextType {
  createGoalState: ReturnType<typeof useFetchPostCreateGoal>;
}

const CreateGoalContext = createContext<CreateGoalContextType | undefined>(undefined);

// CreateGoal 상태를 사용하는 훅
export const useCreateGoalState = () => {
  const context = useContext(CreateGoalContext);
  if (context === undefined) {
    throw new Error('useCreateGoalState must be used within a CreateGoalFormProvider');
  }
  return context.createGoalState;
};

interface CreateGoalFormProviderProps {
  children: React.ReactNode;
  initValue?: GoalFormData;
}

interface CreateGoalFormContainerProps {
  children: React.ReactNode;
  onSubmit: (data: GoalFormData) => void;
}

const Provider = ({ children }: CreateGoalFormProviderProps) => {
  const methods = useForm<GoalFormData>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      name: '',
      durationDate: {
        startDate: '',
        endDate: '',
      },
    },
  });

  return (
    <FormProvider {...methods}>
      <CreateGoalStateProvider>{children}</CreateGoalStateProvider>
    </FormProvider>
  );
};

// CreateGoal 상태를 관리하는 Provider
const CreateGoalStateProvider = ({ children }: { children: ReactNode }) => {
  const createGoalState = useFetchPostCreateGoal();

  return <CreateGoalContext.Provider value={{ createGoalState }}>{children}</CreateGoalContext.Provider>;
};

const FormContainer = ({ children, onSubmit }: CreateGoalFormContainerProps) => {
  const { handleSubmit } = useFormContext<GoalFormData>();

  return (
    <form className="flex flex-1 flex-col" onSubmit={onSubmit ? handleSubmit(onSubmit) : undefined}>
      {children}
    </form>
  );
};

const MAX_NAME_LENGTH = 20;

const Name = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<GoalFormData>();

  return (
    <InputUnderline
      label="최종 목표"
      type="text"
      placeholder="목표 이름을 입력해주세요."
      isError={!!errors.name}
      maxLength={MAX_NAME_LENGTH}
      {...register('name', {
        required: '목표 이름을 입력해주세요.',
      })}
    />
  );
};

const SelectStartDate = () => {
  const [openDatePanel, setOpenDatePanel] = useState(false);
  const { watch, setValue } = useFormContext<GoalFormData>();
  const today = new Date();
  const startDateValue = watch('durationDate.startDate');
  const startDate = startDateValue ? new Date(startDateValue) : today;

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
            <span className="label-1-normal">{startDateValue ? startDateValue : '날짜를 선택해주세요.'}</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        )}
      />
      {openDatePanel && (
        <DateSelectorPanel
          selectedDate={startDate}
          focusedDate={startDate}
          onDateSelect={date => {
            setValue('durationDate.startDate', formatDateToYYYYMMDD(date));
          }}
          onFocusedDateChange={date => {
            setValue('durationDate.startDate', formatDateToYYYYMMDD(date));
          }}
          minDate={today}
        />
      )}
    </>
  );
};

const SelectEndDate = () => {
  const [openDatePanel, setOpenDatePanel] = useState(false);
  const { watch, setValue } = useFormContext<GoalFormData>();
  const today = new Date();
  const startDateValue = watch('durationDate.startDate');
  const startDate = startDateValue ? new Date(startDateValue) : new Date(today.getTime() + 24 * 60 * 60 * 1000);
  const endDateValue = watch('durationDate.endDate');
  const endDate = endDateValue ? new Date(endDateValue) : today;

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
            <span className="label-1-normal">{endDateValue ? endDateValue : '날짜를 선택해주세요.'}</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        )}
      />
      {openDatePanel && (
        <DateSelectorPanel
          selectedDate={endDate}
          focusedDate={endDate ? endDate : today}
          onDateSelect={date => {
            setValue('durationDate.endDate', formatDateToYYYYMMDD(date));
          }}
          onFocusedDateChange={date => {
            setValue('durationDate.endDate', formatDateToYYYYMMDD(date));
          }}
          minDate={startDate}
        />
      )}
    </>
  );
};

export const CreateGoalFormElement = {
  Provider,
  FormContainer,
  Name,
  SelectStartDate,
  SelectEndDate,
};
